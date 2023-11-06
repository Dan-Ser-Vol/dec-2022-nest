import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './modules/app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as process from 'process';
import { PostgresqlConfigService } from './config/database/configuration.service';
import { SwaggerHelper } from "./common/helper/swagger.helper";

const environment = process.env.NODE_ENV ?? '';

dotenv.config({ path: `environments/${environment}.env` });

async function start() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const appConfig: PostgresqlConfigService = app.get(PostgresqlConfigService);
  const config = new DocumentBuilder()
    .setTitle('Example')
    .setDescription(' API description for nest course')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerHelper.setDefaultResponses(document);
  SwaggerModule.setup('api', app, document);

  await app.listen(appConfig.app_port, () =>
    Logger.log('http://localhost:3000/api', 'Server is working'),
  );
}
start();
