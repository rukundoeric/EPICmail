class UserModel  {

    constructor(){
        this.data ={"type":"dataList"}
        this.UserList = [
            {
                "id": 6,
                "email": "ericrukundo005@gmail.com",
                "firstName": "eric",
                "lastName": "prestein",
                "password": "$2b$06$HTuyK0.fOgtMp.0KZ5zPT.6ipcrlUjmj47AkhQD9MxnX0syqoHdGG",
                "createdOn": "2019-03-05T03:21:04.694Z"
            },
            {
                "id": 2,
                "email": "elvis005@gmail.com",
                "firstName": "eric",
                "lastName": "prestein",
                "password": "$2b$06$Mo6miuQ3./kaMV46FkuYZ.QZBgSZAPub3jI/9H2CNWAMFryCVAUhm",
                "createdOn": "2019-03-04T00:49:24.841Z"
            },
            {
                "id": 1,
                "email": "greprestein005@gmail.com",
                "firstName": "Mugabo",
                "lastName": "Steve",
                "password": "$2b$06$Mo6miuQ3./kaMV46FkuYZ.QZBgSZAPub3jI/9H2CNWAMFryCVAUhm",
                "createdOn": "2019-03-04T00:49:24.841Z"
            },
            {
                "id": 3,
                "email": "mugisha005@gmail.com",
                "firstName": "eric",
                "lastName": "prestein",
                "password": "$2b$06$Mo6miuQ3./kaMV46FkuYZ.QZBgSZAPub3jI/9H2CNWAMFryCVAUhm",
                "createdOn": "2019-03-04T00:49:24.841Z"
            }              
        ]
    }
    async addUser(user){
        if(!user){
            return false;
        }else{
            this.UserList.push(user);
            return true;
        }
    }
<<<<<<< HEAD
    async getUserByEmail(email){
=======
async getUserByEmail(email){
>>>>>>> 1086f3504c8fa2244fb664a2a695dcf2d2c06d01
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
<<<<<<< HEAD

=======
>>>>>>> 1086f3504c8fa2244fb664a2a695dcf2d2c06d01
}

export default new UserModel();