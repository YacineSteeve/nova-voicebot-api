import * as Mongoose from 'mongoose';
import userSchema from './schema';

const User = Mongoose.model('User', userSchema);

export { User, userSchema };
