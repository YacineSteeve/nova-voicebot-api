import * as Mongoose from 'mongoose';
import userSchema from './schemas/user';

const DATABASE_URL = process.env.DATABASE_URL;

const User = Mongoose.model('User', userSchema);

const connection = Mongoose.connect(DATABASE_URL);

export { connection, User };
