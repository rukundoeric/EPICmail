import bcrypt from 'bcrypt';
import moment from 'moment';
const hostUrl = 'http://127.0.0.1:4040';
const fek_userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI5YjgzOTlkNS0xOGIwLTRlM2ItYmIwNi1kMGMwMGY1NGFkMjgiLCJpYXQiOjE1NTM4NjY5MjMsImV4cCI6MTU1NDQ3MTcyM30.HUIMttmM7TZx2BniclMir1u9jB14rjSC3j6z6FhGULA';
const userData =  {
  'id': 'a5fb0450-2da1-4278-ba0f-8b930604b976',
  'email': 'ericrukundo@gmail.com',
  'firstName': 'Eric',
  'lastName': 'Prestein',
  'password': 'Eric00005',
  'createdOn': '2019-03-13T11:39:26.470Z'
};

const wrongNewUser =  {
  'email': '',
  'firstName': '',
  'lastName': '',
  'password': '',
};
const newUser =  {
  'email': 'mukunzifelix@gmail.com',
  'firstName': 'example',
  'lastName': 'example',
  'password': 'Eric00005',
};
const testUser = {
  'email': 'example123@gmail.com',
  'firstName': 'example',
  'lastName': 'example',
  'password': 'Eric00005',
};

const userDetail = {
  'id': 6,
  'email': 'ericrukundo005@gmail.com',
  'firstName': 'eric',
  'lastName': 'prestein',
  'password': bcrypt.hashSync('13085211', 6),
  'createdOn': '2019-03-05T03:21:04.694Z'
};
const loginUser = {
  'email': 'example123@gmail.com',
  'password': 'Eric00005',
};
const loginUserWrongPass = {
  'email': 'example123@gmail.com',
  'password': 'Eri004343405',
};

const loginUserNotFound = {
  'email': 'example1234567@gmail.com',
  'password': 'Eri004343405',
};
const loginUserInvalidInput = {
  'email': 'example1234567com',
  'password': 'Eri004343405',
};

const loginUserInvalidToken = {
  'email':'ericrukundo005@gmail.com',
  'password': '130211'
};
const inbox =  {
  'receiverId':'6',
  'messageId':'2',
  'createdOn':moment(new Date())
};
const sent = {
  'senderId':6,
  'messageId':2,
  'createdOn':moment(new Date())
};    
const message =   {
  'subject': 'TestMessage',
  'message': 'Hello there ',
  'to': 'example123@gmail.com',
  'status': 'sent'
};
const invalid_message =   {
  'id': 2,
  'subject': null,
  'senderId':null,
  'receiverId':3,
  'message': null,
  'parentMessageId': '1',
  'status': 'sent'
};
const group = {
  'id':3,
  'name': 'programmers'
}; 
const groupmember = {
  'groupId':3,
  'memberId': 3
};
const contact = {
  'id': 1,
  'email': 'gprestein055@gmail.com',
  'firstName': 'eric',
  'lastName': 'prestein'
};

export {
  hostUrl,
  fek_userToken,
  userData,
  userDetail,
  loginUser,
  loginUserWrongPass,
  loginUserInvalidToken,
  invalid_message,
  inbox,
  sent,
  message,
  group,
  groupmember,
  contact,
  newUser,
  wrongNewUser,
  testUser,
  loginUserNotFound,
  loginUserInvalidInput
};