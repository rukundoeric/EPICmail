import moment from 'moment';
class Inbox {
    constructor(){
        this.data ={"type":"dataList"}    
        this.InboxList = [
            {
            "receiverId":6,
            "messageId":2,
            "createdOn":moment(new Date())
            },
            {
            "receiverId":6,
            "messageId":1,
            "createdOn":moment(new Date())
            },
            {
            "receiverId":6,
            "messageId":3,
            "createdOn":moment(new Date())
            },
            {
            "receiverId":1,
            "messageId":4,
            "createdOn":moment(new Date())
            }
         ];
    }

    async addInbox(inbox){
        if(!inbox){
            return false;
        }else{
            this.InboxList.push(inbox);
            return true;
        }     
    }
    async getAllInbox(){
        return this.InboxList;
    }
}
export default Inbox;