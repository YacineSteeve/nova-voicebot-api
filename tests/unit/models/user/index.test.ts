import { User, userSchema } from '@models/user/index';
import { Schema } from 'mongoose';

describe('src/models/user/index', () => {
    describe('User model', () => {
        test('User should be defined', () => {
            expect(User).toBeDefined();
        });

        test('User should be a function', () => {
            expect(typeof User).toBe('function');
        });

        describe('User model methods', () => {
            test('User should have a "findOne" method', () => {
                expect(User.findOne).toBeDefined();
            });

            test('User should have a "create" method', () => {
                expect(User.create).toBeDefined();
            });

            test('User should have a "deleteOne" method', () => {
                expect(User.deleteOne).toBeDefined();
            });
        });
    });

    describe('userSchema', () => {
        test('userSchema should be defined', () => {
            expect(userSchema).toBeDefined();
        });

        test('userSchema should be a "Schema"', () => {
            expect(userSchema).toBeInstanceOf(Schema);
        });
    });
});
