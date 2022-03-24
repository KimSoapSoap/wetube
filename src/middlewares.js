export const localsMiddleware = (req, res, next) => {
  console.log("middle", req.session);
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "Wetube";
  res.locals.loggedInUser = req.session.user;
  console.log("middle2", res.locals);
  next();
};
