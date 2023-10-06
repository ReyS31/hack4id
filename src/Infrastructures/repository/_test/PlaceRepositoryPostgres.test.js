const InvariantError = require('../../../Commons/exceptions/InvariantError');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const PlacesTableTestHelper = require('../../../../tests/PlacesTableTestHelper');
const pool = require('../../database/postgres/pool');
const PlaceRepositoryPostgres = require('../PlaceRepositoryPostgres');
const AddPlace = require('../../../Domains/places/entities/AddPlace');
const CategoriesTableTestHelper = require('../../../../tests/CategoriesTableTestHelper');
const UpdatePlace = require('../../../Domains/places/entities/UpdatePlace');

describe('AuthenticationRepository postgres', () => {
  const payload = {
    id: '11111111-2222-3333-4444-555555555555',
    thumbnail: 'test',
    name: 'test',
    phone: '081223344556',
    email: 'test@test.test',
    location: { latitude: -0.4628479, longitude: 117.1445376 },
    address: 'test',
  };

  beforeAll(async () => {
    await UsersTableTestHelper.addUser({});
    await CategoriesTableTestHelper.addCategory({});
  });

  afterEach(async () => {
    await PlacesTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await CategoriesTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
    await pool.end();
  });

  describe('pagination function', () => {
    it('should get places correctly', async () => {
      // Arrange
      const fakeIdGenerator = () => payload.id; // stub!
      const placeRepository = new PlaceRepositoryPostgres(
        pool,
        fakeIdGenerator,
      );

      await PlacesTableTestHelper.addPlace({
        location: [117.1470696, -0.4618179],
      });
      await PlacesTableTestHelper.addPlace({
        id: '11111111-2222-3233-4444-555555555555',
        phone: '0812312312312',
        email: 'test1@test.test',
        location: [117.1465546, -0.4621398],
      });
      await PlacesTableTestHelper.addPlace({
        id: '11111111-2222-3223-4444-555555555555',
        phone: '0812312312313',
        email: 'test2@test.test',
        location: [117.1201966, -0.5260316],
      });

      // Action & Assert
      const places = await placeRepository.pagination({
        page: 1,
        lat: -0.4621398,
        long: 117.1465546,
      });
      expect(places).toHaveLength(2);
    });
  });

  describe('addPlace function', () => {
    it('should add place to database', async () => {
      // Arrange
      const fakeIdGenerator = () => payload.id; // stub!
      const placeRepository = new PlaceRepositoryPostgres(
        pool,
        fakeIdGenerator,
      );

      const addPlace = new AddPlace({
        user_id: payload.id,
        category_id: payload.id,
        thumbnail: payload.thumbnail,
        name: payload.name,
        phone: payload.phone,
        email: payload.email,
        longitude: payload.location.longitude,
        latitude: payload.location.latitude,
        address: payload.address,
      });

      // Action
      await placeRepository.addPlace(addPlace);

      // Assert
      const places = await PlacesTableTestHelper.findPlacesById(payload.id);
      expect(places).toHaveLength(1);
      expect(places[0].id).toBe(payload.id);
    });
  });

  describe('updatePlace function', () => {
    it('should update place at database', async () => {
      // Arrange
      const fakeIdGenerator = () => payload.id; // stub!
      const placeRepository = new PlaceRepositoryPostgres(
        pool,
        fakeIdGenerator,
      );

      const updatePlace = new UpdatePlace({
        email: 'test1@gmail.com',
      });

      await PlacesTableTestHelper.addPlace({});

      // Action
      await placeRepository.updatePlace(payload.id, updatePlace);

      // Assert
      const places = await PlacesTableTestHelper.findPlacesById(payload.id);
      expect(places).toHaveLength(1);
      expect(places[0].email).toBe('test1@gmail.com');
    });
  });

  describe('deletePlace function', () => {
    it('should delete place from database', async () => {
      // Arrange
      const fakeIdGenerator = () => payload.id; // stub!
      const placeRepository = new PlaceRepositoryPostgres(
        pool,
        fakeIdGenerator,
      );

      await PlacesTableTestHelper.addPlace({});

      // Action
      await placeRepository.deletePlace(payload.id);

      // Assert
      const places = await PlacesTableTestHelper.findPlacesById(payload.id);
      expect(places).toHaveLength(0);
    });
  });

  describe('getById function', () => {
    it('should get place correctly', async () => {
      // Arrange
      const fakeIdGenerator = () => payload.id; // stub!
      const placeRepository = new PlaceRepositoryPostgres(
        pool,
        fakeIdGenerator,
      );

      await PlacesTableTestHelper.addPlace({});

      // Action & Assert
      const place = await placeRepository.getById(payload.id);
      expect(place.id).toBe(payload.id);
    });
  });

  describe('verifyPlaceExists function', () => {
    it('should not throw error', async () => {
      // Arrange
      const fakeIdGenerator = () => payload.id; // stub!
      const placeRepository = new PlaceRepositoryPostgres(
        pool,
        fakeIdGenerator,
      );

      await PlacesTableTestHelper.addPlace({});

      // Action & Assert
      await expect(
        placeRepository.verifyPlaceExists(payload.id),
      ).resolves.not.toThrow(InvariantError);
    });

    it('should throw InvariantError', async () => {
      // Arrange
      const fakeIdGenerator = () => payload.id; // stub!
      const placeRepository = new PlaceRepositoryPostgres(
        pool,
        fakeIdGenerator,
      );

      // Action & Assert
      await expect(
        placeRepository.verifyPlaceExists(payload.id),
      ).rejects.toThrow(InvariantError);
    });
  });

  describe('isEmailAvailable function', () => {
    it('should not throw error', async () => {
      // Arrange
      const fakeIdGenerator = () => payload.id; // stub!
      const placeRepository = new PlaceRepositoryPostgres(
        pool,
        fakeIdGenerator,
      );

      // Action & Assert
      await expect(
        placeRepository.isEmailAvailable(payload.email),
      ).resolves.not.toThrow(InvariantError);
    });

    it('should throw InvariantError', async () => {
      // Arrange
      const fakeIdGenerator = () => payload.id; // stub!
      const placeRepository = new PlaceRepositoryPostgres(
        pool,
        fakeIdGenerator,
      );

      await PlacesTableTestHelper.addPlace({});

      // Action & Assert
      await expect(
        placeRepository.isEmailAvailable(payload.email),
      ).rejects.toThrow(InvariantError);
    });
  });

  describe('isPhoneAvailable function', () => {
    it('should not throw error', async () => {
      // Arrange
      const fakeIdGenerator = () => payload.id; // stub!
      const placeRepository = new PlaceRepositoryPostgres(
        pool,
        fakeIdGenerator,
      );

      // Action & Assert
      await expect(
        placeRepository.isPhoneAvailable(payload.phone),
      ).resolves.not.toThrow(InvariantError);
    });

    it('should throw InvariantError', async () => {
      // Arrange
      const fakeIdGenerator = () => payload.id; // stub!
      const placeRepository = new PlaceRepositoryPostgres(
        pool,
        fakeIdGenerator,
      );

      await PlacesTableTestHelper.addPlace({});

      // Action & Assert
      await expect(
        placeRepository.isPhoneAvailable(payload.phone),
      ).rejects.toThrow(InvariantError);
    });
  });
});
