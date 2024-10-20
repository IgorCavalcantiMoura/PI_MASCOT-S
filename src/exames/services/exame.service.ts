import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Exame } from '../entities/exame.entity';
import { VeterinarioService } from '../../veterinario/services/veterinario.service';
import { PetService } from '../../pet/services/pet.service';
import { ConsultaService } from '../../consultas/services/consulta.service';

@Injectable()
export class ExameService {
  constructor(
    @InjectRepository(Exame)
    private examesRepository: Repository<Exame>,
    private consultaService: ConsultaService,
    private veterinarioService: VeterinarioService,
    private petService: PetService,
  ) {}

  async findAll(): Promise<Exame[]> {
    return await this.examesRepository.find({
      relations: {
        consulta: true,
        // veterinario: true,
        // pet: true,
      },
    });
  }

  async findById(id: number): Promise<Exame> {
    const exame = await this.examesRepository.findOne({
      where: { id },
      relations: {
        consulta: true,
        // veterinario: true,
        // pet: true,
      },
    });

    if (!exame) {
      throw new HttpException('Exame não encontrado!', HttpStatus.NOT_FOUND);
    }

    return exame;
  }

  // Buscar exames por nome
  async findByNome(nome: string): Promise<Exame[]> {
    return await this.examesRepository.find({
      where: {
        nome: ILike(`%${nome}%`),
      },
      relations: {
        consulta: true,
        // veterinario: true,
        // pet: true,
      },
    });
  }

  // Buscar exames por resultado
  async findByResultado(resultado: string): Promise<Exame[]> {
    return await this.examesRepository.find({
      where: {
        resultado: ILike(`%${resultado}%`),
      },
      relations: {
        consulta: true,
        // veterinario: true,
        // pet: true,
      },
    });
  }

  async findByData(dataHora: string): Promise<Exame[]> {
    return await this.examesRepository.find({
      where: {
        dataHora: ILike(`%${dataHora}%`),
      },
      relations: {
        consulta: true,
        // veterinario: true,
        // pet: true,
      },
    });
  }

  // Método para buscar exames por ID do pet
  async findByPetId(petId: number): Promise<Exame[]> {
    const exames = await this.examesRepository.find({
      where: {
        pet: {
          id: petId,
        },
      },
      relations: {
        consulta: true,
        // veterinario: true,
        // pet: true,
      },
    });

    if (exames.length === 0) {
      throw new HttpException(
        'Nenhum exame encontrado para este pet.',
        HttpStatus.NOT_FOUND,
      );
    }

    return exames;
  }

  async create(exame: Exame): Promise<Exame> {
    if (!exame.consulta || !exame.veterinario || !exame.pet) {
      throw new HttpException(
        'Dados incompletos para criar o exame.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const consulta = await this.consultaService.findById(exame.consulta.id);
    const veterinario = await this.veterinarioService.findById(
      exame.veterinario.id,
    );
    const pet = await this.petService.findById(exame.pet.id);

    if (!consulta || !veterinario || !pet) {
      throw new HttpException(
        'Consulta, veterinário ou pet não encontrado!',
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.examesRepository.save(exame);
  }

  async update(exame: Exame): Promise<Exame> {
    if (!exame.id) {
      throw new HttpException(
        'ID do exame não fornecido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const findExame = await this.findById(exame.id);
    if (!findExame) {
      throw new HttpException('Exame não encontrado!', HttpStatus.NOT_FOUND);
    }

    if (exame.consulta) {
      const consulta = await this.consultaService.findById(exame.consulta.id);
      if (!consulta) {
        throw new HttpException(
          'Consulta não encontrada!',
          HttpStatus.NOT_FOUND,
        );
      }
    }

    if (exame.veterinario) {
      const veterinario = await this.veterinarioService.findById(
        exame.veterinario.id,
      );
      if (!veterinario) {
        throw new HttpException(
          'Veterinário não encontrado!',
          HttpStatus.NOT_FOUND,
        );
      }
    }

    if (exame.pet) {
      const pet = await this.petService.findById(exame.pet.id);
      if (!pet) {
        throw new HttpException('Pet não encontrado!', HttpStatus.NOT_FOUND);
      }
    }

    return await this.examesRepository.save(exame);
  }

  async updateStatus(id: number, status: string): Promise<Exame> {
    const exame = await this.examesRepository.findOne({ where: { id } });
    if (!exame) {
      throw new HttpException('Exame não encontrado!', HttpStatus.NOT_FOUND);
    }

    exame.status = status;
    return await this.examesRepository.save(exame);
  }

  async delete(id: number): Promise<void> {
    const findExame = await this.findById(id);
    if (!findExame) {
      throw new HttpException('Exame não encontrado!', HttpStatus.NOT_FOUND);
    }

    await this.examesRepository.delete(id);
  }
}
