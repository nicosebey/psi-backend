import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Turno } from './entities/turno.entity';
import { DisponibilidadService } from '../disponibilidad/disponibilidad.service';
import { CrearTurnoDto } from './dto/create-turno.dto';

@Injectable()
export class TurnoService {
  constructor(
    @InjectRepository(Turno)
    private turnoRepository: Repository<Turno>,
    private disponibilidadService: DisponibilidadService,
  ) {}

  async crearTurno(crearTurnoDto: CrearTurnoDto) {
    const { fecha, horaInicio, psicologo } = crearTurnoDto;

    const estaDisponible = await this.estaHorarioDisponible(psicologo, fecha, horaInicio);
    if (!estaDisponible) {
      throw new Error('El horario seleccionado no está disponible');
    }

    const horaFin = this.agregarHora(horaInicio);

    const turno = this.turnoRepository.create({
      ...crearTurnoDto,
      horaFin,
    });

    return await this.turnoRepository.save(turno);
  }

  async estaHorarioDisponible(psicologo: string, fecha: string, horaInicio: string): Promise<boolean> {
    const horariosDisponibles = await this.disponibilidadService.obtenerHorariosDisponibles(psicologo, fecha);
    if (!horariosDisponibles.includes(horaInicio)) {
      return false;
    }

    const turnoExistente = await this.turnoRepository.findOne({
      where: {
        psicologo,
        fecha,
        horaInicio,
        estado: 'programado'
      }
    });

    return !turnoExistente;
  }

  async obtenerTurnosPsicologo(psicologo: string, fecha?: string) {
    const donde: any = { psicologo };
    if (fecha) donde.fecha = fecha;

    return await this.turnoRepository.find({
      where: donde,
      order: { fecha: 'ASC', horaInicio: 'ASC' }
    });
  }

  async getDiaMasConsultasPorPsicologo(psicologo: string) {
    const result = await this.turnoRepository
      .createQueryBuilder('turno')
      .select('turno.fecha', 'fecha')
      .addSelect('COUNT(*)', 'cantidad')
      .where('turno.psicologo = :psicologo', { psicologo })
      .andWhere('turno.estado = :estado', { estado: 'programado' })
      .groupBy('turno.fecha')
      .orderBy('cantidad', 'DESC')
      .addOrderBy('turno.fecha', 'ASC')
      .limit(1)
      .getRawOne();
      
    return result;
  }

  async obtenerTurnosCliente(clienteEmail: string) {
    return await this.turnoRepository.find({
      where: { clienteEmail },
      order: { fecha: 'ASC', horaInicio: 'ASC' }
    });
  }

  async cancelarTurno(turnoId: number) {
    return await this.turnoRepository.update(turnoId, { 
      estado: 'cancelado' 
    });
  }

  async obtenerTurnosDisponibles(psicologo: string, fecha: string) {
    const horariosDisponibles = await this.disponibilidadService.obtenerHorariosDisponibles(psicologo, fecha);
    const horariosOcupados = await this.obtenerHorariosOcupados(psicologo, fecha);
    
    return horariosDisponibles.filter(horario => !horariosOcupados.includes(horario));
  }

  async getTematicaMasConsultada() {
    const result = await this.turnoRepository
      .createQueryBuilder('turno')
      .select('turno.tematica', 'tematica')
      .addSelect('COUNT(*)', 'cantidad')
      .where('turno.estado IN (:...estados)', { estados: ['completado', 'programado'] })
      .groupBy('turno.tematica')
      .orderBy('cantidad', 'DESC')
      .limit(1)
      .getRawOne();
      
    return result;
  }
    


  private async obtenerHorariosOcupados(psicologo: string, fecha: string): Promise<string[]> {
    const turnos = await this.turnoRepository.find({
      where: { psicologo, fecha, estado: 'programado' },
      select: ['horaInicio']
    });

    return turnos.map(turno => turno.horaInicio);
  }

  private agregarHora(hora: string): string {
    const [horas, minutos] = hora.split(':').map(Number);
    const nuevasHoras = (horas + 1) % 24;
    return `${nuevasHoras.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
  }
}
