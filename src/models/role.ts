import bcrypt from 'bcrypt-nodejs';
import mongoose from 'mongoose';

export type RoleModel = mongoose.Document & {
  email: string,
  password: string,
  comparePassword: comparePasswordFunction
};

type comparePasswordFunction = (candidatePassword: string, cb: (err: any, isMatch: any) => {}) => void;

const roleSchema = new mongoose.Schema({
  crud: String,
  path: { type: String, unique: true }
}, { timestamps: true });

/**
 * Password hash middleware.
 */
roleSchema.pre('validate', function save(next: any) {
  const user: any = this;
  // if (!this.isModified('password')) { return next(); }
  // bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
  //   if (err) { return next(err); }
  //   bcrypt.hash(user.password, salt, undefined, (error: mongoose.Error, hash) => {
  //     if (err) { return next(error); }
  //     role.password = hash;
  next();
  //   });
  // });
});

const comparePassword: comparePasswordFunction = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err: mongoose.Error, isMatch: boolean) => {
    cb(err, isMatch);
  });
};

// userSchema.methods.comparePassword = comparePassword;

const Role = mongoose.model('Role', roleSchema);
export default Role;
