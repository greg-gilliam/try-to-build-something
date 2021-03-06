const pool = require('../lib/utils/pool');
const twilio = require('../lib/utils/twilio');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

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
          quotes: 'something',
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

  it('should GET all favorites', () => {
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

  it('should GET a favorite by id', () => {
    return request(app)
      .get('/api/v1/favorites/1')
      .then((res) => {
        expect(res.body).toEqual({
          id: '1',
          username: 'joe',
          quotes: 'something',
        });
      });
  });

  it('should PATCH a favorite by id & return updated favorite', () => {
    return request(app)
      .patch('/api/v1/favorites/1')
      .send({ username: 'joe', quotes: 'something else' })
      .then((res) => {
        expect(res.body).toEqual({
          id: '1',
          username: 'joe',
          quotes: 'something else',
        });
      });
  });

  it('should DELETE a favorite', () => {
    return request(app)
      .delete('/api/v1/favorites/1')
      .then((res) => {
        expect(res.body).toEqual({
          id: '1',
          username: 'joe',
          quotes: 'something',
        });
      });
  });
});

describe('drinks routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  beforeEach(() => {
    return request(app).post('/api/v1/drinks').send({
      drinkname: 'rye on the rocks',
      drinktime: 'breakfast',
    });
  });

  it('should SAVE a drink', () => {
    return request(app)
      .post('/api/v1/drinks')
      .send({ drinkname: 'beer', drinktime: 'snacktime' })
      .then((res) => {
        expect(res.body).toEqual({
          id: '2',
          drinkname: 'beer',
          drinktime: 'snacktime',
        });
      });
  });

  it('should GET all drinks', () => {
    return request(app)
      .get('/api/v1/drinks')
      .then((res) => {
        expect(res.body).toEqual([
          {
            id: '1',
            drinkname: 'rye on the rocks',
            drinktime: 'breakfast',
          },
        ]);
      });
  });

  it('should GET a drink by id', () => {
    return request(app)
      .get('/api/v1/drinks/1')
      .then((res) => {
        expect(res.body).toEqual({
          id: '1',
          drinkname: 'rye on the rocks',
          drinktime: 'breakfast',
        });
      });
  });

  it('should PATCH a drink by id & return updated drink', () => {
    return request(app)
      .patch('/api/v1/drinks/1')
      .send({ drinkname: 'rye on the rocks', drinktime: 'breakfast' })
      .then((res) => {
        expect(res.body).toEqual({
          id: '1',
          drinkname: 'rye on the rocks',
          drinktime: 'breakfast',
        });
      });
  });

  it('should DELETE a drink', () => {
    return request(app)
      .delete('/api/v1/drinks/1')
      .then((res) => {
        expect(res.body).toEqual({
          id: '1',
          drinkname: 'rye on the rocks',
          drinktime: 'breakfast',
        });
      });
  });
});

describe('snacks routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  beforeEach(() => {
    return request(app).post('/api/v1/snacks').send({
      snackname: 'cheese',
      snacktime: 'yes please',
    });
  });

  it('should SAVE a snack', () => {
    return request(app)
      .post('/api/v1/snacks')
      .send({ snackname: 'meat', snacktime: 'remember the cheese' })
      .then((res) => {
        expect(res.body).toEqual({
          id: '2',
          snackname: 'meat',
          snacktime: 'remember the cheese',
        });
      });
  });

  it('should GET all snacks', () => {
    return request(app)
      .get('/api/v1/snacks')
      .then((res) => {
        expect(res.body).toEqual([
          {
            id: '1',
            snackname: 'cheese',
            snacktime: 'yes please',
          },
        ]);
      });
  });

  it('should GET a snack by id', () => {
    return request(app)
      .get('/api/v1/snacks/1')
      .then((res) => {
        expect(res.body).toEqual({
          id: '1',
          snackname: 'cheese',
          snacktime: 'yes please',
        });
      });
  });

  it('should PATCH a snack by id & return updated snack', () => {
    return request(app)
      .patch('/api/v1/snacks/1')
      .send({ snackname: 'cheese', snacktime: 'yes, please' })
      .then((res) => {
        expect(res.body).toEqual({
          id: '1',
          snackname: 'cheese',
          snacktime: 'yes please',
        });
      });
  });

  it('should DELETE a snack', () => {
    return request(app)
      .delete('/api/v1/snacks/1')
      .then((res) => {
        expect(res.body).toEqual({
          id: '1',
          snackname: 'cheese',
          snacktime: 'yes please',
        });
      });
  });
});

describe('pets routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  beforeEach(() => {
    return request(app).post('/api/v1/pets').send({
      petname: 'mabel',
      nickname: 'mabeley dee',
    });
  });

  it('should SAVE a pet', () => {
    return request(app)
      .post('/api/v1/pets')
      .send({ petname: 'mabel', nickname: 'mabeley dee' })
      .then((res) => {
        expect(res.body).toEqual({
          id: '2',
          petname: 'mabel',
          nickname: 'mabeley dee',
        });
      });
  });

  it('should GET all pets', () => {
    return request(app)
      .get('/api/v1/pets')
      .then((res) => {
        expect(res.body).toEqual([
          {
            id: '1',
            petname: 'mabel',
            nickname: 'mabeley dee',
          },
        ]);
      });
  });

  it('should GET a pet by id', () => {
    return request(app)
      .get('/api/v1/pets/1')
      .then((res) => {
        expect(res.body).toEqual({
          id: '1',
          petname: 'mabel',
          nickname: 'mabeley dee',
        });
      });
  });

  it('should PATCH a pet by id & return updated pet', () => {
    return request(app)
      .patch('/api/v1/pets/1')
      .send({ petname: 'mabel', nickname: 'mabeley dee' })
      .then((res) => {
        expect(res.body).toEqual({
          id: '1',
          petname: 'mabel',
          nickname: 'mabeley dee',
        });
      });
  });

  it('should DELETE a pet', () => {
    return request(app)
      .delete('/api/v1/pets/1')
      .then((res) => {
        expect(res.body).toEqual({
          id: '1',
          petname: 'mabel',
          nickname: 'mabeley dee',
        });
      });
  });
});
