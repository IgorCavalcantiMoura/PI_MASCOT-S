import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DonoPet } from "../entities/donoPet.entity";
import { DeleteResult, ILike, Repository } from "typeorm";

@Injectable()
export class DonoPetService {
    constructor(
        @InjectRepository(DonoPet)
        private donoPetRepository: Repository<DonoPet>
    ) { }

    async findAll(): Promise<DonoPet[]> {
        return await this.donoPetRepository.find();
    }

    async findById(id: number): Promise<DonoPet> {
        let donoPet = await this.donoPetRepository.findOne({
            where: {
                id
            }
        });

        if (!donoPet)
            throw new HttpException('Cliente não encontrado!', HttpStatus.NOT_FOUND);

        return donoPet;
    }

    async findByName(nome: string): Promise<DonoPet[]> { 
        return await this.donoPetRepository.find({
            where: {
                nome: ILike(`%${nome}%`)
            }
        });
    }

    async findByEmail(email: string): Promise<DonoPet[]> { 
        return await this.donoPetRepository.find({
            where: {
                email: ILike(`%${email}%`)
            }
        });
    }

    async findByCpf(cpf: string): Promise<DonoPet[]> { 
        return await this.donoPetRepository.find({
            where: {
                cpf: ILike(`%${cpf}%`)
            }
        });
    }

    async findByTelefone(telefone: string): Promise<DonoPet[]> {
        return await this.donoPetRepository.find({
            where: {
                telefone: ILike(`%${telefone}%`)
            }
        });
    }

    async findByEndereco(endereco: string): Promise<DonoPet[]> {
        return await this.donoPetRepository.find({
            where: {
                endereco: ILike(`%${endereco}%`)
            }
        });
    }

    async updatePartial(id: number, partialUpdate: Partial<DonoPet>): Promise<DonoPet> {
        let findDonoPet: DonoPet = await this.findById(id);

        if (!findDonoPet)
            throw new HttpException('Cliente não encontrado!', HttpStatus.NOT_FOUND);

        await this.donoPetRepository.update(id, partialUpdate);
        return this.findById(id); 
    }

    

    async create(donoPet: DonoPet): Promise<DonoPet> {
        return await this.donoPetRepository.save(donoPet);
    }

    async update(donoPet: DonoPet): Promise<DonoPet> {
        let findDonoPet: DonoPet = await this.findById(donoPet.id);

        if (!findDonoPet || !donoPet.id)
            throw new HttpException('Cliente não encontrado!', HttpStatus.NOT_FOUND);

        return await this.donoPetRepository.save(donoPet);
    }

    async delete(id: number): Promise<DeleteResult> {
        let findDonoPet = await this.findById(id);

        if (!findDonoPet)
            throw new HttpException('Cliente não encontrado!', HttpStatus.NOT_FOUND);

        return await this.donoPetRepository.delete(id);
    }
}
