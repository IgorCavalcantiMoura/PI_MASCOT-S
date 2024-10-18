import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_clinica_vet',
      entities: [],
      synchronize: true,
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
