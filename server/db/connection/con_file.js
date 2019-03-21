// Update with your config settings.
import dotenv from 'dotenv';

dotenv.config();
class ConnectionConfig {
  constructor() {
    this.environment = process.env.NODE_ENV || 'development';
    this.development = {
      host: '127.0.0.1',
      user: process.env.TODO_DB_USER,
      password: process.env.TODO_DB_PW,
      database: 'epicmail',
    };
    this.production = {
      connection: process.env.DATABASE_URL,
    };
    this.getConnectionConfig = () => this.environment == 'development' ? this.development : this.production;
  }
}
export default new ConnectionConfig();
