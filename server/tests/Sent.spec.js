import SentModel from '../models/Sent';
import { sent } from './data/data';
describe('Sent', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
    })
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    })
    describe('Sent Model', () => {
        it('Should Create an instance of Sent',(done) => {
            expect(SentModel).toBeDefined();
            expect(SentModel.data.type).toBe('dataList');
            done();
        })
        it('Should Be able to add new Sent',(done) => {
            SentModel.addSent(sent).then((res) => {
                expect(res).toBe(true);
                done();
            }).catch(() => done());
        })
        it('Should not Be able to add new Sent',(done) => {
            SentModel.addSent().then((res) => {
                expect(res).toBe(false);
                done();
            }).catch(() => done());
        })
        it('Should return an Object When Sent Found   <Get All Sent>', (done) => {
            SentModel.getSentList().then((res) => {
                    expect(res).toBeDefined();
                    expect(typeof(res)).toBe('object');
                    expect(res[0].senderId).toBeDefined();
                    expect(res[0].messageId).toBeDefined();
                    expect(res[0].createdOn).toBeDefined();
                    done();
            })
        })
        it('Should return null  When Sent not Found   <Get All Sent>', (done) => {
            SentModel.SentList=[];
            SentModel.getSentList().then((res) => {
                    expect(res).toEqual([]);  
                    done();  
            })
        })
    })
       

})