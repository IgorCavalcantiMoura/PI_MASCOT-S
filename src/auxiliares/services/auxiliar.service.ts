import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Auxiliar } from "../entities/auxiliar.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";

@Injectable()
export class AuxiliarService {
    constructor(
        @InjectRepository(Auxiliar)
        private auxiliarRepository: Repository<Auxiliar>
    ) { }

    async findAll(): Promise<Auxiliar[]> {
        return await this.auxiliarRepository.find();
    }

    async findById(id: number): Promise<Auxiliar> {

        let auxiliar = await this.auxiliarRepository.findOne({
            where: {
                id
            }

        });

        if (!auxiliar)
            throw new HttpException('Auxiliar não encontrado!', HttpStatus.NOT_FOUND);

        return auxiliar;
    }

    async findByName(nome: string): Promise<Auxiliar[]> { 
        return await this.auxiliarRepository.find({
            where: {
                nome: ILike(`%${nome}`)
            }
        })
    }

    async create(auxiliar: Auxiliar): Promise<Auxiliar> {
        return await this.auxiliarRepository.save(auxiliar)
    }

    async update(auxiliar: Auxiliar): Promise<Auxiliar> {

        let findAuxiliar: Auxiliar = await this.findById(auxiliar.id)

        if (!findAuxiliar || !auxiliar.id)
            throw new HttpException('Auxiliar não encontrado!', HttpStatus.NOT_FOUND);

        return await this.auxiliarRepository.save(auxiliar)
    }

    async delete(id: number): Promise<DeleteResult> {

        let findAuxiliar = await this.findById(id)

        if (!findAuxiliar)
            throw new HttpException('Auxiliar não encontrado!', HttpStatus.NOT_FOUND)

        return await this.auxiliarRepository.delete(id)
    }
}