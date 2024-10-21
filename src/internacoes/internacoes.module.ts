import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Internacao } from "./entities/internacao.entity";
import { InternacaoService } from "./services/internacao.service";
import { InternacaoController } from "./controllers/internacao.controller";
import { PetModule } from "../pet/pet.module";
import { VeterinarioModule } from "../veterinario/veterinario.modulo";
import { PetService } from "../pet/services/pet.service";
import { VeterinarioService } from "../veterinario/services/veterinario.service";
import { DonoPetModule } from "../dono_pet/donoPet.module";
import { DonoPetService } from "../dono_pet/services/donoPet.service";

@Module({
    imports: [TypeOrmModule.forFeature([Internacao]), PetModule, VeterinarioModule, DonoPetModule], 
    providers: [InternacaoService, PetService, VeterinarioService, DonoPetService],
    controllers: [InternacaoController],
    exports: [TypeOrmModule],
  })
  export class InternacaoModule {}