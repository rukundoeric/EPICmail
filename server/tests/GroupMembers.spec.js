import GroupMemberModel from '../models/GroupMembers';
import { groupmember } from './data/data';

describe('Group Members', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
    });
    afterEach(() =>{
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    })

    describe('Group Members Model', () => {
        it('Should create an instance of Group Members', (done) => {
            expect(GroupMemberModel).toBeDefined();
            expect(GroupMemberModel.data.type).toBe('dataList');
            expect(GroupMemberModel.GroupMemberList).toBeDefined();
            done();
        })

        it('Should Be able to add new Group Member',(done) => {
            GroupMemberModel.addGroupMembers(groupmember).then((res) => {
                expect(res).toBe(true);
                done();
            }).catch(() => done());
        })
        it('Should not Be able to add new Group Member',(done) => {
            GroupMemberModel.addGroupMembers().then((res) => {
                expect(res).toBe(false);
                done();
            }).catch(() => done());
        })
        it('Should Return an Object when Group Member Exist <Search By GroupId>', (done) => {
            GroupMemberModel.getMembersByGroupId(1).then((res) => {
                expect(res).toBeDefined();
                expect(typeof(res)).toBe('object');
                done();
            }).catch(() => done());
        })
        it('Should Return an Null when not Group Members found for specified Group', (done) => {
            GroupMemberModel.getMembersByGroupId(30).then((res) => {
                expect(res).toBe(undefined);
                done();
            }).catch(() => done());
        })
   
    })
  

})