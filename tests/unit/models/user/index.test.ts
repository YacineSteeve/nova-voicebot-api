import { User, userSchema } from '@models/user/index';
import { Schema } from 'mongoose';

describe('src/models/user/index', () => {
    describe('User model', () => {
        test('User should be defined and exported', () => {
            expect(User).toBeTruthy();
        });

        test('User should be a function', () => {
            expect(typeof User).toBe('function');
        });

        describe('User model methods', () => {
            test('User should have a "findOne" method', () => {
                expect(User.findOne).toBeTruthy();
            });

            test('User should have a "create" method', () => {
                expect(User.create).toBeTruthy();
            });

            test('User should have a "deleteOne" method', () => {
                expect(User.deleteOne).toBeTruthy();
            });
        });
    });

    describe('userSchema', () => {
        test('userSchema should be exported', () => {
            expect(userSchema).toBeTruthy();
        });

        test('userSchema should be a "Schema"', () => {
            expect(userSchema).toBeInstanceOf(Schema);
        });
    });
});
