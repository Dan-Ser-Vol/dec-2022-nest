import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configuration';
import { PostgresqlConfigService } from './configuration.service';
import * as process from 'process';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: [`environments/${process.env.NODE_ENV}.env`],
    }),
  ],
  providers: [ConfigService, PostgresqlConfigService],
  exports: [ConfigService, PostgresqlConfigService],
})
export class PostgresqlConfigModule {}
