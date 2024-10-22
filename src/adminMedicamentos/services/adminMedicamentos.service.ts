import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminMedicamentos } from '../entities/adminMedicamentos.entity';


@Injectable()
export class AdminMedicamentosService {
    constructor(
        @InjectRepository(AdminMedicamentos)
        private readonly adminMedicamentosRepository: Repository<AdminMedicamentos>,
    ) {}


    async findAll(): Promise<AdminMedicamentos[]> {
        return await this.adminMedicamentosRepository.find();
    }
    
    async findOne(id: number): Promise<AdminMedicamentos> {
        const adminMedicamento = await this.adminMedicamentosRepository.findOne({ where: { id } });
        if (!adminMedicamento) {
            throw new NotFoundException(`Administração de medicamento com ID ${id} não encontrada.`);
        }
        return adminMedicamento;
    }
    
    async create(adminMedicamento: AdminMedicamentos): Promise<AdminMedicamentos> {
        return await this.adminMedicamentosRepository.save(adminMedicamento);
    }

    async update(id: number, updatedAdminMedicamento: AdminMedicamentos): Promise<AdminMedicamentos> {
        const adminMedicamento = await this.findOne(id);
        Object.assign(adminMedicamento, updatedAdminMedicamento);
        return await this.adminMedicamentosRepository.save(adminMedicamento);
    }

    async remove(id: number): Promise<void> {
        const adminMedicamento = await this.findOne(id);
        await this.adminMedicamentosRepository.remove(adminMedicamento);
    }
}
