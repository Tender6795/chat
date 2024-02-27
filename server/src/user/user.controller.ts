import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  Patch,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserResponce } from './responses';
import { CurrentUser } from '@common/decorators';
import { JwtPayload } from '@auth/interfaces';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateUserDto } from './interfaces';
import * as fs from 'fs';
import * as path from 'path';
import { resizeAndOptimizeImage } from './helper';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':idOrEmail')
  async findOne(@Param('idOrEmail') idOrEmail: string) {
    const user = await this.userService.findOne(idOrEmail);
    return new UserResponce(user);
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.userService.delete(id, user);
  }

  @Get()
  async findAllUsers(@CurrentUser() currentUser: JwtPayload) {
    const users = await this.userService.findAllUsers();
    return users
      .filter((usr) => usr.id !== currentUser.id)
      .map((user) => {
        delete user.password;
        return user;
      });
  }

  // test
  // @UseGuards(RolesGuard)
  // @Roles(Role.ADMIN)
  @Post('currentUser')
  currentUser(@CurrentUser() user: JwtPayload) {
    return user;
  }

  @Patch('currentUser')
@UseInterceptors(FileInterceptor('avatar'))
async updateUser(
  @CurrentUser() user: JwtPayload,
  @UploadedFile() avatar: Express.Multer.File,
  @Body() body: UpdateUserDto,
) {
  try {
    const currentUser = await this.userService.findOne(user.id);

    if (!currentUser) {
      throw new BadRequestException('User not found');
    }

    if (avatar) {
      const optimizedImageBuffer = await resizeAndOptimizeImage(avatar.buffer);

      const avatarName = avatar.originalname;
      const avatarPath = path.join(__dirname, '..', 'avatars', avatarName);
      fs.writeFileSync(avatarPath, optimizedImageBuffer);

      currentUser.avatar = "http://localhost:5000/avatars/" + avatarName;
    }

    currentUser.firstName = body.firstName;
    currentUser.lastName = body.lastName;

    return new UserResponce(await this.userService.update(currentUser));
  } catch (error) {
    throw new BadRequestException('Error updating user');
  }
}
}
