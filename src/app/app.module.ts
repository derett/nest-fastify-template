import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from 'src/modules/posts/posts.module';
import { SequelizeModule } from '@nestjs/sequelize';
import databaseConfig from 'src/shared/configs/database.config';

@Module({
  imports: [SequelizeModule.forRoot(databaseConfig), PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
