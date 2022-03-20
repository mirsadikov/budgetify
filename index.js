import 'colors';
import app from './app.js';
import connectDB from './config/db.js';

// config
connectDB();

// listen
const { PORT } = process.env;
if (!PORT) {
  throw new Error('PORT is not set!'.red);
}

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started on port ${PORT}`.blue.inverse);
});
