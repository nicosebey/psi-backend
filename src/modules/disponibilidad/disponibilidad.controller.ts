import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { CrearDisponibilidadDto } from './dto/crearDisponibilidad.dto';
import { DisponibilidadService } from './disponibilidad.service';

@Controller('disponibilidad')
export class DisponibilidadController {
  constructor(private readonly disponibilidadService: DisponibilidadService) {}

  @Post()
  async crear(@Body() crearDisponibilidadDto: CrearDisponibilidadDto) {
    return await this.disponibilidadService.crearDisponibilidad(crearDisponibilidadDto);
  }

  @Get('usuario/:psicologo')
  async obtenerDisponibilidadUsuario(@Param('psicologo') psicologo: string) {
    return await this.disponibilidadService.obtenerDisponibilidadUsuario(psicologo);
  }

  @Get('horarios/:psicologo')
  async obtenerHorariosDisponibles(
    @Param('psicologo') psicologo: string,
    @Query('fecha') fecha: string
  ) {
    return await this.disponibilidadService.obtenerHorariosDisponibles(psicologo, fecha);
  }

  @Put(':id')
  async actualizar(
    @Param('id') id: number,
    @Body() datosActualizacion: Partial<CrearDisponibilidadDto>
  ) {
    return await this.disponibilidadService.actualizarDisponibilidad(id, datosActualizacion);
  }

  @Delete(':id')
  async eliminar(@Param('id') id: number) {
    return await this.disponibilidadService.eliminarDisponibilidad(id);
  }
}