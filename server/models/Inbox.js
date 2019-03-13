import moment from 'moment';
class Inbox {
    constructor(){
        this.data ={"type":"dataList"}    
        this.InboxList = [
            {
            "receiverId":"a5fb0450-2da1-4278-ba0f-8b930604b976",
            "messageId":2,
            "createdOn":moment(new Date())
            },
            {
            "receiverId":"b1fa330c-e2d0-43ca-a6d0-6c461e80c7ad",
            "messageId":1,
            "createdOn":moment(new Date())
            },
            {
            "receiverId":"b1fa330c-e2d0-43ca-a6d0-6c461e80c7ad",
            "messageId":3,
            "createdOn":moment(new Date())
            },
            {
            "receiverId":"a5fb0450-2da1-4278-ba0f-8b930604b976",
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