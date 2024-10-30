import { ProcedimentoModule } from './procedimentos/procedimentos.module';
import { BoletimMedicoModule } from './boletim_medico/boletim_medico.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { Usuario } from './usuario/entities/usuario.entity';
import { UsuarioModule } from './usuario/usuario.module';
import { AppController } from './app.controller';
import { Administrador } from './administradores/entities/administrador.entity';
import { AdministradorModule } from './administradores/administradores.module';
import { Auxiliar } from './auxiliares/entities/auxiliar.entity';
import { AuxiliarModule } from './auxiliares/auxiliares.module';
import { ProdutoEstoque } from './produto_estoque/entities/produto_estoque.entity';
import { ProdutoEstoqueModule } from './produto_estoque/produto_estoque.module';
import { DonoPet } from './dono_pet/entities/donoPet.entity';
import { DonoPetModule } from './dono_pet/donoPet.module';
import { Pet } from './pet/entities/pet.entity';
import { PetModule } from './pet/pet.module';
import { Veterinario } from './veterinario/entities/veterianario.entity';
import { VeterinarioModule } from './veterinario/veterinario.modulo';
import { Consulta } from './consultas/entities/consulta.entity';
import { ConsultaModule } from './consultas/consulta.module';
import { Exame } from './exames/entities/exame.entity';
import { ExameModule } from './exames/exames.module';
import { InternacaoModule } from './internacoes/internacoes.module';
import { Internacao } from './internacoes/entities/internacao.entity';
import { BoletimMedico } from './boletim_medico/entities/boletimMedico.entity';
import { Medicamento } from './medicamentos/entities/medicamento.entity';
import { MedicamentoModule } from './medicamentos/medicamentos.module';
import { AdminMedicamentos } from './adminMedicamentos/entities/adminMedicamentos.entity';
import { AdminMedicamentosModule } from './adminMedicamentos/adminMedicamentos.module';
import { Procedimento } from './procedimentos/entities/procedimento.entity';
import { ConfigModule } from '@nestjs/config';
import { ProdService } from './data/services/prod.service';
import { DevService } from './data/services/dev.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useClass: ProdService,
      imports: [ConfigModule],
    }),
    AuthModule,
    UsuarioModule,
    AdministradorModule,
    AuxiliarModule,
    ProdutoEstoqueModule,
    DonoPetModule,
    PetModule,
    VeterinarioModule,
    ConsultaModule,
    ExameModule,
    InternacaoModule,
    BoletimMedicoModule,
    MedicamentoModule,
    AdminMedicamentosModule,
    ProcedimentoModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
