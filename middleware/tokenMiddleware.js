const jwt = require("../auth/jwt");

const tryGetIn = async (req, res, next) => {
  if (req.session.loginName) {
    try {
      req.tokendata = await jwt.chekingToken(req.session.jwtToken);
      next();
    } catch (e) {
      console.log(e);
      req.session.loginName = undefined;
      req.session.userAllData = undefined;
      req.session.err = "token expierd";
      res.redirect("/login");
    }
  } else {
    req.session.err = "your not logged in";
    res.redirect("/login");
  }
};

module.exports.tryGetIn = tryGetIn;
