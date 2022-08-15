const jwt = require("jsonwebtoken");

const makeToken = (data) => {
  return new Promise((ok, not) => {
    jwt.sign(data, process.env.TOKENKEY, { expiresIn: '10d' }, (err, token) => {
      if (err) not(err);
      else ok(token);
    });
  });
};

const chekingToken = (token) => {
  return new Promise((ok, notok) => {
    jwt.verify(token, process.env.TOKENKEY, (err, decoded) => {
      if (err) notok(err);
      else ok(decoded);
    });
  }); 
};

module.exports.makeToken = makeToken;
module.exports.chekingToken = chekingToken;
