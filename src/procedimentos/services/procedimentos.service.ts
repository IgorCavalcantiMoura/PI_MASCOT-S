import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Procedimento } from '../entities/procedimento.entity';

@Injectable()
export class ProcedimentoService {
  constructor(
    @InjectRepository(Procedimento)
    private readonly procedimentoRepository: Repository<Procedimento>,
  ) {}

  async findAll(): Promise<Procedimento[]> {
    return await this.procedimentoRepository.find({
      relations: {
        consulta: true,
      },
    });
  }

  async findById(id: number): Promise<Procedimento> {
    const procedimento = await this.procedimentoRepository.findOne({
      where: {
        id,
      },
      relations: {
        consulta: true,
      },
    });
    if (!procedimento) {
      throw new NotFoundException(`Procedimento com ID ${id} não encontrado`);
    }
    return procedimento;
  }

  async create(procedimento: Procedimento): Promise<Procedimento> {
    return await this.procedimentoRepository.save(procedimento);
  }

  async update(id: number, procedimento: Procedimento): Promise<Procedimento> {
    await this.findById(id); // Verifica se o procedimento existe
    await this.procedimentoRepository.update(id, procedimento);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    const result = await this.procedimentoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Procedimento com ID ${id} não encontrado`);
    }
  }
}
