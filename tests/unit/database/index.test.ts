import '@config/env-config';
import { connection } from '@database/index';
import type { Mongoose } from 'mongoose';

describe('src/database', () => {
    test('connection object should be defined and exported', async () => {
        expect(connection).toBeTruthy();
    });

    let database: Mongoose = null;

    describe('Database', () => {
        beforeAll(async () => {
            database = await connection;
        });

        afterAll(async () => {
            await database.connection.close();
        });

        test('should be defined', async () => {
            expect(database).toBeTruthy();
        });

        test('should be connected', async () => {
            expect(database).toBeTruthy();
            expect(database.connection.readyState).toBe(1);
        });

        test('should have a name', async () => {
            expect(database.connection.name).toBeTruthy();
            expect(typeof database.connection.name).toEqual('string');
        });

        const collections = ['users'];

        test.each(collections)('should have a "%s" collection', async (collection) => {
            expect(database.connection.db.collection(collection)).toBeTruthy();
        });
    });

    describe('Database', () => {
        test('should be disconnected', async () => {
            expect(database.connection.readyState).toBe(0);
        });
    });
});
