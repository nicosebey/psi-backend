import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum TematicaPsicologia {
  ANSIEDAD = 'ansiedad',
  DEPRESION = 'depresion',
  TERAPIA_FAMILIAR = 'terapia_familiar',
  TERAPIA_PAREJA = 'terapia_pareja',
  TRASTORNOS_ALIMENTARIOS = 'trastornos_alimentarios',
  ADICCIONES = 'adicciones',
  DUELO = 'duelo',
  AUTOESTIMA = 'autoestima',
  ESTRES = 'estres',
  TERAPIA_COGNITIVA = 'terapia_cognitiva'
}
@Entity('psicologo')
export class Psicologo {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  nombre: string

  @Column()
  apellido: string

  @Column({ unique: true })
  username: string

  @Column()
  password: string

  @Column('enum', { 
    enum: TematicaPsicologia, 
    array: true 
  })
  tematicas: TematicaPsicologia[];

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
