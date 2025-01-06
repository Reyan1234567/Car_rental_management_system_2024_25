import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token is required');
    }

    try {
      const user = this.jwtService.verify(token, { secret: process.env.ACT });
      request.user = user; // Attach decoded token data to the request
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
