require('dotenv').config();

const container = require('./Infrastructures/container');
const createServer = require('./Infrastructures/http/createServer');

const start = async () => {
  const port = process.env.PORT;
  const server = await createServer(container);
  server.listen(port);

  // eslint-disable-next-line no-console
  console.log(`server start at http://localhost:${port}`);
};

start();
