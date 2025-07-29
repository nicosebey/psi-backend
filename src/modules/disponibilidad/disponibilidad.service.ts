import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrearDisponibilidadDto } from './dto/crearDisponibilidad.dto';
import { Disponibilidad } from './entities/disponibilidad.entity';

@Injectable()
export class DisponibilidadService {
  constructor(
    @InjectRepository(Disponibilidad)
    private disponibilidadRepository: Repository<Disponibilidad>,
  ) {}

  async crearDisponibilidad(crearDisponibilidadDto: CrearDisponibilidadDto) {
    const { psicologoId, diaDeLaSemana } = crearDisponibilidadDto;
    const disponibilidadExistente = await this.disponibilidadRepository.findOne(
      {
        where: { psicologoId, diaDeLaSemana, isActive: true },
      },
    );

    if (disponibilidadExistente) {
      throw new ConflictException(
        'Ya existe una disponibilidad para este día. Actualiza la existente.',
      );
    }
    const disponibilidad = this.disponibilidadRepository.create(
      crearDisponibilidadDto,
    );
    return await this.disponibilidadRepository.save(disponibilidad);
  }

  async obtenerDisponibilidadUsuario(psicologoId: string) {
    return await this.disponibilidadRepository.find({
      where: { psicologoId, isActive: true },
      order: { diaDeLaSemana: 'ASC', horaInicio: 'ASC' },
    });
  }

  async actualizarDisponibilidad(
    id: number,
    datosActualizacion: Partial<CrearDisponibilidadDto>,
  ) {
    return await this.disponibilidadRepository.update(id, datosActualizacion);
  }

  async eliminarDisponibilidad(id: number) {
    return await this.disponibilidadRepository.update(id, { isActive: false });
  }

  // Generar horarios disponibles para un día específico
  async obtenerHorariosDisponibles(
    psicologoId: string,
    fecha: string,
  ): Promise<string[]> {
    const diaDeLaSemana = new Date(fecha).getDay();

    const disponibilidad = await this.disponibilidadRepository.findOne({
      where: { psicologoId, diaDeLaSemana, isActive: true },
    });

    if (!disponibilidad) return [];

    const horarios: string[] = [];
    const horaInicioNum = parseInt(disponibilidad.horaInicio.split(':')[0]);
    const minutoInicioNum = parseInt(disponibilidad.horaInicio.split(':')[1]);
    const horaFinNum = parseInt(disponibilidad.horaFin.split(':')[0]);
    const minutoFinNum = parseInt(disponibilidad.horaFin.split(':')[1]);

    let horaActual = horaInicioNum;
    let minutoActual = minutoInicioNum;

    while (
      horaActual < horaFinNum ||
      (horaActual === horaFinNum && minutoActual <= minutoFinNum - 60)
    ) {
      const horario = `${horaActual.toString().padStart(2, '0')}:${minutoActual.toString().padStart(2, '0')}`;
      horarios.push(horario);

      minutoActual += 60;
      if (minutoActual >= 60) {
        horaActual++;
        minutoActual = 0;
      }
    }

    return horarios;
  }
}
