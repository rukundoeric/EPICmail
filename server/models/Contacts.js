class Contacts {
    constructor(){
        this.data ={"type":"dataList"}
        this.ContactsList = [
               {
                "id": 1,
                "email": "ericprestein055@gmail.com",
                "firstName": "eric",
                "lastName": "prestein"
               },
               {
                "id": 2,
                "email": "gprestein055@gmail.com",
                "firstName": "eric",
                "lastName": "prestein"
               },
               {
                "id": 2,
                "email": "ericrukundo005@gmail.com",
                "firstName": "eric",
                "lastName": "prestein"
               }
           ]
    }
    async addContact(contact){
        if(!contact){
            return false;
        }else{
            this.ContactsList.push(contact);
            return true;
        }
    }
    async getAllContact(){
        return this.ContactsList;
    }
    async getContactByEmail(email){
        return this.ContactsList.find((contact) => contact.email == email);
    }

}
export default new Contacts();