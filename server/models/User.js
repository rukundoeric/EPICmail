class UserModel  {

    constructor(){
        this.data ={"type":"dataList"}
        this.UserList = [
            {
                "id": "a5fb0450-2da1-4278-ba0f-8b930604b976",
                "email": "ericrukundo@gmail.comm",
                "firstName": "Eric",
                "lastName": "Prestein",
                "password": "$2b$06$22OG7NCqEyfZnWPfa1W7cOv4WJGBc2UApmwQFWMGb8P/QWL1DkB5y",
                "createdOn": "2019-03-13T11:39:26.470Z"
            },
            {
                "id": "b1fa330c-e2d0-43ca-a6d0-6c461e80c7ad",
                "email": "ericprestein@gmail.com",
                "firstName": "prestein",
                "lastName": "eistein",
                "password": "$2b$06$gIgQFKPhux2nnr0pRgJVIuVQr69oR2L.MIWpbaFQuIL9blamJShmm",
                "createdOn": "2019-03-12T20:35:26.771Z"
            }]
    }
    async addUser(user){
        if(!user){
            return false;
        }else{
            this.UserList.push(user);
            return true;
        }
    }
    async getUserByEmail(email){
     return this.UserList.find((user) => user.email === email);
    }
    async getUserIdByEmail(email){
        let user = this.UserList.find((user) => user.email === email)
        return !user ? null : user.id;
    }
    async getUserById(id){
        return this.UserList.find((user) => user.id === id)
    }
    async getAllUsers(){
        return this.UserList;
    }

}

export default new UserModel();