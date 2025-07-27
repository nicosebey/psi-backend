import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PsicologoService } from './psicologo.service';
import { CreatePsicologoDto } from './dto/create-psicologo.dto';
import { UpdatePsicologoDto } from './dto/update-psicologo.dto';
import { Psicologo, TematicaPsicologia } from './entities/psicologo.entity';

@Controller('psicologos')
export class PsicologoController {
  constructor(private readonly psicologoService: PsicologoService) {}

  @Post()
 create(@Body() createPsicologoDto: CreatePsicologoDto): Promise<Psicologo> {
    return this.psicologoService.create(createPsicologoDto);
  }

  @Get()
  findAll(): Promise<Psicologo[]> {
    return this.psicologoService.findAll();
  }

  @Get('tematica')
  findByTematica(@Query('tematica') tematica: TematicaPsicologia): Promise<Psicologo[]> {
    return this.psicologoService.findByTematica(tematica);
  }

  
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Psicologo> {
    return this.psicologoService.findOne(id);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePsicologoDto: UpdatePsicologoDto): Promise<Psicologo> {
    return this.psicologoService.update(id, updatePsicologoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.psicologoService.remove(id);
  }
} 