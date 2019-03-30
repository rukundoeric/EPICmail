// Update with your config settings.
import dotenv from 'dotenv';
dotenv.config();
class ConnectionConfig {
  constructor(){
    this.environment = process.env.NODE_ENV || 'development';
    this.development =  {
      host: '127.0.0.1',
      user: process.env.TODO_DB_USER,
      password: process.env.TODO_DB_PW,
      database: 'epicmail'
    };
    this.test =  {
      connectionString: 'postgres://postgres@127.0.0.1:5432/travis_ci_test'
    };
    this.production = {
      connectionString: process.env.DATABASE_URL
    };
    this.getConnectionConfig = () => {
      return this.environment == 'development' ? 
        this.development : this.environment == 'test' ?
          this.test : this.production;
    };
  }
}
export default new ConnectionConfig();