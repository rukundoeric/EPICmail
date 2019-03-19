import { CREATE_USER_TABLE, VERIFICATIONS_TABLE} from '../helpers/query';
import connection from '../connection/connection';
const pool = connection.getPoolConnection();
class CREATABLE {
    constructor(){
        pool.connect((err) => {
            if(!err){
                pool.query(CREATE_USER_TABLE)
                .then((res) => {
                  console.log("User Table Create Successful");
                })
                .catch((err) => {
                  console.log(err);
                  pool.end();
                });
                pool.query(VERIFICATIONS_TABLE)
                .then((res) => {
                  console.log("Verificationd table Create Successful");
                  pool.end();
                })
                .catch((err) => {
                  console.log(err);
                  pool.end();
                });
            }
        })
    }
}
export default new CREATABLE();