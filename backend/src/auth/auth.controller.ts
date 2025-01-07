import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() userData: { userID: string; password: string; role?: string }) {
    return this.authService.createUser(userData);
  }

  @Post('login')
  async login(@Body() userCredentials: { userID: string; password: string }) {
    return this.authService.login(userCredentials);
  }
}