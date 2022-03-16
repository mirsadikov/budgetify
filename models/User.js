import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: 'user',
    },
  },
  {
    timestamps: true,
  },
);

userSchema.static('findByEmail', async function (email, select) {
  return this.findOne({ email: new RegExp(email, 'i') })
    .select(select)
    .exec();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    next();
  }
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

export default mongoose.model('User', userSchema);
