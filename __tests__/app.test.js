const pool = require('../lib/utils/pool');
const twilio = require('../lib/utils/twilio');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
// const Insult = require('../lib/models/Insult.js');

jest.mock('twilio', () => () => ({
  messages: {
    create: jest.fn(),
  },
}));

describe('insult routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  beforeEach(() => {
    return request(app).post('/api/v1/insults').send({
      quotes: 'something',
    });
  });

  it('creates a new insult in our database and sends a text message', () => {
    return request(app)
      .post('/api/v1/insults')
      .send({ quotes: 'something' })
      .then((res) => {
        expect(res.body).toEqual({
          id: '2',
          quotes: 'something',
        });
      });
  });

  it('should GET all insults', () => {
    return request(app)
      .get('/api/v1/insults')
      .then((res) => {
        expect(res.body).toEqual([
          {
            id: '1',
            quotes: 'something',
          },
        ]);
      });
  });

  it('should GET an insult by id', () => {
    return request(app)
      .get('/api/v1/insults/1')
      .then((res) => {
        expect(res.body).toEqual({
          id: '1',
          quotes: 'something',
        });
      });
  });

  it('should PATCH an insult by id & return updated insult', () => {
    return request(app)
      .patch('/api/v1/insults/1')
      .send({ quotes: 'something else' })
      .then((res) => {
        expect(res.body).toEqual({
          id: '1',
          quotes: 'something else',
        });
      });
  });

  it('should DELETE an insult', () => {
    return request(app)
      .delete('/api/v1/insults/1')
      .then((res) => {
        expect(res.body).toEqual({
          id: '1',
          quotes: 'something else',
        });
      });
  });
});

describe('favorites routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  beforeEach(() => {
    return request(app).post('/api/v1/favorites').send({
      username: 'joe',
      quotes: 'something',
    });
  });

  it('should SAVE an insult', () => {
    return request(app)
      .post('/api/v1/favorites')
      .send({ username: 'stacy', quotes: 'something' })
      .then((res) => {
        expect(res.body).toEqual({
          id: '2',
          username: 'stacy',
          quotes: 'something',
        });
      });
  });

  it.only('should GET all favorites', () => {
    return request(app)
      .get('/api/v1/favorites')
      .then((res) => {
        expect(res.body).toEqual([
          {
            id: '1',
            username: 'joe',
            quotes: 'something',
          },
        ]);
      });
  });
});
