import * as db from '../data/db.js';

// eslint-disable-next-line
export const jwtCallback = (jwtPayLoad, done) => {
  const user = db.getUserByEmail(jwtPayLoad.email);
  if (user) {
    return done(null, user);
  }
  return done(null, false);
};
