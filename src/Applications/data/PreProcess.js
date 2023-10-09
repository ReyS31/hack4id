const fs = require('fs').promises;

const UsersTableTestHelper = require('../../../tests/UsersTableTestHelper');
const capitalize = require('../../Commons/utils/capitalize');

const AddCategory = require('../../Domains/categories/entities/AddCategory');
const AddPlace = require('../../Domains/places/entities/AddPlace');

class PreProcess {
  constructor(categoryRepository, placeRepository, passwordHash) {
    this._categoryRepository = categoryRepository;
    this._placeRepository = placeRepository;
    this._passwordHash = passwordHash;
  }

  async insertAdmin({ name, phone, email, password }) {
    const hashedPassword = await this._passwordHash.hash(password);
    return UsersTableTestHelper.addAdmin({
      name,
      phone,
      email,
      password: hashedPassword,
      created_at: new Date().toUTCString(),
    });
  }

  async insertPlaceToDatabase(adminId) {
    let promises = [];
    const SAMPLE_DIR = `${__dirname}/samples`;
    const dir = await fs.readdir(SAMPLE_DIR);
    const filteredCategory = dir.filter((file) =>
      file.includes('_categories.json'),
    );
    filteredCategory.forEach(async (file) => {
      const prefix = file.split('_')[0];
      if (prefix === 'pariwisata') {
        const categories = JSON.parse(
          (await fs.readFile(`${SAMPLE_DIR}/${file}`)).toString(),
        );

        categories.forEach(async (ctg) => {
          const ctgLowerCase = ctg.toLowerCase().replace(' ', '_');
          const category_id = await this._categoryRepository.addCategory(
            new AddCategory({
              name: ctg,
              icon: ctgLowerCase,
            }),
          );

          const data = JSON.parse(
            (
              await fs.readFile(`${SAMPLE_DIR}/${prefix}_${ctgLowerCase}.json`)
            ).toString(),
          );
          const prms = data.map(async (datum) => {
            const addPlace = new AddPlace({
              user_id: adminId,
              category_id,
              thumbnail: 'test',
              name: datum.nama,
              address: datum.alamat,
              latitude: Number(datum.latitude),
              longitude: Number(datum.longitude),
            });

            return this._placeRepository.addPlace(addPlace);
          });

          promises = [promises, ...prms];
        });
      } else {
        const category_id = await this._categoryRepository.addCategory(
          new AddCategory({
            name: capitalize(prefix),
            icon: prefix,
          }),
        );
        const data = JSON.parse(
          (await fs.readFile(`${SAMPLE_DIR}/${prefix}_data.json`)).toString(),
        );

        const prms = data.map(async (datum) => {
          const addPlace = new AddPlace({
            user_id: adminId,
            category_id,
            thumbnail: datum.foto ?? 'test',
            name: datum.nama,
            address: datum.alamat,
            latitude: Number(datum.latitude),
            longitude: Number(datum.longitude),
          });

          return this._placeRepository.addPlace(addPlace);
        });
        promises = [promises, ...prms];
      }
    });

    return promises;
  }
}

module.exports = PreProcess;
