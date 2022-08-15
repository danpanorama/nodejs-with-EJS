const e = require("express");

module.exports = (req, res, next) => {
  if (req.session.loginName) {
    next();
  } else {
    req.session.err = "your prubbly looged out you need to log in";
    res.redirect("/login");
  }
};
