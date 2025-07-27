import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Psicologo } from '../modules/psicologo/entities/psicologo.entity';
import { Disponibilidad } from 'src/modules/disponibilidad/entities/disponibilidad.entity';
import { Turno } from 'src/modules/turno/entities/turno.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5435'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'psi_backend',
  entities: [Psicologo,Disponibilidad,Turno],
  synchronize: true, // Solo en desarrollo
  logging: process.env.NODE_ENV !== 'production',
}; 