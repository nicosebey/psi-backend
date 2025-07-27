import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArrayContains, Repository } from 'typeorm';
import { Psicologo, TematicaPsicologia } from './entities/psicologo.entity';
import { CreatePsicologoDto } from './dto/create-psicologo.dto';
import { UpdatePsicologoDto } from './dto/update-psicologo.dto';
import * as bcrypt from 'bcryptjs';

@Injectable() 
export class PsicologoService {
  constructor(
    @InjectRepository(Psicologo)
    private psicologosRepository: Repository<Psicologo>,
  ) {}

  async create(createPsicologoDto: CreatePsicologoDto): Promise<Psicologo> {
    // Verificar si el username ya existe
    const existingPsicologo = await this.psicologosRepository.findOne({
      where: { username: createPsicologoDto.username },
    });

    if (existingPsicologo) {
      throw new ConflictException('El username ya está en uso');
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(createPsicologoDto.password, 10);

    const psicologo = this.psicologosRepository.create({
      ...createPsicologoDto,
      password: hashedPassword,
    });

    return this.psicologosRepository.save(psicologo);
  }

  async findAll(): Promise<Psicologo[]> {
    return this.psicologosRepository.find();
  }

  async findOne(id: string): Promise<Psicologo> {
    const psicologo = await this.psicologosRepository.findOne({ where: { id } });
    if (!psicologo) {
      throw new NotFoundException('Psicólogo no encontrado');
    }
    return psicologo;
  }

  async findByTematica(tematica: TematicaPsicologia): Promise<Psicologo[]> {
    return this.psicologosRepository
      .createQueryBuilder('psicologo')
      .where(':tematica = ANY(psicologo.tematicas)', { tematica })
      .getMany();
  }

  async findByUsername(username: string): Promise<Psicologo> {
    const psicologo = await this.psicologosRepository.findOne({ where: { username } });
    if (!psicologo) {
      throw new NotFoundException('Psicólogo no encontrado');
    }
    return psicologo;
  }

  async update(id: string, updatePsicologoDto: UpdatePsicologoDto): Promise<Psicologo> {
    const psicologo = await this.findOne(id);
    
    // Si se está actualizando la contraseña, encriptarla
    if (updatePsicologoDto.password) {
      updatePsicologoDto.password = await bcrypt.hash(updatePsicologoDto.password, 10);
    }

    Object.assign(psicologo, updatePsicologoDto);
    return this.psicologosRepository.save(psicologo);
  }

  async remove(id: string): Promise<void> {
    const result = await this.psicologosRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Psicólogo no encontrado');
    }
  }
} 