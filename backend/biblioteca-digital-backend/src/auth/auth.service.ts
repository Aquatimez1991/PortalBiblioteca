import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.usersService.findByEmail(email);
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id, role: user.role };
    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }

  async logout(userId: number) {
    // Implementar lógica de logout (blacklist token, etc.)
    return { message: 'Logout successful' };
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async validateIpAuth(ip: string) {
    // Implementar validación por IP
    const allowedIps = process.env.ALLOWED_IPS?.split(',') || [];
    return allowedIps.includes(ip);
  }

  async validateRefererAuth(referer: string) {
    // Implementar validación por URL referida
    const allowedReferers = process.env.ALLOWED_REFERERS?.split(',') || [];
    return allowedReferers.some(allowed => referer.includes(allowed));
  }

  getAvailableAuthMethods() {
    return {
      methods: [
        { name: 'jwt', enabled: true },
        { name: 'ip', enabled: !!process.env.ALLOWED_IPS },
        { name: 'referer', enabled: !!process.env.ALLOWED_REFERERS },
        { name: 'ezproxy', enabled: !!process.env.EZPROXY_ENABLED },
      ],
    };
  }
} 