import GroupModel from '../models/Group';
import { group } from './data/data';

describe('Group', ()  => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
    });
    afterEach(() =>{
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    })

    describe('Group Model', () => {
        it('Should create an instance of Group', (done) => {
            expect(GroupModel.data.type).toBe('dataList');
            done();
        })
        it('Should Be able to add new Group',(done) => {
            GroupModel.addGroup(group).then((res) => {
                expect(res).toBe(true);
                done();
            }).catch(() => done());
        })
        it('Should not Be able to add an invalid group',(done) => {
            GroupModel.addGroup().then((res) => {
                expect(res).toBe(false);
                done();
            }).catch(() => done());
        })
        it('Should Return an Object when Group Exist', (done) => {
            GroupModel.getGroupById(1).then((res) => {
                expect(res).toBeDefined();
                expect(typeof(res)).toBe('object');
                done();
            }).catch(() => done());
        })
        it('Should Return an Null when Group not Exist', (done) => {
            GroupModel.getGroupById(200).then((res) => {
                expect(res).toBe(undefined);
                done();
            }).catch(() => done());
        })
        it('Should Return List of all groups when found', (done) => {
            GroupModel.getAllGroups().then((res) => {
                expect(typeof(res)).toBe('object');
                expect(res[0].id).toBeDefined();
                expect(res[0].name).toBeDefined();
                done();
            })
        })
     
    })



})