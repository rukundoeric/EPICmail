import { Pool } from  'pg';
import dotenv from 'dotenv';
import con from './con_file';
dotenv.config();
const environment = process.env.NODE_ENV || 'development';
const config = con[environment];
export default {
	pool : function () {
       return new Pool(config);
	}
}