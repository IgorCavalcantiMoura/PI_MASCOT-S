import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Pet } from "./entities/pet.entity";
import { PetService } from "./services/pet.service";
import { PetController } from "./controllers/pet.controller";
import { DonoPetModule } from "../dono_pet/donoPet.module";
import { DonoPetService } from "../dono_pet/services/donoPet.service";

@Module({
    imports: [TypeOrmModule.forFeature([Pet]),DonoPetModule], 
    providers: [PetService, DonoPetService],
    controllers: [PetController],
    exports: [TypeOrmModule],
  })
  export class PetModule {}