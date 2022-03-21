import mongoose from 'mongoose';

const dbURL = `${process.env.MONGODB_URI}${process.env.DB_NAME}`;

const connectDB = () => {
  mongoose.connect(dbURL, (err, conn) => {
    // eslint-disable-next-line no-console
    if (err) console.log(err.message.red.inverse);
    // eslint-disable-next-line no-console
    else console.log(`Connected to database ${conn.name}`.green.inverse);
  });
};

export default connectDB;
