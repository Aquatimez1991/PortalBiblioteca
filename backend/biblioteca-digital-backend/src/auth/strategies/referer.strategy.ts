import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-custom';
import { Request } from 'express';

@Injectable()
export class RefererStrategy extends PassportStrategy(Strategy, 'referer') {
  constructor() {
    super();
  }

  async validate(req: Request): Promise<any> {
    const referer = req.headers.referer || req.headers.referrer;
    const allowedReferers = process.env.ALLOWED_REFERERS?.split(',') || [];
    
    if (referer && allowedReferers.some(allowed => referer.includes(allowed))) {
      return {
        id: 'referer-user',
        email: 'referer-auth@institution.com',
        role: 'reader',
        authMethod: 'referer',
      };
    }
    
    return false;
  }
} 