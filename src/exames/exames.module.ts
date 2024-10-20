import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Exame } from "./entities/exame.entity";
import { VeterinarioModule } from "../veterinario/veterinario.modulo";
import { ConsultaModule } from "../consultas/consulta.module";
import { ExamesController } from "./controllers/exame.controller";
import { ExameService } from "./services/exame.service";
import { PetService } from "../pet/services/pet.service";
import { VeterinarioService } from "../veterinario/services/veterinario.service";
import { ConsultaService } from "../consultas/services/consulta.service";
import { PetModule } from "../pet/pet.module";
import { DonoPetModule } from "../dono_pet/donoPet.module";
import { DonoPetService } from "../dono_pet/services/donoPet.service";

@Module({
    imports: [TypeOrmModule.forFeature([Exame]),PetModule, VeterinarioModule, ConsultaModule, DonoPetModule], 
    providers: [ExameService, PetService, VeterinarioService, ConsultaService, DonoPetService],
    controllers: [ExamesController],
    exports: [TypeOrmModule],
  })
  export class ExameModule {}