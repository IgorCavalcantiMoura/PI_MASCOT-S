import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Administrador } from "../entities/administrador.entity";
import { DeleteResult, ILike, Repository } from "typeorm";

@Injectable()
export class AdministradorService {
    constructor(
        @InjectRepository(Administrador)
        private administardorRepository: Repository<Administrador>
    ) { }

    async findAll(): Promise<Administrador[]> {
        return await this.administardorRepository.find();
    }

    async findById(id: number): Promise<Administrador> {

        let administardor = await this.administardorRepository.findOne({
            where: {
                id
            }

        });

        if (!administardor)
            throw new HttpException('Administrador não encontrado!', HttpStatus.NOT_FOUND);

        return administardor;
    }

    async findByName(nome: string): Promise<Administrador[]> { 
        return await this.administardorRepository.find({
            where: {
                nome: ILike(`%${nome}`)
            }
        })
    }

    async create(administrador: Administrador): Promise<Administrador> {
        return await this.administardorRepository.save(administrador)
    }

    async update(administrador: Administrador): Promise<Administrador> {

        let findAdministrador: Administrador = await this.findById(administrador.id)

        if (!findAdministrador || !administrador.id)
            throw new HttpException('Administrador não encontrado!', HttpStatus.NOT_FOUND);

        return await this.administardorRepository.save(administrador)
    }

    async delete(id: number): Promise<DeleteResult> {

        let findAdministrador = await this.findById(id)

        if (!findAdministrador)
            throw new HttpException('Administrador não encontrado!', HttpStatus.NOT_FOUND)

        return await this.administardorRepository.delete(id)
    }
}