import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Administrador } from "./entities/administrador.entity";
import { AdministradorService } from "./services/administrador.service";
import { AdministradorController } from "./controllers/administrador.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Administrador])], 
    providers: [AdministradorService],
    controllers: [AdministradorController],
    exports: [TypeOrmModule],
  })
  export class AdministradorModule {}