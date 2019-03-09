class GroupMember {
    constructor(){
        this.data ={"type":"dataList"}
        this.GroupMemberList = [
            {
            "groupId": 1,
            "memberId":6
            },
            {
            "groupId": 2,
            "memberId":2
            },
            {
            "groupId": 3,
            "memberId":3
            }
        ]
    }
    async addGroupMembers(member){
        if(!member){
            return false;
        }else{
            this.GroupMemberList.push(member);
            return true;
        }
    }
    async getMembersByGroupId(groupId){
        return this.GroupMemberList.find((member) => member.groupId == groupId);
    }
}

export default new GroupMember();


