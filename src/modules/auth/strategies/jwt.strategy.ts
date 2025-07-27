import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PsicologoService } from '../../psicologo/psicologo.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private psicologoService: PsicologoService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'your-secret-key',
    });
  }

  async validate(payload: any) {
    const psicologo = await this.psicologoService.findOne(payload.sub);
    if (!psicologo) {
      throw new UnauthorizedException();
    }
    return psicologo;
  }
} 