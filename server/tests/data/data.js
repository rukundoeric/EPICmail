import bcrypt from 'bcrypt';
import moment from 'moment';
const hostUrl = 'http://127.0.0.1:4040';
const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiJhNWZiMDQ1MC0yZGExLTQyNzgtYmEwZi04YjkzMDYwNGI5NzYiLCJpYXQiOjE1NTMyMjczNjEsImV4cCI6MTU1MzgzMjE2MX0.oL1Ni1iOZT-tguUKCCoBBFBcYHX4-lqda7dV4g5r7bw';
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
  'firstName': 'Mukunzi',
  'lastName': 'Felix',
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
  'email': 'ericrukundo@gmail.com',
  'password': 'Eric00005'
};
const loginUserWrongPass = {
  'email':'ericrukundo005@gmail.com',
  'password': '243434'
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
  'subject': 'Invitaion to mariage',
  'message': 'Hello there ',
  'to': 'ericrukundo@gmail.com',
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
  userToken,
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
  wrongNewUser
};