import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtGuardStrategy } from './guards/jwt-auth.strategy';
import { JwtGuard } from './guards/jwt-auth.guard';
import { GoogleOauthGuard } from './guards/google-oauth.guard';
import { GoogleStrategy } from './guards/google-oauth.strategy';
@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: '3d',
        },
        global: true,
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtGuardStrategy, JwtGuard, GoogleStrategy],
})
export class AuthModule {}
