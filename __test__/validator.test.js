'use strict';
const valdidator = require('../src/middelware/validator');
describe('valdidator', () => {
  let consoleSpy;
  const req = {
    query: {},
  };
  const res = {};
  const next = jest.fn();
  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });
  afterEach(() => {
    consoleSpy.mockRestore();
  });
  it('logs output the name property if it exists', () => {
    valdidator(req, res, next);
    req.query.name = 'abdallah';
    expect(consoleSpy).toHaveBeenCalled();
  });
  it('moves to the next middleware', () => {
    valdidator(req, res, next);
    expect(next).toHaveBeenCalledWith();
  });
});