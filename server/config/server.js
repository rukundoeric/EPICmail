import express from 'express';
import ST from '../helpers/status'; 
import User from '../router/User';
import Message from '../router/Message';
import bodyParcer from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 7070;
app.use(bodyParcer.json());
app.use(bodyParcer.urlencoded({ extended: false }));
app.use('/',User);
app.use('/',Message);
app.use((err, req, res, next) => {
    res.status(err.status || ST.INTERNAL_S_E);
    res.json({
        "status" : err.status || ST.INTERNAL_S_E,
        "error" : err.message
      });
});
const run = (port = '') => {
  const server = app.listen(port || PORT, () => {
    console.log(`\n Server is running on PORT  ${port || PORT}...`);
  });
  return server;
};
run();
export default run;
