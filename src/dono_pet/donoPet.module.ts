import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DonoPet } from "./entities/donoPet.entity";
import { DonoPetService } from "./services/donoPet.service";
import { DonoPetController } from "./controllers/donoPet.controller";

@Module({
    imports: [TypeOrmModule.forFeature([DonoPet])], 
    providers: [DonoPetService],
    controllers: [DonoPetController],
    exports: [TypeOrmModule],
  })
  export class DonoPetModule {}