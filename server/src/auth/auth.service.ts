import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { compareSync } from 'bcrypt';
import { LoginDto, RegisterDto } from './dto';
import { UserService } from '@user/user.service';
import { Tokens } from './interfaces';
import { Provider, Token, User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@prisma/prisma.service';
import { v4 } from 'uuid';
import { add } from 'date-fns';
import { generateNewName } from './helper';
@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async register(dto: RegisterDto) {
    const user: User = await this.userService
      .findOne(dto.email)
      .catch((err) => {
        this.logger.error(err);
        return null;
      });
    if (user) {
      throw new ConflictException('User with this email already exists');
    }
    const newUser = {
      ...dto,
      avatar:
        'https://cs14.pikabu.ru/post_img/big/2023/02/13/8/1676296367166243426.png',
      ...generateNewName(),
    };
    return this.userService.save(newUser).catch((err) => {
      this.logger.error(err);
      return null;
    });
  }

  async login(dto: LoginDto, agent: string): Promise<Tokens> {
    const user: User = await this.userService
      .findOne(dto.email, true)
      .catch((err) => {
        this.logger.error(err);
        return null;
      });
    if (!user || !compareSync(dto.password, user.password)) {
      throw new UnauthorizedException('Wrong email or password');
    }
    return this.generateTokens(user, agent);
  }

  private async generateTokens(user: User, agent: string): Promise<Tokens> {
    const accessToken =
      'Bearer ' +
      this.jwtService.sign({
        id: user.id,
        email: user.email,
        roles: user.roles,
      });
    const refreshToken = await this.getRefreshToken(user.id, agent);
    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(refreshToken: string, agent: string): Promise<Tokens> {
    const token = await this.prismaService.token.findUnique({
      where: { token: refreshToken },
    });

    if (!token) {
      throw new UnauthorizedException();
    }

    await this.prismaService.token.delete({
      where: { token: refreshToken },
    });

    if (new Date(token.exp) < new Date()) {
      throw new UnauthorizedException();
    }

    const user = await this.userService.findOne(token.userId);

    if (!user) {
      throw new UnauthorizedException();
    }

    return this.generateTokens(user, agent);
  }

  private async getRefreshToken(userId: string, agent: string): Promise<Token> {
    const _token = await this.prismaService.token.findFirst({
      where: { userId, userAgent: agent },
    });

    const token = _token?.token ?? '';
    return this.prismaService.token.upsert({
      where: { token },
      update: {
        token: v4(),
        exp: add(new Date(), { months: 1 }),
      },
      create: {
        token: v4(),
        exp: add(new Date(), { months: 1 }),
        userId,
        userAgent: agent,
      },
    });
  }

  deleteRefreshToken(token: string) {
    return this.prismaService.token.delete({ where: { token } });
  }

  async googleAuth(email: string, agent: string) {
    const userExist = await this.userService.findOne(email);
    if (userExist) {
      return this.generateTokens(userExist, agent);
    }
    generateNewName;
    const user = await this.userService
      .save({ email, provider: Provider.GOOGLE })
      .catch((err) => {
        this.logger.error(err);
        return null;
      });
    if (!user) {
      throw new HttpException(
        `Failed to create user with email ${email} in Google auth`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.generateTokens(user, agent);
  }
}
