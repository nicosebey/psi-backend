import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PsicologoService } from './psicologo.service';
import { PsicologoController } from './psicologo.controller';
import { Psicologo } from './entities/psicologo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Psicologo])],
  controllers: [PsicologoController],
  providers: [PsicologoService],
  exports: [PsicologoService],
})
export class PsicologoModule {} 