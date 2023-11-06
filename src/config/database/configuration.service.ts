import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import configuration from './configuration';

@Injectable()
export class PostgresqlConfigService {
  constructor(
    @Inject(configuration.KEY)
    private postgresqlConfiguration: ConfigType<typeof configuration>,
  ) {}

  get host(): string {
    return this.postgresqlConfiguration.host;
  }
  get app_port(): number {
    return Number(this.postgresqlConfiguration.app_port);
  }

  get port(): number {
    return Number(this.postgresqlConfiguration.port);
  }

  get user(): string {
    return this.postgresqlConfiguration.user;
  }

  get password(): string {
    return this.postgresqlConfiguration.password;
  }

  get database(): string {
    return this.postgresqlConfiguration.database;
  }
}
