import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Auxiliar } from "./entities/auxiliar.entity";
import { AuxiliarService } from "./services/auxiliar.service";
import { AuxiliarController } from "./controllers/auxiliar.controller";


@Module({
    imports: [TypeOrmModule.forFeature([Auxiliar])], 
    providers: [AuxiliarService],
    controllers: [AuxiliarController],
    exports: [TypeOrmModule],
  })
  export class AuxiliarModule {}