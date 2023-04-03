import * as Mongoose from 'mongoose';

const ENV_BASED_DATABASE_URI_MAP: Record<string, string> = {
    development: process.env.DEV_DATABASE_URI,
    test: process.env.TEST_DATABASE_URI,
    production: process.env.PROD_DATABASE_URI
}

const connection = Mongoose.connect(
    ENV_BASED_DATABASE_URI_MAP[process.env.NODE_ENV]
);

export { connection };
