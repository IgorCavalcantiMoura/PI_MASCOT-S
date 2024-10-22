import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PetModule } from "../pet/pet.module";
import { VeterinarioModule } from "../veterinario/veterinario.modulo";
import { DonoPetModule } from "../dono_pet/donoPet.module";
import { InternacaoModule } from "../internacoes/internacoes.module";
import { InternacaoService } from "../internacoes/services/internacao.service";
import { PetService } from "../pet/services/pet.service";
import { VeterinarioService } from "../veterinario/services/veterinario.service";
import { DonoPetService } from "../dono_pet/services/donoPet.service";
import { AdminMedicamentosController } from "./controllers/adminMedicamentos.controller";
import { AdminMedicamentosService } from "./services/adminMedicamentos.service";
import { AdminMedicamentos } from "./entities/adminMedicamentos.entity";
import { MedicamentoModule } from "../medicamentos/medicamentos.module";
import { MedicamentoService } from "../medicamentos/services/medicamento.service";

@Module({
    imports: [TypeOrmModule.forFeature([AdminMedicamentos]), PetModule, VeterinarioModule, DonoPetModule, InternacaoModule, MedicamentoModule], 
    providers: [AdminMedicamentosService, InternacaoService, PetService, VeterinarioService, DonoPetService, MedicamentoService],
    controllers: [AdminMedicamentosController],
    exports: [TypeOrmModule],
  })
  export class AdminMedicamentosModule {}