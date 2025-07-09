import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
 
@Injectable()
export class IpAuthGuard extends AuthGuard('ip') {} 