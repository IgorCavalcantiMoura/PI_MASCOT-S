import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Procedimento } from './entities/procedimento.entity';
import { ProcedimentoService } from './services/procedimentos.service';
import { ProcedimentoController } from './controllers/procedimentos.controller';
import { ConsultaModule } from '../consultas/consulta.module';
import { ConsultaService } from '../consultas/services/consulta.service';
import { DonoPetModule } from '../dono_pet/donoPet.module';
import { PetModule } from '../pet/pet.module';
import { VeterinarioModule } from '../veterinario/veterinario.modulo';
import { DonoPetService } from '../dono_pet/services/donoPet.service';
import { PetService } from '../pet/services/pet.service';
import { VeterinarioService } from '../veterinario/services/veterinario.service';


@Module({
    imports: [TypeOrmModule.forFeature([Procedimento]), ConsultaModule, DonoPetModule, PetModule, VeterinarioModule],
    providers: [ProcedimentoService, ConsultaService, DonoPetService, PetService, VeterinarioService],
    controllers: [ProcedimentoController],
})
export class ProcedimentoModule {}
