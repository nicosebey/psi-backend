import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('disponibilidad')
export class Disponibilidad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  psicologoId: string;

  @Column()
  diaDeLaSemana: number; // 0-6

  @Column({ type: 'time' })
  horaInicio: string;

  @Column({ type: 'time' })
  horaFin: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
