import express from 'express';
import path from 'path';
import ST from '../helpers/status'; 
import User from '../router/User';
import Message from '../router/Message';
import Group from '../router/Group';
import bodyParcer from 'body-parser';
import dotenv from 'dotenv';
import db from '../db/migration/db';
import swagger from 'swagger-ui-express';
import docs from '../config/swagger';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 7070;
db.createTables();
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.set('UI', path.join(__dirname, 'UI'));
app.use(bodyParcer.json());
app.use(bodyParcer.urlencoded({ extended: false }));
app.use('/',User);
app.use('/',Message);
app.use('/',Group);
app.use('/', swagger.serve, swagger.setup(docs));
app.use((err, req, res) => {
  res.status(err.status || ST.INTERNAL_S_E);
  res.json({
    'status' : err.status || ST.INTERNAL_S_E,
    'error' : err.message
  });
});
const run = (port = '') => {
  const server = app.listen(port || PORT, () => {
    // console.log(`\n Server is running on PORT  ${port || PORT}...`);
  });
  return server;
};
run();
export default run;
