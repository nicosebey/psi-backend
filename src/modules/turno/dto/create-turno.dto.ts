import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { TematicaPsicologia } from 'src/modules/psicologo/entities/psicologo.entity';

// DTO para crear cita
export class CrearTurnoDto {
  @IsString()
  @IsNotEmpty()
  psicologo: string;

  @IsString()
  @IsNotEmpty()
  clienteEmail: string;

  @IsString()
  @IsNotEmpty()
  fecha: string;

  @IsString()
  @IsNotEmpty()
  horaInicio: string;

  @IsString()
  @IsNotEmpty()
  horaFin: string;

  @IsBoolean()
  @IsNotEmpty()
  isVirtual: boolean;

  @IsString()
  estado?: string;

  tematica: TematicaPsicologia;
}
