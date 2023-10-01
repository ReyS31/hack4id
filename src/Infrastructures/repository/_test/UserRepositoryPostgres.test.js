const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const InvariantError = require('../../../Commons/exceptions/InvariantError');
const RegisterUser = require('../../../Domains/users/entities/RegisterUser');
const RegisteredUser = require('../../../Domains/users/entities/RegisteredUser');
const pool = require('../../database/postgres/pool');
const UserRepositoryPostgres = require('../UserRepositoryPostgres');

describe('UserRepositoryPostgres', () => {
  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('verifyAvailableEmail function', () => {
    it('should throw InvariantError when email not available', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ email: 'aws@xyz.com' });
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(
        userRepositoryPostgres.verifyAvailableEmail('aws@xyz.com'),
      ).rejects.toThrowError(InvariantError);
    });

    it('should not throw InvariantError when email available', async () => {
      // Arrange
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(
        userRepositoryPostgres.verifyAvailableEmail('aws@xyz.com'),
      ).resolves.not.toThrowError(InvariantError);
    });
  });

  describe('addUser function', () => {
    it('should persist register user and return registered user correctly', async () => {
      // Arrange
      const registerUser = new RegisterUser({
        name: 'sinileh',
        password: 'secret_password',
        email: 'aws@xyz.com',
        phone: '081224975765',
      });
      const fakeIdGenerator = () => '11111111-2222-3333-4444-555555555555'; // stub!
      const userRepositoryPostgres = new UserRepositoryPostgres(
        pool,
        fakeIdGenerator,
      );

      // Action
      await userRepositoryPostgres.addUser(registerUser);

      // Assert
      const users = await UsersTableTestHelper.findUsersById(
        '11111111-2222-3333-4444-555555555555',
      );
      expect(users).toHaveLength(1);
    });

    it('should return registered user correctly', async () => {
      // Arrange
      const registerUser = new RegisterUser({
        name: 'sinileh',
        password: 'secret_password',
        email: 'aws@xyz.com',
        phone: '081224975765',
      });
      const fakeIdGenerator = () => '11111111-2222-3333-4444-555555555555'; // stub!
      const userRepositoryPostgres = new UserRepositoryPostgres(
        pool,
        fakeIdGenerator,
      );

      // Action
      const registeredUser = await userRepositoryPostgres.addUser(registerUser);

      // Assert
      expect(registeredUser).toStrictEqual(
        new RegisteredUser({
          id: '11111111-2222-3333-4444-555555555555',
          name: 'sinileh',
          email: 'aws@xyz.com',
          phone: '081224975765',
        }),
      );
    });
  });

  describe('getPasswordByEmail', () => {
    it('should throw InvariantError when user not found', () => {
      // Arrange
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});

      // Action & Assert
      return expect(
        userRepositoryPostgres.getPasswordByEmail('sinileh'),
      ).rejects.toThrowError(InvariantError);
    });

    it('should return name password when user is found', async () => {
      // Arrange
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});
      await UsersTableTestHelper.addUser({
        name: 'sinileh',
        password: 'secret_password',
        email: 'aws@xyz.com',
      });

      // Action & Assert
      const password = await userRepositoryPostgres.getPasswordByEmail(
        'aws@xyz.com',
      );
      expect(password).toBe('secret_password');
    });
  });

  describe('getIdByEmail', () => {
    it('should throw InvariantError when user not found', async () => {
      // Arrange
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(
        userRepositoryPostgres.getIdByEmail('aws@xyz.com'),
      ).rejects.toThrowError(InvariantError);
    });

    it('should return user id correctly', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({
        id: '11111111-2222-3333-4444-555555555555',
        name: 'sinileh',
        email: 'aws@xyz.com',
      });
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});

      // Action
      const userId = await userRepositoryPostgres.getIdByEmail('aws@xyz.com');

      // Assert
      expect(userId).toEqual('11111111-2222-3333-4444-555555555555');
    });
  });
});
