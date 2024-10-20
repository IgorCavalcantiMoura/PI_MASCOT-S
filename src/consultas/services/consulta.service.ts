import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, ILike, Repository } from 'typeorm';
import { Consulta } from '../entities/consulta.entity';
import { PetService } from '../../pet/services/pet.service';
import { VeterinarioService } from '../../veterinario/services/veterinario.service';
import { DonoPetService } from '../../dono_pet/services/donoPet.service';


@Injectable()
export class ConsultaService {
    constructor(
        @InjectRepository(Consulta)
        private consultasRepository: Repository<Consulta>,
        private petService: PetService,
        private veterinarioService: VeterinarioService,
        private donoPetService: DonoPetService,
    ) {}

    async findAll(): Promise<Consulta[]> {
        return await this.consultasRepository.find({
            relations: {
                pet: true,
                veterinario: true,
                donoPet: true,
            },
        });
    }

    async findById(id: number): Promise<Consulta> {
        const consulta = await this.consultasRepository.findOne({
            where: { id },
            relations: {
                pet: true,
                veterinario: true,
                donoPet: true,
            },
        });

        if (!consulta) {
            throw new HttpException('Consulta não encontrada!', HttpStatus.NOT_FOUND);
        }

        return consulta;
    }

    // Buscar consultas por veterinário
    async findByVeterinario(veterinarioId: number): Promise<Consulta[]> {
        return await this.consultasRepository.find({
            where: {
                veterinario: { id: veterinarioId }
            },
            relations: ['veterinario', 'donoPet', 'pet']
        });
    }

    async findByData(dataHora: string): Promise<Consulta[]> {
        return await this.consultasRepository.find({
            where: {
                dataHora: ILike (`%${dataHora}`)
            },
            relations: ['veterinario', 'donoPet', 'pet']
        });
    }

    async findByEstadoAnimal(estado_animal: string): Promise<Consulta[]> {
        return await this.consultasRepository.find({
            where: {
                estado_animal: ILike (`%${estado_animal}`)
            },
            relations: ['veterinario', 'donoPet', 'pet']
        });
    }

    async findByDiagnostico(diagnostico: string): Promise<Consulta[]> {
        return await this.consultasRepository.find({
            where: {
                diagnostico: ILike (`%${diagnostico}`)
            },
            relations: ['veterinario', 'donoPet', 'pet']
        });
    }
    
    // Buscar consultas por dono do pet
    async findByDonoPet(donoPetId: number): Promise<Consulta[]> {
        return await this.consultasRepository.find({
            where: {
                donoPet: { id: donoPetId }
            },
            relations: ['veterinario', 'donoPet', 'pet']
        });
    }

    async create(consulta: Consulta): Promise<Consulta> {
        if (!consulta.pet || !consulta.veterinario || !consulta.donoPet) {
            throw new HttpException('Dados incompletos para criar a consulta.', HttpStatus.BAD_REQUEST);
        }

        const pet = await this.petService.findById(consulta.pet.id);
        const veterinario = await this.veterinarioService.findById(consulta.veterinario.id);
        const donoPet = await this.donoPetService.findById(consulta.donoPet.id);

        if (!pet || !veterinario || !donoPet) {
            throw new HttpException('Pet, veterinário ou dono não encontrado!', HttpStatus.NOT_FOUND);
        }

        return await this.consultasRepository.save(consulta);
    }

    async update(consulta: Consulta): Promise<Consulta> {
        if (!consulta.id) {
            throw new HttpException('ID da consulta não fornecido.', HttpStatus.BAD_REQUEST);
        }

        const findConsulta = await this.findById(consulta.id);
        if (!findConsulta) {
            throw new HttpException('Consulta não encontrada!', HttpStatus.NOT_FOUND);
        }

        if (consulta.pet) {
            const pet = await this.petService.findById(consulta.pet.id);
            if (!pet) {
                throw new HttpException('Pet não encontrado!', HttpStatus.NOT_FOUND);
            }
        }

        if (consulta.veterinario) {
            const veterinario = await this.veterinarioService.findById(consulta.veterinario.id);
            if (!veterinario) {
                throw new HttpException('Veterinário não encontrado!', HttpStatus.NOT_FOUND);
            }
        }

        if (consulta.donoPet) {
            const donoPet = await this.donoPetService.findById(consulta.donoPet.id);
            if (!donoPet) {
                throw new HttpException('Dono do pet não encontrado!', HttpStatus.NOT_FOUND);
            }
        }

        return await this.consultasRepository.save(consulta);
    }

    async delete(id: number): Promise<void> {
        const findConsulta = await this.findById(id);
        if (!findConsulta) {
            throw new HttpException('Consulta não encontrada!', HttpStatus.NOT_FOUND);
        }

        await this.consultasRepository.delete(id);
    }
}
