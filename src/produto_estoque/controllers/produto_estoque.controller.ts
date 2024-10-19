import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { ProdutoEstoque } from '../entities/produto_estoque.entity';
import { ProdutoEstoqueService } from '../services/produto_estoque.service';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiTags('ProdutoEstoque')
@ApiBearerAuth()
@Controller('produtos-estoque')
export class ProdutoEstoqueController {
    constructor(private readonly produtoEstoqueService: ProdutoEstoqueService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<ProdutoEstoque[]> {
        return this.produtoEstoqueService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('/id/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id') id: number): Promise<ProdutoEstoque> {
        return this.produtoEstoqueService.findById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/nome/:nome')
    @HttpCode(HttpStatus.OK)
    findByName(@Param('nome') nome: string): Promise<ProdutoEstoque[]> {
        return this.produtoEstoqueService.findByName(nome);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/tipo/:tipo')
    @HttpCode(HttpStatus.OK)
    findByType(@Param('tipo') tipo: string): Promise<ProdutoEstoque[]> {
        return this.produtoEstoqueService.findByType(tipo);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/data/:dataValidade')
    @HttpCode(HttpStatus.OK)
    findByDate(@Param('dataValidade') dataValidade: Date): Promise<ProdutoEstoque[]> {
        return this.produtoEstoqueService.findByDate(dataValidade);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/lote/:lote')
    @HttpCode(HttpStatus.OK)
    findByLote(@Param('lote') lote: string): Promise<ProdutoEstoque[]> {
        return this.produtoEstoqueService.findByLote(lote);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() produtoEstoque: ProdutoEstoque): Promise<ProdutoEstoque> {
        return this.produtoEstoqueService.create(produtoEstoque);
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() produtoEstoque: ProdutoEstoque): Promise<ProdutoEstoque> {
        return this.produtoEstoqueService.update(produtoEstoque);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id') id: number): Promise<DeleteResult> {
        return this.produtoEstoqueService.delete(id);
    }
}
