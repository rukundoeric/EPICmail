import Request from 'request';
import {hostUrl} from '../data/data';
import run from '../config/server';
import { 
piUrlv2authSignup,
  apiUrlv2authLogin,
  apiUrlv2authVerification
 } from '../../helpers/const';

describe('APIv2 User', () => {
  let server;
  beforeAll(async (done) => {
    server = run(4040);
    done();
  })
  afterAll((done) => {
      server.close();
      done();
  })
  describe('POST User Login /auth/login', () => {
    it('Should Login User', (done) => {
      Request.post(`${hostUrl}${apiUrlv2authLogin}`,
        { json: true, form: { "email":"ericrukundo005@gmail.com","password":"Eric00005"} }, (err, res, body) => {
          if (!err) {
            expect(body.data).toBeDefined();
            expect(body.status).toBe(201);
          }
          done();
        });
    });
  });

  describe('POST User Signup /auth/signup', () => {
    it('Should Signup User', (done) => {
      Request.post(`${hostUrl}${apiUrlv2authVerification}`,
        { json: true, form: {
          "firstName":"Muigabo",
          "lastName":"Prestein",
          "email":"gprestein055@gmail.com",
          "password":"Eric00005"
        } }, (err, res, body) => {
          if (!err) {
            expect(body.data).toBeDefined();
            expect(body.status).toBe(201);
          }
          done();
        });
    });
  });
});
