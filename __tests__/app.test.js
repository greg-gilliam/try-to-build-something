const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const insult = require('../lib/models/insult');

jest.mock('twilio', () => () => ({
  messages: {
    create: jest.fn()
  },
}));

describe('insult routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a new insult in our database and sends a text message', () => {
    return request(app)
      .post('/api/v1/quotes')
      .send({ quotes: 'blah' })
      .then(res => {
        expect(res.body).toEqual.any(String);
      });
  });
});
