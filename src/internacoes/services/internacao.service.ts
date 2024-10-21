import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Internacao } from '../entities/internacao.entity';

@Injectable()
export class InternacaoService {
    constructor(
        @InjectRepository(Internacao)
        private readonly internacaoRepository: Repository<Internacao>,
    ) {}

    async findAll(): Promise<Internacao[]> {
        return await this.internacaoRepository.find();
    }

    async findById(id: number): Promise<Internacao> {
        const internacao = await this.internacaoRepository.findOne({ where: { id } });
        if (!internacao) {
            throw new NotFoundException(`Internação com ID ${id} não encontrada.`);
        }
        return internacao;
    }

    async create(internacao: Internacao): Promise<Internacao> {
        return await this.internacaoRepository.save(internacao);
    }

    async update(id: number, updateData: Partial<Internacao>): Promise<Internacao> {
        await this.findById(id); // Verifica se a internação existe
        await this.internacaoRepository.update(id, updateData);
        return this.findById(id);
    }

    async delete(id: number): Promise<void> {
        const result = await this.internacaoRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Internação com ID ${id} não encontrada.`);
        }
    }
}
