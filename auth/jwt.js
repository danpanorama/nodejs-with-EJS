const jwt = require("jsonwebtoken");
const localStorage = require("localStorage");

const makeToken = (data) => {
  let remember = localStorage.getItem("isRemember");
  console.log(remember);
  let on;
  if (remember == "on") {
    on = "10d";
  } else {
    on = "3s";
  }
  console.log(on);
  return new Promise((ok, not) => {
    jwt.sign(data, process.env.TOKENKEY, { expiresIn: on }, (err, token) => {
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
