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
      email VARCHAR(128) UNIQUE NOT NULL,
      code VARCHAR(128) NOT NULL
    )`;
const CREATE_USER =
  `INSERT INTO
      users(id, firstName, lastName, email, password, createdOn, modifiedOn, verified)
      VALUES($1, $2, $3, $4, $5,$6, $7, $8)
      returning *`;
const GET_USER = `SELECT * FROM users WHERE email = $1`;  
const GET_USER_BY_ID = `SELECT * FROM users WHERE id = $1`;       
const VERIFIE_USER =`UPDATE users SET verified=true WHERE email = $1`      
const CREATE_VERFICATION =
  `INSERT INTO
     verification(email, code)
      VALUES($1, $2)
      returning *`;
const GET_VERIFICATION = `SELECT * FROM verification WHERE email = $1`;    
const DELETE_VERIFICATION = `DELETE FROM verification WHERE email=$1 returning *`;  
const CREATE_MESSAGE_TABLE =
  `CREATE TABLE IF NOT EXISTS
    messages(
      id SERIAL PRIMARY KEY,
      senderId VARCHAR(128) NOT NULL,
      receiverId VARCHAR(128) NOT NULL,
      subject VARCHAR(128) NOT NULL,
      message VARCHAR(1000) NOT NULL,
      parentMessageId NUMERIC (1000),
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
        messageId NUMBER(10)  NOT NULL,
        receiverId VARCHAR(128)  NOT NULL,
        createdOn TIMESTAMP
      )`;  
const CREATE_INBOX =
        `INSERT INTO
          messages(messageId, receiverId, createdOn)
            VALUES($1, $2, $3)
            returning *`; 
const CREATE_SENT_TABLE =
      `CREATE TABLE IF NOT EXISTS
        sent(
          messageId NUMBER(10)  NOT NULL,
          senderId VARCHAR(128)  NOT NULL,
          createdOn TIMESTAMP
        )`;  
const CREATE_SENT =
        `INSERT INTO
          messages(messageId, senderId, createdOn)
            VALUES($1, $2, $3)
            returning *`;              
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
    CREATE_SENT

}