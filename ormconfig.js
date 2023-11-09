// eslint-disable-next-line @typescript-eslint/no-var-requires
const typeorm = require('typeorm');

const dataSource = new typeorm.DataSource({
  name: 'default',
  type: 'postgres',
  host: '0.0.0.0',
  port: '5431',
  username: 'user',
  password: 'user',
  database: 'dec-2022',
  synchronize: false,
  migrationsRun: false,
  migrationsTableName: 'migrations',
  entities: ['src/**/*.entity{.ts,.js}'],
  migrations: ['src/database/migrations/*{.js,.ts}'],
});

module.exports = [dataSource];
