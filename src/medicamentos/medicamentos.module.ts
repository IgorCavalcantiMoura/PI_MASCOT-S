import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Medicamento } from "./entities/medicamento.entity";
import { MedicamentoService } from "./services/medicamento.service";
import { MedicamentoController } from "./controllers/medicamento.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Medicamento])], 
    providers: [MedicamentoService],
    controllers: [MedicamentoController],
    exports: [TypeOrmModule],
  })
  export class MedicamentoModule {}