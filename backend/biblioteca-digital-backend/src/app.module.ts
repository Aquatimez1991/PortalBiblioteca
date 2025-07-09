import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Auth & Users
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

// Books & Catalog
import { BooksModule } from './books/books.module';
import { CatalogModule } from './catalog/catalog.module';
import { RecommendedModule } from './recommended/recommended.module';
import { MarcModule } from './marc/marc.module';

// Reader Tools
import { ReaderModule } from './reader/reader.module';

// Stats & Downloads
import { StatsModule } from './stats/stats.module';
import { DownloadsModule } from './downloads/downloads.module';

// Institution & LMS
import { InstitutionModule } from './institution/institution.module';
import { LmsModule } from './lms/lms.module';

// Assistant
import { AssistantModule } from './assistant/assistant.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'biblioteca_digital',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.NODE_ENV !== 'production',
      logging: process.env.NODE_ENV !== 'production',
    }),
    AuthModule,
    UsersModule,
    BooksModule,
    CatalogModule,
    RecommendedModule,
    MarcModule,
    ReaderModule,
    StatsModule,
    DownloadsModule,
    InstitutionModule,
    LmsModule,
    AssistantModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
