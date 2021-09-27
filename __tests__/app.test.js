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
      .then(res => {
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
});

it('should GET an insult by id', () => {
  return request(app)
    .get('/api/v1/insult/1')
    .then((res) => {
      expect(res.body).toEqual({
        id: '1',
        quotes: 'something',
      });
    });
});

