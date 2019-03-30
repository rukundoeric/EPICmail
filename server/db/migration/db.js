import { CREATE_USER_TABLE, 
  VERIFICATIONS_TABLE, 
  CREATE_MESSAGE_TABLE,
  CREATE_INBOX_TABLE,
  CREATE_SENT_TABLE,
  CREATE_GROUP_TABLE,
  CREATE_GROUP_MEMBER_TABLE} from '../helpers/query';
import connection from '../connection/connection';
const pool = connection.getPoolConnection();
class CREATABLE {
  constructor(){
    this.createTables = async () => {
      pool.connect((err) => {
        if(!err){
          pool.query(CREATE_USER_TABLE);
          pool.query(VERIFICATIONS_TABLE);
          pool.query(CREATE_MESSAGE_TABLE);
          pool.query(CREATE_INBOX_TABLE);
          pool.query(CREATE_SENT_TABLE);
          pool.query(CREATE_GROUP_TABLE);
          pool.query(CREATE_GROUP_MEMBER_TABLE);
        }
      });
      return true;
    };
  }
}
export default new CREATABLE();