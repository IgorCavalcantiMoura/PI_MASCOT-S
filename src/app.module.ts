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


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_clinica_vet',
      entities: [Usuario, Administrador, Auxiliar, ProdutoEstoque, DonoPet, Pet, Veterinario],
      synchronize: true,
    }),
    AuthModule,
    UsuarioModule,
    AdministradorModule,
    AuxiliarModule,
    ProdutoEstoqueModule,
    DonoPetModule,
    PetModule,
    VeterinarioModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
