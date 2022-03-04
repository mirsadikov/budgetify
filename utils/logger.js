export default function logger(req, res, next) {
  // eslint-disable-next-line no-console
  console.log(`${new Date().toString()} ${req.method} ${req.originalUrl}`);
  next();
}
