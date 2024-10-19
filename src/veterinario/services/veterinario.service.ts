import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike, DeleteResult } from 'typeorm';
import { Veterinario } from '../entities/veterianario.entity';


@Injectable()
export class VeterinarioService {
    constructor(
        @InjectRepository(Veterinario)
        private veterinarioRepository: Repository<Veterinario>,
    ) {}

    async findAll(): Promise<Veterinario[]> {
        return await this.veterinarioRepository.find();
    }

    async findById(id: number): Promise<Veterinario> {
        const veterinario = await this.veterinarioRepository.findOne({
            where: { id }
        });

        if (!veterinario) {
            throw new HttpException('Veterinário não encontrado!', HttpStatus.NOT_FOUND);
        }

        return veterinario;
    }

    async findByName(nome: string): Promise<Veterinario[]> {
        return await this.veterinarioRepository.find({
            where: {
                nome: ILike(`%${nome}%`)
            }
        });
    }

    async findByEspecialidade(especialidade: string): Promise<Veterinario[]> {
        return await this.veterinarioRepository.find({
            where: {
                especialidade: ILike(`%${especialidade}%`)
            }
        });
    }

    async findByRegistro(registroConselho: string): Promise<Veterinario[]> {
        return await this.veterinarioRepository.find({
            where: {
                registroConselho: ILike(`%${registroConselho}%`)
            }
        });
    }

    async create(veterinario: Veterinario): Promise<Veterinario> {
        if (!veterinario.nome || !veterinario.especialidade || !veterinario.registroConselho) {
            throw new HttpException('Dados incompletos para criar o veterinário.', HttpStatus.BAD_REQUEST);
        }

        return await this.veterinarioRepository.save(veterinario);
    }

    async update(veterinario: Veterinario): Promise<Veterinario> {
        if (!veterinario.id) {
            throw new HttpException('ID do veterinário não fornecido.', HttpStatus.BAD_REQUEST);
        }

        const findVeterinario = await this.findById(veterinario.id);
        if (!findVeterinario) {
            throw new HttpException('Veterinário não encontrado!', HttpStatus.NOT_FOUND);
        }

        return await this.veterinarioRepository.save(veterinario);
    }

    async delete(id: number): Promise<DeleteResult> {
        const findVeterinario = await this.findById(id);
        if (!findVeterinario) {
            throw new HttpException('Veterinário não encontrado!', HttpStatus.NOT_FOUND);
        }

        return await this.veterinarioRepository.delete(id);
    }
}
