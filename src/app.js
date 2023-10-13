require('dotenv').config();

const { v4 } = require('uuid');
const bcrypt = require('bcrypt');
const PreProcess = require('./Applications/data/PreProcess');
const container = require('./Infrastructures/container');
const pool = require('./Infrastructures/database/postgres/pool');
const createServer = require('./Infrastructures/http/createServer');
const CategoryRepositoryPostgres = require('./Infrastructures/repository/CategoryRepositoryPostgres');
const PlaceRepositoryPostgres = require('./Infrastructures/repository/PlaceRepositoryPostgres');
const BcryptPasswordHash = require('./Infrastructures/security/BcryptPasswordHash');
const EventRepositoryPostgress = require('./Infrastructures/repository/EventRepositoryPostgress');

const seeding = async () => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const eventRepository = new EventRepositoryPostgress(client, v4);
    const categoryRepository = new CategoryRepositoryPostgres(client, v4);
    const placeRepository = new PlaceRepositoryPostgres(client, v4);
    const passwordHash = new BcryptPasswordHash(bcrypt);
    const preProcess = new PreProcess(
      eventRepository,
      categoryRepository,
      placeRepository,
      passwordHash,
    );
    const adminId = await preProcess.insertAdmin({
      name: process.env.ADMIN_NAME,
      phone: process.env.ADMIN_PHONE,
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
    });

    await preProcess.insertPlaceToDatabase(adminId);
    await preProcess.insertEventToDatabase(adminId);
    await client.query('COMMIT');
    // eslint-disable-next-line no-console
    console.log('SEEDED');
  } catch (e) {
    await client.query('ROLLBACK');
    if (!e.toString().includes('duplicate key value')) {
      throw e;
    }
  } finally {
    client.release();
  }
};

const start = async () => {
  const port = process.env.PORT;
  const server = await createServer(container);
  server.listen(port);

  // eslint-disable-next-line no-console
  console.log(`server start at http://localhost:${port}`);
};

seeding().then(
  () => start(),
  // eslint-disable-next-line no-console
  (err) => console.error(err),
);
