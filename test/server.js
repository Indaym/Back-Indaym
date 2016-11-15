const request = require('supertest');
//const request = require('request');
const sinon = require('sinon');

describe('1st bunch of test', () => {
  it('display hello world', (done) => {
    var logger = sinon.spy();

    request('http://localhost:3000')
      .get('/')
      .expect(200)
      .end((err, res) => {
    if (err) return done(err)
    done()
    })
  })
});
