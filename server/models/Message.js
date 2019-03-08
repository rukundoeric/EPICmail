import moment from 'moment';
import user from '../models/User';
import InboxMod from './Inbox';
const Inbox = new InboxMod();
import Sent from './Sent';
class Message {
   constructor(){
    this.data ={"type":"dataList"}
    this.MessagesList = [ 
        {
            "id": 2,
            "createdOn": "2019-03-04T05:44:00.494Z",
            "subject": "Invitation to mariage",
            "senderId":1,
            "receiverId":6,
            "message": "Hello guys, we would to invite you to our mariage celemony which will take place at kacyiro suday pack 11:00 am, Thank you!",
            "parentMessageId": "1",
            "status": "sent"
        },  {
            "id": 1,
            "createdOn": "2019-03-04T05:44:00.494Z",
            "subject": "Invitation to mariage",
            "senderId":3,
            "receiverId":6,
            "message": "Hello guys, we would to invite you to our mariage celemony which will take place at kacyiro suday pack 11:00 am, Thank you!",
            "parentMessageId": "1",
            "status": "sent"
        },  {
            "id": 3,
            "createdOn": "2019-03-04T05:44:00.494Z",
            "subject": "Invitation to mariage",
            "senderId":2,
            "receiverId":6,
            "message": "Hello guys, we would to invite you to our mariage celemony which will take place at kacyiro suday pack 11:00 am, Thank you!",
            "parentMessageId": "1",
            "status": "sent"
        },  {
            "id": 4,
            "createdOn": "2019-03-04T05:44:00.494Z",
            "subject": "Invitation to mariage",
            "senderId":2,
            "receiverId":3,
            "message": "Hello guys, we would to invite you to our mariage celemony which will take place at kacyiro suday pack 11:00 am, Thank you!",
            "parentMessageId": "1",
            "status": "draft"
        },  {
            "id": 5,
            "createdOn": "2019-03-04T05:44:00.494Z",
            "subject": "Invitation to mariage",
            "senderId":3,
            "receiverId":6,
            "message": "Hello guys, we would to invite you to our mariage celemony which will take place at kacyiro suday pack 11:00 am, Thank you!",
            "parentMessageId": "1",
            "status": "read"
        },   {
            "id": 6,
            "createdOn": "2019-03-04T05:44:00.494Z",
            "subject": "Invitation to mariage",
            "senderId":1,
            "receiverId":6,
            "message": "Hello guys, we would to invite you to our mariage celemony which will take place at kacyiro suday pack 11:00 am, Thank you!",
            "parentMessageId": "1",
            "status": "read"
        }
    ];
   }  
   async addMessage(myEmail,message){
    if(!message){
        return false;
    }else{
        if(message.status == 'sent'){
            let sent = {senderId:myEmail,messageId:message.id,createdOn:moment(new Date())}
             Sent.addSent(sent);
            let inbox = {receiverId:message.receiverId,messageId:message.id,createdOn:moment(new Date())}
             Inbox.addInbox(inbox);
         }
         this.MessagesList.push(message); 
         return  true;
    }
   }
   async getAllReceivedEmails(myUsername){
     // Fetch all Inbox Messages which their receiverId is equal to my UserId 
     // (1) get UserId by username which is user email 'myUsername'
     // (2) Go in Inbox and search where message.receiverId === userId
     // (3) then use Inbox messageId to search and get message details from all messages 
     let userId = await user.getUserIdByEmail(myUsername);
     let received_messages=[];  
     if(!userId){
         return received_messages;
     }else
     {     
        Inbox.getAllInbox().then((inbox) => {
            inbox.forEach((message) => {
               if(message.receiverId == userId){
                let mail_message = this.MessagesList.find((m_message) => m_message.id ==  message.messageId);
                     const f_message = {
                       id : mail_message.id,
                       createdOn : mail_message.createdOn,
                       subject : mail_message.subject,
                       message : mail_message.message,
                       senderId: mail_message.senderId,
                       receiverId: mail_message.receiverId,
                       parentMessageId : mail_message.parentMessageId,
                       status : mail_message.status
                   }
                   received_messages.push(f_message);
                   
                }
            })
      
        });
        return received_messages;
     }
    
   }
}
export default new Message();