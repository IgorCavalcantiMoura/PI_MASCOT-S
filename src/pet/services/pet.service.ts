import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Pet } from "../entities/pet.entity";
import { DeleteResult, ILike, Repository } from "typeorm";
import { DonoPetService } from "../../dono_pet/services/donoPet.service";


@Injectable()
export class PetService {
    constructor(
        @InjectRepository(Pet)
        private petRepository: Repository<Pet>,
        private donoPetService: DonoPetService
    ) {}

    async findAll(): Promise<Pet[]> {
        return await this.petRepository.find({
            relations: {
                donoPet: true
            }
        });
    }

    async findById(id: number): Promise<Pet> {
        const pet = await this.petRepository.findOne({
            where: { id },
            relations: { donoPet: true }
        });

        if (!pet) {
            throw new HttpException("Pet não localizado!", HttpStatus.NOT_FOUND);
        }

        return pet;
    }

    async findByName(nome: string): Promise<Pet[]> {
        return await this.findBy({ nome: ILike(`%${nome}%`) });
    }

    async findByEspecie(especie: string): Promise<Pet[]> {
        return await this.findBy({ especie: ILike(`%${especie}%`) });
    }

    async findByGenero(genero: string): Promise<Pet[]> {
        return await this.findBy({ genero: ILike(`%${genero}%`) });
    }

    async create(pet: Pet): Promise<Pet> {
        this.validatePetData(pet);
        await this.validateDonoPet(pet.donoPet?.id);
        return await this.petRepository.save(pet);
    }

    async update(pet: Pet): Promise<Pet> {
        if (!pet.id) {
            throw new HttpException('ID do pet não fornecido.', HttpStatus.BAD_REQUEST);
        }

        await this.findById(pet.id);
        this.validateDonoPet(pet.donoPet?.id);
        return await this.petRepository.save(pet);
    }

    async delete(id: number): Promise<DeleteResult> {
        await this.findById(id);
        return await this.petRepository.delete(id);
    }

    private async validateDonoPet(donoPetId?: number) {
        if (donoPetId) {
            const donoPet = await this.donoPetService.findById(donoPetId);
            if (!donoPet) {
                throw new HttpException("Cliente não encontrado!", HttpStatus.NOT_FOUND);
            }
        }
    }

    private validatePetData(pet: Pet) {
        if (!pet.nome || !pet.especie || !pet.genero) {
            throw new HttpException('Dados incompletos para criar o pet.', HttpStatus.BAD_REQUEST);
        }
    }

    private async findBy(where: object): Promise<Pet[]> {
        return await this.petRepository.find({
            where,
            relations: { donoPet: true }
        });
    }
}

