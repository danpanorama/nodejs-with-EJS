module.exports = (req, res, next) => {
  req.infoNav = {
    page: req.originalUrl,
    loginName: req.session.loginName,
  };
  next();
};
