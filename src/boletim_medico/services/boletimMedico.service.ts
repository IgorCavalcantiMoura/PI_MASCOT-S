import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoletimMedico } from '../entities/boletimMedico.entity';


@Injectable()
export class BoletimMedicoService {
    constructor(
        @InjectRepository(BoletimMedico)
        private readonly boletimMedicoRepository: Repository<BoletimMedico>,
    ) {}

    async findAll(): Promise<BoletimMedico[]> {
        return await this.boletimMedicoRepository.find({
            relations: {
                internacao: true 
            }
        });
    }

    async findById(id: number): Promise<BoletimMedico> {
        const boletim = await this.boletimMedicoRepository.findOne({ where: { id } });
        if (!boletim) {
            throw new NotFoundException(`Boletim Médico com ID ${id} não encontrado.`);
        }
        return boletim;
    }

    async findByInternacaoId(internacaoId: number): Promise<BoletimMedico[]> {
        return await this.boletimMedicoRepository.find({ where: { internacao: { id: internacaoId } } });
    }

    async create(boletimMedico: BoletimMedico): Promise<BoletimMedico> {
        return await this.boletimMedicoRepository.save(boletimMedico);
    }

    async update(id: number, boletimMedico: BoletimMedico): Promise<BoletimMedico> {
        await this.findById(id); // Verifica se o boletim existe
        await this.boletimMedicoRepository.update(id, boletimMedico);
        return this.findById(id);
    }

    async delete(id: number): Promise<void> {
        const result = await this.boletimMedicoRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Boletim Médico com ID ${id} não encontrado.`);
        }
    }
}
