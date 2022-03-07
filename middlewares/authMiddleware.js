const protect = (req, res, next) => {
  // check token
  // verify token
  // if valid, set req.user
  // if not, throw error
  req.user = req.headers.userid;
  next();
};

const admin = (req, res, next) => {
  // check if user is admin
  // if not, throw error
  next();
};

export { protect, admin };
