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


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_clinica_vet',
      entities: [Usuario, Administrador, Auxiliar],
      synchronize: true,
    }),
    AuthModule,
    UsuarioModule,
    AdministradorModule,
    AuxiliarModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
