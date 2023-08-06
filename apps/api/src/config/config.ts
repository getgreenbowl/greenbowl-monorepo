import { APP_SETTINGS } from '../core/app-settings';

export default {
  development: {
    dialect: 'mysql',
    database: APP_SETTINGS.DB_NAME,
    username: APP_SETTINGS.DB_USERNAME,
    password: APP_SETTINGS.DB_PASSWORD,
    host: APP_SETTINGS.DB_HOST,
  },
  test: {
    dialect: 'mysql',
    database: APP_SETTINGS.DB_NAME,
    username: APP_SETTINGS.DB_USERNAME,
    password: APP_SETTINGS.DB_PASSWORD,
    host: APP_SETTINGS.DB_HOST,
  },
  production: {
    dialect: 'mysql',
    database: APP_SETTINGS.DB_NAME,
    username: APP_SETTINGS.DB_USERNAME,
    password: APP_SETTINGS.DB_PASSWORD,
    host: APP_SETTINGS.DB_HOST,
  },
};
