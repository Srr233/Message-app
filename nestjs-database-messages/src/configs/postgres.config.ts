import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getPgConfig = async (
  configService: ConfigService,
  entities,
): Promise<TypeOrmModuleOptions> => {
  return {
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: parseInt(configService.get('DB_PORT')),
    database: configService.get('DB_NAME'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    entities,
    synchronize: configService.get('DB_SYNCHRONIZE') === 'false' ? false : true,
    autoLoadEntities: true,
  };
};
