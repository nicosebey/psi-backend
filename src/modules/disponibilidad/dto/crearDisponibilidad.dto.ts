import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CrearDisponibilidadDto {
  @IsString()
  @IsNotEmpty()
  psicologoId: string;

  @IsNumber()
  @IsNotEmpty()
  diaDeLaSemana: number; // 0-6 (Domingo a Sábado)

  @IsString()
  @IsNotEmpty()
  horaInicio: string; // formato HH:mm

  @IsString()
  @IsNotEmpty()
  horaFin: string; // formato HH:mm
  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;

  @IsBoolean()
  @IsNotEmpty()
  isVirtual: boolean;
}
