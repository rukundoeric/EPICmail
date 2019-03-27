import chai from 'chai';
import chaiHttp from 'chai-http';
import ST from '../helpers/status';
import server from '../config/server';
import { wrongNewUser } from './data/data';
import {
  apiUrlv2authSignup
} from '../helpers/const';
import { expect } from 'chai';
chai.use(chaiHttp);
describe('User', () => {
  it('Should not signup User',(done) => {
     chai.request(server)
      .post(`${apiUrlv2authSignup}`)
      .send(wrongNewUser)
      .set('Accept','Application/JSON')
      .end((err, res) => {
        expect(res.status).to.be(ST.BAD_REQUEST)  
      })
  });
});