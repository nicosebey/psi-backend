import { Controller, Get, Post, Put, Body, Param, Query } from '@nestjs/common';
import { CrearTurnoDto } from './dto/create-turno.dto';
import { TurnoService } from './turno.service';

@Controller('turnos')
export class TurnoController {
  constructor(private readonly turnoService: TurnoService) {}

  @Post()
  async crear(@Body() crearTurnoDto: CrearTurnoDto) {
    return await this.turnoService.crearTurno(crearTurnoDto);
  }

  @Get('psicologo/:psicologo')
  async obtenerTurnosProveedor(
    @Param('psicologo') psicologo: string,
    @Query('fecha') fecha?: string,
  ) {
    return await this.turnoService.obtenerTurnosPsicologo(psicologo, fecha);
  }

  @Get('cliente/:clienteEmail')
  async obtenerTurnosCliente(@Param('clienteEmail') clienteEmail: string) {
    return await this.turnoService.obtenerTurnosCliente(clienteEmail);
  }

  @Get('tematicaMasConsultada')
  async getTematicaMasConsultada() {
    return await this.turnoService.getTematicaMasConsultada();
  }

  @Get('diaMasOcupado/:psicologo')
  async obtenerDiaMasOcupado(@Param('psicologo') psicologo: string) {
    return await this.turnoService.getDiaMasConsultasPorPsicologo(psicologo);
  }

  @Get('disponibles/:psicologo')
  async obtenerTurnosDisponibles(
    @Param('psicologo') psicologo: string,
    @Query('fecha') fecha: string,
  ) {
    return await this.turnoService.obtenerTurnosDisponibles(psicologo, fecha);
  }

  @Put(':id/cancelar')
  async cancelarTurno(@Param('id') id: number) {
    return await this.turnoService.cancelarTurno(id);
  }
}
