import contactEmailTemplate from '@services/support/templates/contact-email';
import { DOMParser } from 'xmldom';

describe('src/services/support/templates/contact-email', () => {
    test('template should be defined', () => {
        expect(contactEmailTemplate).toBeTruthy();
    });

    test('template should be a function', () => {
        expect(typeof contactEmailTemplate).toBe('function');
    });

    const testOptions = {
        name: 'John Doe',
        email: 'jane.doe@johndoehub.com',
        content: 'Hello, this is a test message',
        subject: 'Test Message',
    };

    test('template should return a string', () => {
        expect(typeof contactEmailTemplate(testOptions)).toEqual('string');
    });

    test('template returned string should contain all options', () => {
        const template = contactEmailTemplate(testOptions);
        expect(template).toContain(testOptions.name);
        expect(template).toContain(testOptions.email);
        expect(template).toContain(testOptions.content);
        expect(template).toContain(testOptions.subject);
    });

    test('template returned string should be signed', () => {
        const template = contactEmailTemplate(testOptions);
        expect(template).toContain('Nova Voice Bot');
    });

    test('template returned string should be a valid html', () => {
        const validTags = ['html', 'body', 'div'];

        const template = contactEmailTemplate(testOptions);
        const parser = new DOMParser();
        const document = parser.parseFromString(template);
        expect(validTags.includes(document.documentElement.nodeName)).toBe(true);
    });
});
