'use strict';

const {server} = require('../src/server');
const supertest = require('supertest');
const request = supertest(server);

describe('API Server', () => {
  it('handles invaild request', async () => {
    const response = await request.get('/foo');
    expect(response.status).toEqual(404);
  });
  it('handles invaild method', async () => {
    const response = await request.post('/person');
    expect(response.status).toEqual(404);
  });
  it('handles no query string', async () => {
    const response = await request.get('/person');
    expect(response.status).toEqual(500);
  });
  it('handles the name in the query is string', async () => {
    const query = 'abdallah';
    const response = await request.get(`/person?name=${query}`);
    expect(response.body.name).toEqual(query);
    expect(response.status).toEqual(200);
  });
});