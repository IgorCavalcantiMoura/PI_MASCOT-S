import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProdutoEstoque } from "../entities/produto_estoque.entity";
import { DeleteResult, ILike, Repository } from "typeorm";

@Injectable()
export class ProdutoEstoqueService {
    constructor(
        @InjectRepository(ProdutoEstoque)
        private produtoEstoqueRepository: Repository<ProdutoEstoque>
    ) { }

    async findAll(): Promise<ProdutoEstoque[]> {
        return await this.produtoEstoqueRepository.find();
    }

    async findById(id: number): Promise<ProdutoEstoque> {

        let produtoEstoque = await this.produtoEstoqueRepository.findOne({
            where: {
                id
            }

        });

        if (!produtoEstoque)
            throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);

        return produtoEstoque;
    }

    async findByName(nome: string): Promise<ProdutoEstoque[]> { 
        return await this.produtoEstoqueRepository.find({
            where: {
                nome: ILike(`%${nome}`)
            }
        })
    }

    async findByType(tipo: string): Promise<ProdutoEstoque[]> { 
        return await this.produtoEstoqueRepository.find({
            where: {
                tipo: ILike(`%${tipo}`)
            }
        })
    }

    async findByDate(dataValidade: Date): Promise<ProdutoEstoque[]> { 
        return await this.produtoEstoqueRepository.find({
            where: {
                dataValidade: dataValidade
            }
        })
    }

    async findByLote(lote: string): Promise<ProdutoEstoque[]> { 
        return await this.produtoEstoqueRepository.find({
            where: {
                lote: ILike(`%${lote}`)
            }
        })
    }

    async create(produtoEstoque: ProdutoEstoque): Promise<ProdutoEstoque> {
        return await this.produtoEstoqueRepository.save(produtoEstoque)
    }

    async update(produtoEstoque: ProdutoEstoque): Promise<ProdutoEstoque> {

        let findprodutoEstoque: ProdutoEstoque = await this.findById(produtoEstoque.id)

        if (!findprodutoEstoque || !produtoEstoque.id)
            throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);

        return await this.produtoEstoqueRepository.save(produtoEstoque)
    }

    async delete(id: number): Promise<DeleteResult> {

        let findprodutoEstoque = await this.findById(id)

        if (!findprodutoEstoque)
            throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND)

        return await this.produtoEstoqueRepository.delete(id)
    }
}