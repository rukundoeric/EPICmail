import ContactModel from '../models/Contacts';
import { contact } from './data/data';
import dotenv from 'dotenv';
dotenv.config();
process.env.IS_TESTING = 'TRUE';
describe('Contact', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        console.log("Is Test Running !!!!"+ process.env.IS_TESTING);
    })

    describe('Contacts Model', () => {
        it('Should Create an instance of Contact',(done) => {
            expect(ContactModel.data.type).toBe('dataList');
            expect(ContactModel.ContactsList).toBeDefined();
            done();
        })
        it('Should Be able to add new Contact',(done) => {
            ContactModel.addContact(contact).then((res) => {
                expect(res).toBe(true);
                done();
            }).catch(() => done());
        })
        it('Should not Be able to add new Contact with contact which contain some null',(done) => {
            ContactModel.addContact().then((res) => {
                expect(res).toBe(false);
                done();
            }).catch(() => done());
        })
        it('Should return an Object When Contacts Found Or Null When not found  <Get All Contacts>', (done) => {
            ContactModel.getAllContact().then((res) => {
                if(!res){
                    expect(res).toBe(undefined);
                }else{
                    expect(res).toBeDefined();
                    expect(typeof(res)).toBe('object');
                    expect(res[0].id).toBeDefined();
                    expect(res[0].email).toBeDefined();
                    expect(res[0].firstName).toBeDefined();
                    expect(res[0].lastName).toBeDefined();
                    done();
                }
            })
        })
        it('Should return an Object When Contacts Found  <Search Contact by email>', (done) => {
            ContactModel.getContactByEmail('ericrukundo005@gmail.com').then((res) => {
                    expect(res).toBeDefined();
                    expect(typeof(res)).toBe('object');
                    expect(res.id).toBeDefined();
                    expect(res.email).toBeDefined();
                    expect(res.firstName).toBeDefined();
                    expect(res.lastName).toBeDefined();
                    done();

            })
        })
        it('Should return underfined When Contacts not Found  <Search Contact by email>', (done) => {
            ContactModel.getContactByEmail('dffdfdf@gmail.com').then((res) => {
                   expect(res).toBe(undefined);
                   done();           
            })
        })
    })
});