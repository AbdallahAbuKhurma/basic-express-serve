'use strict';

module.exports = (req, res, next) => {
  if(req.query.name) {
    next();
  } else {
    next('There is no name');
    // res.status(500).json({error: 'No Name'});
  }
  console.log('Query' ,req.query);
};

