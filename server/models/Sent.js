import moment from 'moment';
class Sent{
    constructor(){
        this.data ={"type":"dataList"}
        this.SentList = [
               {
                "senderId":6,
                "messageId":2,
                "createdOn":moment(new Date())
                },
                {
                "senderId":3,
                "messageId":1,
                "createdOn":moment(new Date())
                },
                {
                "senderId":4,
                "messageId":3,
                "createdOn":moment(new Date())
                },
                {
                "senderId":6,
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