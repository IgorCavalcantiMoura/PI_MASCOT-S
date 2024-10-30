import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { Administrador } from "../../administradores/entities/administrador.entity";
import { Auxiliar } from "../../auxiliares/entities/auxiliar.entity";
import { ProdutoEstoque } from "../../produto_estoque/entities/produto_estoque.entity";
import { DonoPet } from "../../dono_pet/entities/donoPet.entity";
import { Procedimento } from "../../procedimentos/entities/procedimento.entity";
import { AdminMedicamentos } from "../../adminMedicamentos/entities/adminMedicamentos.entity";
import { Pet } from "../../pet/entities/pet.entity";
import { Veterinario } from "../../veterinario/entities/veterianario.entity";
import { Consulta } from "../../consultas/entities/consulta.entity";
import { Exame } from "../../exames/entities/exame.entity";
import { Internacao } from "../../internacoes/entities/internacao.entity";
import { BoletimMedico } from "../../boletim_medico/entities/boletimMedico.entity";
import { Medicamento } from "../../medicamentos/entities/medicamento.entity";

@Injectable()
export class DevService implements TypeOrmOptionsFactory {

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'root',
            database: 'db_clinica_vet',
            entities: [Usuario, Administrador, Auxiliar, ProdutoEstoque, DonoPet, Pet, Veterinario, Consulta, Exame, Internacao, BoletimMedico, Medicamento, AdminMedicamentos, Procedimento],
            synchronize: true,
    };
  }
}