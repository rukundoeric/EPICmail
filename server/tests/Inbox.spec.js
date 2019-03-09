import Inbox from '../models/Inbox';
import { inbox } from './data/data'
const InboxModel = new Inbox();
describe('Inbox', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    })
    describe('Inbox Model', () => {
        afterAll((done) =>{
           new Inbox();
           done();
        })
        it('Should Create an instance of Inbox',(done) => {
            expect(InboxModel).toBeDefined();
            expect(InboxModel.data.type).toBe('dataList');
            done();
        })
        it('Should Be able to add new Inbox',(done) => {
            InboxModel.addInbox(inbox).then((res) => {
                expect(res).toBe(true);
                done();
            }).catch(() => done());
        })
        it('Should Be able to add new Inbox',(done) => {
            InboxModel.addInbox().then((res) => {
                expect(res).toBe(false);
                done();
            }).catch(() => done());
        })
        it('Should return an Object When Inbox Found<Get All Inbox>', (done) => { 
            InboxModel.getAllInbox().then((res) => {
                    expect(res).toBeDefined();
                    expect(typeof(res)).toBe('object');
                    expect(res[0].receiverId).toBeDefined();
                    expect(res[0].messageId).toBeDefined();
                    expect(res[0].createdOn).toBeDefined();
                    done();
            })
        })
        it('Should return  Null When Inbox not found   <Get All Inbox>', (done) => {
             InboxModel.InboxList=[];
             InboxModel.getAllInbox().then((res) => {
                 expect(res).toEqual([]);
                 done();
            })
        })
    })
       

})