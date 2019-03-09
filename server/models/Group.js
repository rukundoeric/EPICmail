class Group {
    constructor(){
        this.data ={"type":"dataList"}
        this.GroupList = [
            {
             "id":1,
             "name": "Programmers"
            },
            {
            "id":2,
            "name": "Programmers"
            },
            {
            "id":3,
            "name": "Programmers"
            }
        ]
    }
    async addGroup(group){
        if(!group){
            return false;
        }else{
            this.GroupList.push(group)
            return true;
        }
    }
    async getAllGroups(){
        return this.GroupList;
    }
    async getGroupById(id){
        return this.GroupList.find((group) => group.id === id);
    }
}
export default new Group();