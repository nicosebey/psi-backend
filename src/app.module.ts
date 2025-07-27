import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { PsicologoModule } from './modules/psicologo/psicologo.module';
import { AuthModule } from './modules/auth/auth.module';
import { DisponibilidadModule } from './modules/disponibilidad/disponibilidad.module';
import { TurnoModule } from './modules/turno/turno.module';

@Module({
  imports: [ ConfigModule.forRoot({
    isGlobal: true,
  }),
  TypeOrmModule.forRoot(databaseConfig),
  PsicologoModule,
  AuthModule,
  DisponibilidadModule,
  TurnoModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
