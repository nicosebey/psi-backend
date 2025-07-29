import { TematicaPsicologia } from 'src/modules/psicologo/entities/psicologo.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('turno')
export class Turno {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  psicologo: string;

  @Column()
  clienteEmail: string;

  @Column({ type: 'date' })
  fecha: string;

  @Column({ type: 'time' })
  horaInicio: string;

  @Column({ type: 'time' })
  horaFin: string;

  @Column()
  isVirtual: boolean;

  @Column()
  tematica: TematicaPsicologia;

  @Column({
    type: 'enum',
    enum: ['programado', 'completado', 'cancelado'],
    default: 'programado',
  })
  estado: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
