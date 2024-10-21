import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medicamento } from '../entities/medicamento.entity';


@Injectable()
export class MedicamentoService {
    constructor(
        @InjectRepository(Medicamento)
        private medicamentoRepository: Repository<Medicamento>,
    ) {}

    async findAll(): Promise<Medicamento[]> {
        return await this.medicamentoRepository.find();
    }

    async findOne(id: number): Promise<Medicamento> {
        const medicamento = await this.medicamentoRepository.findOne({ where: { id } });
        if (!medicamento) {
            throw new NotFoundException(`Medicamento com ID ${id} não encontrado`);
        }
        return medicamento;
    }

    async create(medicamento: Medicamento): Promise<Medicamento> {
        return await this.medicamentoRepository.save(medicamento);
    }

    async update(id: number, medicamento: Medicamento): Promise<Medicamento> {
        const medicamentoExistente = await this.medicamentoRepository.findOne({ where: { id } });
        if (!medicamentoExistente) {
            throw new NotFoundException(`Medicamento com ID ${id} não encontrado`);
        }
        await this.medicamentoRepository.update(id, medicamento);
        return this.medicamentoRepository.findOne({ where: { id } });
    }

    async delete(id: number): Promise<void> {
        const result = await this.medicamentoRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Medicamento com ID ${id} não encontrado`);
        }
    }
}
