import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleOauthGuard } from './guards/google-oauth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Get('callback/google')
    @UseGuards(GoogleOauthGuard)
    async googleAuthCallback(@Req() req, @Res() res: Response) {
      try {
        const token = await this.authService.oAuthLogin(req.user);
        // res.redirect(`${FRONTEND_URL}/oauth?token=${token.jwt}`);
      } catch (err) {
        // res.status(500).send({ success: false, message: err.message });
      }
    }
}
