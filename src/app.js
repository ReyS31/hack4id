require('dotenv').config();

const { v4 } = require('uuid');
const PreProcess = require('./Applications/data/PreProcess');
const container = require('./Infrastructures/container');
const pool = require('./Infrastructures/database/postgres/pool');
const createServer = require('./Infrastructures/http/createServer');
const CategoryRepositoryPostgres = require('./Infrastructures/repository/CategoryRepositoryPostgres');
const PlaceRepositoryPostgres = require('./Infrastructures/repository/PlaceRepositoryPostgres');
const EventRepositoryPostgres = require('./Infrastructures/repository/EventRepositoryPostgres');
const scheduler = require('./scheduler');
const PasswordHash = require('./Applications/security/PasswordHash');

const seeding = async () => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const eventRepository = new EventRepositoryPostgres(client, v4);
    const categoryRepository = new CategoryRepositoryPostgres(client, v4);
    const placeRepository = new PlaceRepositoryPostgres(client, v4);
    const passwordHash = container.getInstance(PasswordHash.name);
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
  scheduler();
  server.listen(port);

  // eslint-disable-next-line no-console
  console.log(`server start at http://localhost:${port}`);
};

seeding().then(
  () => start(),
  // eslint-disable-next-line no-console
  (err) => console.error(err),
);
