import { Pool } from  'pg';
import dotenv from 'dotenv';
dotenv.config();
const environment = process.env.NODE_ENV || 'development';
const config = require('./con_file')[environment];
export default {
	getPoolCon: function () {
	  return new Pool(config);
       }
}
