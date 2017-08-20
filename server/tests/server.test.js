const expect = require('expect');
const request = require('supertest');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');

// make sure databse base is zero before performing test
// otherwise logic does not make sense below
// beforeEach( (done) => {
//   Todo.remove({}).then( () => done());
// });

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'test todo text';

    request(app)
      .post('/todos')
      .send({ text })
      // now make asertions about the request
      .expect(200)
      .expect( (res) => {
        expect(res.body.text).toBe(text);
      })
      .end( (err, res) => {
        if (err) {
          return done(err);
          done();
        }
        // testing in mongoDB using model validation
        Todo.find().then( (todos) => {
          // expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
          // catch any errors in the callback
        }).catch( (e) => done());

      });
  });
});
