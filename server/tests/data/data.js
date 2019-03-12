import bcrypt from 'bcrypt';
import moment from 'moment';
const hostUrl = 'http://127.0.0.1:4040';
const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVyaWNydWt1bmRvMDA1QGdtYWlsLmNvbSIsImlhdCI6MTU1MTkzMzIwNywiZXhwIjoxNTUzNjYxMjA3fQ.27DB7Rxr9hk_PBUvn7pdEkawNerxM-FB8ufTDrgPXf8';
const userData =  {
    "id": 6,
	"email": "ericrukundo005@gmail.com",
	"firstName": "eric",
	"lastName": "prestein",
	"password": "13085211"
}
const userDetail = {
    "id": 6,
    "email": "ericrukundo005@gmail.com",
    "firstName": "eric",
    "lastName": "prestein",
    "password": bcrypt.hashSync('13085211', 6),
    "createdOn": "2019-03-05T03:21:04.694Z"
}
const loginUser = {
    "email":"ericrukundo005@gmail.com",
    "password": "13085211"
}
const loginUserWrongPass = {
    "email":"ericrukundo005@gmail.com",
    "password": "243434"
}
const loginUserInvalidToken = {
    "email":"ericrukundo005@gmail.com",
    "password": "130211"
}
const inbox =  {
    "receiverId":"6",
    "messageId":"2",
    "createdOn":moment(new Date())
    }
const sent = {
    "senderId":6,
    "messageId":2,
    "createdOn":moment(new Date())
}    
const message =   {
    "id": 2,
    "subject": "Invitation to mariage",
    "senderId":1,
    "receiverId":3,
    "message": "Hello guys, we would to invite you to our mariage celemony which will take place at kacyiro suday pack 11:00 am, Thank you!",
    "parentMessageId": "1",
    "status": "sent"
}
const invalid_message =   {
    "id": 2,
    "subject": null,
    "senderId":null,
    "receiverId":3,
    "message": null,
    "parentMessageId": "1",
    "status": "sent"
}
const group = {
    "id":3,
    "name": "programmers"
} 
const groupmember = {
    "groupId":3,
    "memberId": 3
}
const contact = {
    "id": 1,
    "email": "gprestein055@gmail.com",
    "firstName": "eric",
    "lastName": "prestein"
}

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
    contact
}