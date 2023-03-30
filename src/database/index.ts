import * as Mongoose from 'mongoose';

const DATABASE_URL = process.env.DATABASE_URL;

const connection = Mongoose.connect(DATABASE_URL);

export { connection };
