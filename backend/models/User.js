import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, default: 'user' }
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  try {
    if (!enteredPassword || !this.password) {
      console.error('Missing password or hash in matchPassword');
      return false;
    }
    return await bcrypt.compare(enteredPassword, this.password);
  } catch (error) {
    console.error('Error in matchPassword:', error);
    return false;
  }
};

export default mongoose.model('User', userSchema);
