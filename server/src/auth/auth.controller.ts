import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
   @Post('register')
   register(@Body dto){}

   @Post('login')
   login(@Body dto){}

   @Get('refresh')
   refreshTokens(){}
}
