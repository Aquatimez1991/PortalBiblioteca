import { Controller, Post, Body, Get, UseGuards, Request, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { IpAuthGuard } from './guards/ip-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const result = await this.authService.login(loginDto);
    return res.json(result);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Request() req, @Res() res: Response) {
    await this.authService.logout(req.user.id);
    return res.json({ message: 'Logout successful' });
  }

  @Get('verify')
  @UseGuards(JwtAuthGuard)
  async verifyToken(@Request() req) {
    return { user: req.user, valid: true };
  }

  @Get('ip-auth')
  @UseGuards(IpAuthGuard)
  async ipAuth(@Request() req) {
    return { user: req.user, method: 'ip' };
  }

  @Get('methods')
  async getAuthMethods() {
    return this.authService.getAvailableAuthMethods();
  }
} 