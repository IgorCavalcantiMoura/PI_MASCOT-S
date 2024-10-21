import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoletimMedico } from "./entities/boletimMedico.entity";
import { BoletimMedicoService } from "./services/boletimMedico.service";
import { BoletimMedicoController } from "./controllers/boletimMedico.controller";
import { InternacaoModule } from "../internacoes/internacoes.module";
import { PetModule } from "../pet/pet.module";
import { DonoPetModule } from "../dono_pet/donoPet.module";
import { VeterinarioModule } from "../veterinario/veterinario.modulo";
import { ConsultaModule } from "../consultas/consulta.module";
import { InternacaoService } from "../internacoes/services/internacao.service";
import { PetService } from "../pet/services/pet.service";
import { DonoPetService } from "../dono_pet/services/donoPet.service";
import { VeterinarioService } from "../veterinario/services/veterinario.service";
import { ConsultaService } from "../consultas/services/consulta.service";


@Module({
    imports: [TypeOrmModule.forFeature([BoletimMedico]), InternacaoModule, PetModule, DonoPetModule, VeterinarioModule, ConsultaModule], 
    providers: [BoletimMedicoService, InternacaoService, PetService, DonoPetService, VeterinarioService, ConsultaService],
    controllers: [BoletimMedicoController],
    exports: [TypeOrmModule],
  })
  export class BoletimMedicoModule {}