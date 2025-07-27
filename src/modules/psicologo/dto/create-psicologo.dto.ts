import { IsString, IsArray, IsNotEmpty, MinLength } from 'class-validator';
import { TematicaPsicologia } from '../entities/psicologo.entity';

export class CreatePsicologoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  apellido: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsArray()
  @IsString({ each: true })
  tematicas: TematicaPsicologia[];
}