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
    pool.connect((err) => {
      // if(!err){
      //   pool.query(CREATE_USER_TABLE).then((res) => {
      //     console.log("User Table Create Successful");
      //   }).catch((err) => {
      //     console.log(err);
      //   });

      //   pool.query(VERIFICATIONS_TABLE).then((res) => {
      //     console.log("Verificationd table Create Successful");
      //   }).catch((err) => {
      //   });

      //   pool.query(CREATE_MESSAGE_TABLE).then((res) => {
      //     console.log("Messages table Create Successful");
      //   }).catch((err) => {
      //     console.log(err);
      //   });

      //   pool.query(CREATE_INBOX_TABLE).then((res) => {
      //     console.log("Inbox table Create Successful");
      //   }).catch((err) => {
      //     console.log(err);
      //   });

      //   pool.query(CREATE_SENT_TABLE).then((res) => {
      //     console.log("Sent table Create Successful");
      //   }).catch((err) => {
      //     console.log(err);
      //     pool.end();
      //   });

      //   pool.query(CREATE_GROUP_TABLE).then((res) => {
      //     console.log("Group table Create Successful");
      //   }).catch((err) => {
      //     console.log(err);
      //     pool.end();
      //   });

      //   pool.query(CREATE_GROUP_MEMBER_TABLE).then((res) => {
      //     console.log("GroupMembers table Create Successful");
      //     pool.end();
      //   }).catch((err) => {
      //     console.log(err);
      //     pool.end();
      //   });
      // }
    })
  }
}
export default new CREATABLE();