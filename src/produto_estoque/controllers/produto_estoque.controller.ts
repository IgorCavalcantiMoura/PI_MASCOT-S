import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { ProdutoEstoque } from '../entities/produto_estoque.entity';
import { ProdutoEstoqueService } from '../services/produto_estoque.service';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('ProdutoEstoque')
@ApiBearerAuth()
@Controller('produtos-estoque')
export class ProdutoEstoqueController {
    constructor(private readonly produtoEstoqueService: ProdutoEstoqueService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Obter todos os produtos em estoque' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Lista de produtos em estoque obtida com sucesso.' })
    findAll(): Promise<ProdutoEstoque[]> {
        return this.produtoEstoqueService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('/id/:id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Obter produto em estoque pelo ID' })
    @ApiParam({ name: 'id', description: 'ID do produto em estoque' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Produto em estoque obtido com sucesso.' })
    findById(@Param('id') id: number): Promise<ProdutoEstoque> {
        return this.produtoEstoqueService.findById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/nome/:nome')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Obter produtos em estoque pelo nome' })
    @ApiParam({ name: 'nome', description: 'Nome dos produtos em estoque' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Lista de produtos com o nome fornecido obtida com sucesso.' })
    findByName(@Param('nome') nome: string): Promise<ProdutoEstoque[]> {
        return this.produtoEstoqueService.findByName(nome);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/tipo/:tipo')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Obter produtos em estoque pelo tipo' })
    @ApiParam({ name: 'tipo', description: 'Tipo dos produtos em estoque' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Lista de produtos com o tipo fornecido obtida com sucesso.' })
    findByType(@Param('tipo') tipo: string): Promise<ProdutoEstoque[]> {
        return this.produtoEstoqueService.findByType(tipo);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/data/:dataValidade')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Obter produtos em estoque pela data de validade' })
    @ApiParam({ name: 'dataValidade', description: 'Data de validade dos produtos em estoque', example: '2023-12-31' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Lista de produtos com a data de validade fornecida obtida com sucesso.' })
    findByDate(@Param('dataValidade') dataValidade: Date): Promise<ProdutoEstoque[]> {
        return this.produtoEstoqueService.findByDate(dataValidade);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/lote/:lote')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Obter produtos em estoque pelo lote' })
    @ApiParam({ name: 'lote', description: 'Lote dos produtos em estoque' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Lista de produtos com o lote fornecido obtida com sucesso.' })
    findByLote(@Param('lote') lote: string): Promise<ProdutoEstoque[]> {
        return this.produtoEstoqueService.findByLote(lote);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Cadastrar um novo produto em estoque' })
    @ApiBody({ description: 'Dados do novo produto em estoque', type: ProdutoEstoque })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Produto em estoque criado com sucesso.' })
    create(@Body() produtoEstoque: ProdutoEstoque): Promise<ProdutoEstoque> {
        return this.produtoEstoqueService.create(produtoEstoque);
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Atualizar um produto em estoque' })
    @ApiBody({ description: 'Dados atualizados do produto em estoque', type: ProdutoEstoque })
    @ApiResponse({ status: HttpStatus.OK, description: 'Produto em estoque atualizado com sucesso.' })
    update(@Body() produtoEstoque: ProdutoEstoque): Promise<ProdutoEstoque> {
        return this.produtoEstoqueService.update(produtoEstoque);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Excluir um produto em estoque pelo ID' })
    @ApiParam({ name: 'id', description: 'ID do produto em estoque a ser excluído' })
    @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Produto em estoque excluído com sucesso.' })
    delete(@Param('id') id: number): Promise<DeleteResult> {
        return this.produtoEstoqueService.delete(id);
    }
}
