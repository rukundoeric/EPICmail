import Request from 'request';
import {hostUrl,userToken} from '../data/data';
import run from '../../config/server';
import { piUrlv2messages ,apiUrlv2messagesUnread} from '../../helpers/const';

  describe('Messages', () => {
    let server;
    beforeAll(async (done) => {
      server = run(4040);
      done();
    })
    afterAll((done) => {
        server.close();
        done();
    })
    describe('POST Message /messages', () => {
      it('Should send Message', (done) => {
        Request.post(`${hostUrl}${piUrlv2messages}`,
        {json: true,headers: {
          'epic-mail-access-token':userToken,
          form: {
            "subject": "Invitaion to makeup",
            "message": "Hello guys, we would to invite you to our mariage celemony which will take place at kacyiro suday pack 11:00 am, Thank you!",
            "to": "ericrukundo005@gmail.com",
            "status": "read"
           }
        }}, (err, res, body) => {
            if (!err) {
              expect(body.data).toBeDefined();
              expect(body.status).toBe(200);
            }
            done();
          });
      });
    });

    describe('GET Message /messages', () => {
      it('Should get All received Messages', (done) => {
        Request.post(`${hostUrl}${apiUrlv2messagesUnread}`,
          { json: true, form: {
            "subject": "Invitaion to makeup",
            "message": "Hello guys, we would to invite you to our mariage celemony which will take place at kacyiro suday pack 11:00 am, Thank you!",
            "to": "ericrukundo005@gmail.com",
            "status": "read"
           } }, (err, res, body) => {
            if (!err) {
              expect(body.data).toBe(undefined);
            }
            done();
          });
      });
    });
  })  