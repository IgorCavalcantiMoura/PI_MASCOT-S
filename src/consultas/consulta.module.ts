import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Consulta } from "./entities/consulta.entity";
import { ConsultaService } from "./services/consulta.service";
import { ConsultasController } from "./controllers/consulta.controller";
import { DonoPetModule } from "../dono_pet/donoPet.module";
import { PetModule } from "../pet/pet.module";
import { VeterinarioModule } from "../veterinario/veterinario.modulo";
import { DonoPetService } from "../dono_pet/services/donoPet.service";
import { PetService } from "../pet/services/pet.service";
import { VeterinarioService } from "../veterinario/services/veterinario.service";

@Module({
    imports: [TypeOrmModule.forFeature([Consulta]), DonoPetModule, PetModule, VeterinarioModule], 
    providers: [ConsultaService, DonoPetService, PetService, VeterinarioService],
    controllers: [ConsultasController],
    exports: [TypeOrmModule],
  })
  export class ConsultaModule {}