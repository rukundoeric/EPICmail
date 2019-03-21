import Request from 'request';
import {hostUrl} from '../data/data';
import { piUrlv2messages, apiUrlv2messagesUnread, apiUrlv2messagesSent, apiUrlv2messagesAction
  } from '../../helpers/const';

  describe('Messages', () => {
    describe('POST Message /messages', () => {
      it('Should send Message', (done) => {
        Request.post(`${hostUrl}${piUrlv2messages}`,
          { json: true, form: {
            "subject": "Invitaion to makeup",
            "message": "Hello guys, we would to invite you to our mariage celemony which will take place at kacyiro suday pack 11:00 am, Thank you!",
            "to": "ericrukundo005@gmail.com",
            "status": "read"
           } }, (err, res, body) => {
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
              expect(body.data).toBeDefined();
              expect(body.status).toBe(200);
            }
            done();
          });
      });
    });
  })  