/* istanbul ignore file */

const { createContainer } = require('instances-container');

// external agency
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const Jwt = require('jsonwebtoken');
const pool = require('./database/postgres/pool');

// service (repository, helper, manager, etc)
const UserRepository = require('../Domains/users/UserRepository');
const PasswordHash = require('../Applications/security/PasswordHash');
const UserRepositoryPostgres = require('./repository/UserRepositoryPostgres');
const BcryptPasswordHash = require('./security/BcryptPasswordHash');
const PlaceRepository = require('../Domains/places/PlaceRepository');
const PlaceRepositoryPostgres = require('./repository/PlaceRepositoryPostgres');
const CategoryRepository = require('../Domains/categories/CategoryRepository');
const CategoryRepositoryPostgres = require('./repository/CategoryRepositoryPostgres');
const EventRepository = require('../Domains/events/EventRepository');
const EventRepositoryPostgres = require('./repository/EventRepositoryPostgres');
const EventViewRepository = require('../Domains/event-views/EventViewRepository');
const EventViewRepositoryPostgres = require('./repository/EventViewRepositoryPostgres');
const PaymentRepository = require('../Domains/payments/PaymentRepository');
const PaymentRepositoryPostgress = require('./repository/PaymentRepositoryPostgres');

// use case
const AddUserUseCase = require('../Applications/use_case/AddUserUseCase');
const AuthenticationTokenManager = require('../Applications/security/AuthenticationTokenManager');
const JwtTokenManager = require('./security/JwtTokenManager');
const LoginUserUseCase = require('../Applications/use_case/LoginUserUseCase');
const AuthenticationRepository = require('../Domains/authentications/AuthenticationRepository');
const AuthenticationRepositoryPostgres = require('./repository/AuthenticationRepositoryPostgres');
const LogoutUserUseCase = require('../Applications/use_case/LogoutUserUseCase');
const RefreshAuthenticationUseCase = require('../Applications/use_case/RefreshAuthenticationUseCase');
const PaginatePlaceUseCase = require('../Applications/use_case/PaginatePlaceUseCase');
const GetCategoriesUseCase = require('../Applications/use_case/GetCategoriesUseCase');
const GetPlaceUseCase = require('../Applications/use_case/GetPlaceUseCase');
const PaginateEventUseCase = require('../Applications/use_case/PaginateEventUseCase');
const GetEventUseCase = require('../Applications/use_case/GetEventUseCase');
const GetHomeHeadlinesUseCase = require('../Applications/use_case/GetHomeHeadlinesUseCase');
const AddEventViewsUseCase = require('../Applications/use_case/AddEventViewsUseCase');
const CreateOrderPinUseCase = require('../Applications/use_case/CreateOrderPinUseCase');

// creating container
const container = createContainer();

// registering services and repository
container.register([
  {
    key: UserRepository.name,
    Class: UserRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
        {
          concrete: uuidv4,
        },
      ],
    },
  },
  {
    key: AuthenticationRepository.name,
    Class: AuthenticationRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
  {
    key: PasswordHash.name,
    Class: BcryptPasswordHash,
    parameter: {
      dependencies: [
        {
          concrete: bcrypt,
        },
      ],
    },
  },
  {
    key: AuthenticationTokenManager.name,
    Class: JwtTokenManager,
    parameter: {
      dependencies: [
        {
          concrete: Jwt,
        },
      ],
    },
  },
  {
    key: CategoryRepository.name,
    Class: CategoryRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
        {
          concrete: uuidv4,
        },
      ],
    },
  },
  {
    key: PlaceRepository.name,
    Class: PlaceRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
        {
          concrete: uuidv4,
        },
      ],
    },
  },
  {
    key: EventRepository.name,
    Class: EventRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
        {
          concrete: uuidv4,
        },
      ],
    },
  },
  {
    key: EventViewRepository.name,
    Class: EventViewRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
  {
    key: PaymentRepository.name,
    Class: PaymentRepositoryPostgress,
    parameter: {
      dependencies: [{ concrete: pool }],
    },
  },
]);

// registering use cases
container.register([
  {
    key: AddUserUseCase.name,
    Class: AddUserUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'userRepository',
          internal: UserRepository.name,
        },
        {
          name: 'passwordHash',
          internal: PasswordHash.name,
        },
      ],
    },
  },
  {
    key: LoginUserUseCase.name,
    Class: LoginUserUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'userRepository',
          internal: UserRepository.name,
        },
        {
          name: 'authenticationRepository',
          internal: AuthenticationRepository.name,
        },
        {
          name: 'authenticationTokenManager',
          internal: AuthenticationTokenManager.name,
        },
        {
          name: 'passwordHash',
          internal: PasswordHash.name,
        },
      ],
    },
  },
  {
    key: LogoutUserUseCase.name,
    Class: LogoutUserUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'authenticationRepository',
          internal: AuthenticationRepository.name,
        },
      ],
    },
  },
  {
    key: RefreshAuthenticationUseCase.name,
    Class: RefreshAuthenticationUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'authenticationRepository',
          internal: AuthenticationRepository.name,
        },
        {
          name: 'authenticationTokenManager',
          internal: AuthenticationTokenManager.name,
        },
      ],
    },
  },
  {
    key: PaginatePlaceUseCase.name,
    Class: PaginatePlaceUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'placeRepository',
          internal: PlaceRepository.name,
        },
      ],
    },
  },
  {
    key: GetCategoriesUseCase.name,
    Class: GetCategoriesUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'categoryRepository',
          internal: CategoryRepository.name,
        },
      ],
    },
  },
  {
    key: GetPlaceUseCase.name,
    Class: GetPlaceUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'placeRepository',
          internal: PlaceRepository.name,
        },
      ],
    },
  },
  {
    key: PaginateEventUseCase.name,
    Class: PaginateEventUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'eventRepository',
          internal: EventRepository.name,
        },
      ],
    },
  },
  {
    key: GetEventUseCase.name,
    Class: GetEventUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'eventRepository',
          internal: EventRepository.name,
        },
      ],
    },
  },
  {
    key: GetHomeHeadlinesUseCase.name,
    Class: GetHomeHeadlinesUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'eventRepository',
          internal: EventRepository.name,
        },
      ],
    },
  },
  {
    key: AddEventViewsUseCase.name,
    Class: AddEventViewsUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'eventRepository',
          internal: EventRepository.name,
        },
        {
          name: 'eventViewRepository',
          internal: EventViewRepository.name,
        },
      ],
    },
  },
  {
    key: CreateOrderPinUseCase.name,
    Class: CreateOrderPinUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'paymentRepository',
          internal: PaymentRepository.name,
        },
        {
          name: 'placeRepository',
          internal: PlaceRepository.name,
        },
        {
          name: 'eventRepository',
          internal: EventRepository.name,
        },
      ],
    },
  },
]);

module.exports = container;
