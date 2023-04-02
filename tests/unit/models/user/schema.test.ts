import userSchema from '@models/user/schema';
import { Schema } from 'mongoose';

describe('src/models/user/schema.', () => {
    test('userSchema should be defined', () => {
        expect(userSchema).toBeDefined();
    });

    test('userSchema should be an instance of Schema', () => {
        expect(userSchema).toBeInstanceOf(Schema);
    });

    test('userSchema should have a username property', () => {
        expect(userSchema.obj.username).toBeDefined();
    });

    test('userSchema should have an email property', () => {
        expect(userSchema.obj.email).toBeDefined();
    });

    test('userSchema should have a password property', () => {
        expect(userSchema.obj.password).toBeDefined();
    });

    test('userSchema should be part of the users collection', () => {
        expect(userSchema.get('collection')).toBe('users');
    });
});
