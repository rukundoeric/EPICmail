import moment from 'moment';
class Sent{
    constructor(){
        this.data ={"type":"dataList"}
        this.SentList = [
               {
                "senderId":"5461d96a-4dfb-4bc7-991f-d7f443af563a",
                "messageId":2,
                "createdOn":moment(new Date())
                },
                {
                "senderId":"5461d96a-4dfb-4bc7-991f-d7f443af563a",
                "messageId":1,
                "createdOn":moment(new Date())
                },
                {
                "senderId":"5461d96a-4dfb-4bc7-991f-d7f443af563a",
                "messageId":3,
                "createdOn":moment(new Date())
                },
                {
                "senderId":"5461d96a-4dfb-4bc7-991f-d7f443af563a",
                "messageId":4,
                "createdOn":moment(new Date())
                }
        ];
    }
    async addSent(message){
        if(!message){
            return false;
        }
        else{
            this.SentList.push(message)
            return true;
        }
    } 
    async getSentList(){
        return this.SentList;
    }
}
export default new Sent();