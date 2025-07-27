import { Module } from "@nestjs/common";
import { TurnoController } from "./turno.controller";
import { TurnoService } from "./turno.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Turno } from "./entities/turno.entity";
import { Disponibilidad } from "../disponibilidad/entities/disponibilidad.entity";
import { DisponibilidadModule } from "../disponibilidad/disponibilidad.module";




@Module({
    imports: [TypeOrmModule.forFeature([Turno]),DisponibilidadModule],
    controllers: [TurnoController],
    providers: [TurnoService],
    exports: [TurnoService],
  })
  export class TurnoModule {} 