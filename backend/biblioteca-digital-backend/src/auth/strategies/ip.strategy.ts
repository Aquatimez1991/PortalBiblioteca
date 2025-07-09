import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-custom';
import { Request } from 'express';

@Injectable()
export class IpStrategy extends PassportStrategy(Strategy, 'ip') {
  constructor() {
    super();
  }

  async validate(req: Request): Promise<any> {
    const clientIp = req.ip || req.connection.remoteAddress;
    const allowedIps = process.env.ALLOWED_IPS?.split(',') || [];
    
    if (allowedIps.includes(clientIp)) {
      return {
        id: 'ip-user',
        email: 'ip-auth@institution.com',
        role: 'reader',
        authMethod: 'ip',
      };
    }
    
    return false;
  }
} 