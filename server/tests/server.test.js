const { ObjectID } = require('mongodb');
const expect = require('expect');
const request = require('supertest');


const { app } = require('./../server');
const { Todo } = require('./../models/todo');

const todos = [{
  _id: new ObjectID(),
  text: 'Testing my todo part 1'
}, {
  _id: new ObjectID(),
  text: 'Testing my todo part 2'
}];

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

describe('DELETE /todos/:id', () => {
  it('should remove a todo', (done) => {
    var hexId = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect( (res) => {
        expect(res.body.todo._id).toBe(hexId);
      })
      .end( (err, res) => {
        if (err) {
          return done(err);
        }

        Todo.findById(hexId).then( (todo) => {
          expect(todo).toNotExist();
          done();
        }).catch( (e) => done(e));
      });
  });

it('should return 404 if todo not found', (done) => {
    var hexId = todos[1]._id.toHexString();

    request(app)
      .get(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 if object id is invalid', (done) => {
    request(app)
      .delete('/todos/123abc')
      .expect(404)
      .end(done);
  });

});
