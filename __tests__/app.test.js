const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('twilio', () => () => ({
  messages: {
    create: jest.fn()
  }
}));

describe('insult demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  })
}

//   afterAll(() => {
//     pool.end();
//   });
// });

  it('creates a new insult in db and sends a text', () => {
    return request(app)
      .post('/api/v1/quotes')
      .send({ insult })
      .then(res => {
        expect(res.body).toEqual.any(string)({
          id: '1',
          quotes: ''
        });
      });
  });

