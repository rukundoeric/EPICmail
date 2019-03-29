const CREATE_USER_TABLE =
  `CREATE TABLE IF NOT EXISTS
    users(
      id UUID PRIMARY KEY,
      firstName VARCHAR(128) NOT NULL,
      lastNAme VARCHAR(128) NOT NULL,
      email VARCHAR(128) UNIQUE NOT NULL,
      password VARCHAR(128) NOT NULL,
      createdOn TIMESTAMP,
      modifiedOn TIMESTAMP,
      verified BOOLEAN  NOT NULL
    )`;
const VERIFICATIONS_TABLE =
  `CREATE TABLE IF NOT EXISTS
    verification(
      id SERIAL  PRIMARY KEY,
      email VARCHAR(128) NOT NULL,
      code VARCHAR(128) NOT NULL
    )`;
const CREATE_USER =
  `INSERT INTO
      users(id, firstName, lastName, email, password, createdOn, modifiedOn, verified)
      VALUES($1, $2, $3, $4, $5,$6, $7, $8)
      returning *`;

const GET_USER = 'SELECT * FROM users WHERE email = $1';  
const GET_USER_BY_ID = 'SELECT * FROM users WHERE id = $1';       
const VERIFIE_USER ='UPDATE users SET verified=true WHERE email = $1';      
const CREATE_VERFICATION =
  `INSERT INTO
     verification(email, code)
      VALUES($1, $2)
      returning *`;
const GET_VERIFICATION = 'SELECT * FROM verification WHERE email = $1';    
const DELETE_VERIFICATION = 'DELETE FROM verification WHERE email=$1 returning *';  
const CREATE_MESSAGE_TABLE =
  `CREATE TABLE IF NOT EXISTS
    messages(
      id SERIAL PRIMARY KEY,
      senderId VARCHAR(128) NOT NULL,
      receiverId VARCHAR(128) NOT NULL,
      subject VARCHAR(128) NOT NULL,
      message VARCHAR(1000) NOT NULL,
      parentMessageId NUMERIC (1000),
      status VARCHAR(128) NOT NULL,
      createdOn TIMESTAMP
    )`;
const CREATE_MESSAGE =
  `INSERT INTO
    messages(senderId, receiverId, subject, message, parentMessageId, status, createdOn)
      VALUES($1, $2, $3, $4, $5,$6,$7)
      returning *`;
const CREATE_INBOX_TABLE =
    `CREATE TABLE IF NOT EXISTS
      inbox(
        messageId NUMERIC (10)  NOT NULL,
        receiverId VARCHAR(128)  NOT NULL,
        createdOn TIMESTAMP
      )`;  
const CREATE_INBOX =
        `INSERT INTO
          inbox(messageId, receiverId, createdOn)
            VALUES($1, $2, $3)
            returning *`; 
const CREATE_SENT_TABLE =
      `CREATE TABLE IF NOT EXISTS
        sent(
          messageId NUMERIC (10)  NOT NULL,
          senderId VARCHAR(128)  NOT NULL,
          createdOn TIMESTAMP
        )`;  
const CREATE_SENT =
        `INSERT INTO
        sent(messageId, senderId, createdOn)
            VALUES($1, $2, $3)
            returning *`;       
            
const GET_RECEIVED_MESSAGES ='SELECT * FROM messages WHERE receiverid = $1';
const GET_UNREAD_RECEIVED_MESSAGES =  'SELECT * FROM messages WHERE receiverid = $1 AND status = \'sent\''; 
const GET_SENT_RECEIVED_MESSAGES = 'SELECT * FROM messages WHERE senderid = $1'; 
const GET_SPECIFIC_MESSAGES = 'SELECT * FROM messages WHERE id = $1';   
const DELETE_MESSAGES ='DELETE FROM messages WHERE id = $1';  

const CREATE_GROUP_TABLE =
  `CREATE TABLE IF NOT EXISTS
    groups(
      id SERIAL PRIMARY KEY,
      name VARCHAR(128) NOT NULL
    )`;
const CREATE_GROUP_RECORD =
    `INSERT INTO
    groups(name)
        VALUES($1)
        returning *`;    
const CREATE_GROUP_MEMBER_TABLE =
  `CREATE TABLE IF NOT EXISTS
    groupMember(
      groupid NUMERIC(100),
      memberid VARCHAR(128) NOT NULL,
      role VARCHAR(128) NOT NULL
    )`;
const CREATE_GROUP_MEMBER_RECORD =
    `INSERT INTO
    groupMember(groupid, memberid, role)
        VALUES($1, $2, $3)
        returning *`;  
const USER_PASSWORD_RESET ='UPDATE users SET password = $1 WHERE id = $2';         
const GET_GROUP = 'SELECT * FROM groups WHERE id = $1';         
const GET_GROUP_MEMBER = 'SELECT * FROM groupMember WHERE groupid = $1 AND memberid = $2';   
const DELETE_GROUP ='DELETE FROM groups WHERE id = $1';  
const DELETE_GROUP_MEMBERS = 'DELETE FROM groupMember WHERE groupid = $1'; 
const DELETE_GROUP_MEMBER = 'DELETE FROM groupMember WHERE groupid = $1 AND memberid = $2';        
const UPDATE_GROUP_NAME ='UPDATE groups SET name = $1 WHERE id = $2'; 

const DELETE_TEST_USER = 'DELETE FROM users WHERE lastname = $1 ';
const DELETE_ALL_TEST_MESSAGES=  'DELETE FROM messages WHERE subject = $1';
const DELETE_ALL_G_TEST_MESSAGES=  'DELETE FROM messages WHERE id = $1';
const DELETE_ALL_TEST_INBOX= 'DELETE FROM inbox WHERE receiverid = $1';
const DELETE_ALL_TEST_SENT= 'DELETE FROM sent WHERE senderid = $1';
export {
  CREATE_USER_TABLE,
  CREATE_MESSAGE_TABLE,
  CREATE_USER,
  VERIFICATIONS_TABLE,
  CREATE_VERFICATION,
  GET_VERIFICATION,
  DELETE_VERIFICATION,
  GET_USER,
  GET_USER_BY_ID,
  VERIFIE_USER,
  CREATE_MESSAGE,
  CREATE_INBOX_TABLE,
  CREATE_INBOX,
  CREATE_SENT_TABLE,
  CREATE_SENT,
  GET_RECEIVED_MESSAGES,
  GET_UNREAD_RECEIVED_MESSAGES,
  GET_SENT_RECEIVED_MESSAGES,
  GET_SPECIFIC_MESSAGES,
  DELETE_MESSAGES,
  CREATE_GROUP_TABLE,
  CREATE_GROUP_MEMBER_TABLE,
  CREATE_GROUP_RECORD,
  CREATE_GROUP_MEMBER_RECORD,
  GET_GROUP,
  GET_GROUP_MEMBER,
  DELETE_GROUP,
  DELETE_GROUP_MEMBERS,
  DELETE_GROUP_MEMBER,
  UPDATE_GROUP_NAME,
  USER_PASSWORD_RESET,
  DELETE_TEST_USER,
  DELETE_ALL_TEST_MESSAGES,
  DELETE_ALL_TEST_INBOX,
  DELETE_ALL_TEST_SENT,
  DELETE_ALL_G_TEST_MESSAGES,
};