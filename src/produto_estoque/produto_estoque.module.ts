import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProdutoEstoque } from "./entities/produto_estoque.entity";
import { ProdutoEstoqueService } from "./services/produto_estoque.service";
import { ProdutoEstoqueController } from "./controllers/produto_estoque.controller";

@Module({
    imports: [TypeOrmModule.forFeature([ProdutoEstoque])], 
    providers: [ProdutoEstoqueService],
    controllers: [ProdutoEstoqueController],
    exports: [TypeOrmModule],
  })
  export class ProdutoEstoqueModule {}