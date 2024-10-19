import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Veterinario } from "./entities/veterianario.entity";
import { VeterinarioService } from "./services/veterinario.service";
import { VeterinarioController } from "./controllers/veterinario.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Veterinario])], 
    providers: [VeterinarioService],
    controllers: [VeterinarioController],
    exports: [TypeOrmModule],
  })
  export class VeterinarioModule {}