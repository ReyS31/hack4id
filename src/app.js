require('dotenv').config();

const createServer = require('./Infrastructures/http/createServer');

const start = async () => {
  const server = await createServer();
  server.listen(process.env.HOST).then((info) => {
    // eslint-disable-next-line no-console
    console.log(`server start at ${info.address()}`);
  });
};

start();
