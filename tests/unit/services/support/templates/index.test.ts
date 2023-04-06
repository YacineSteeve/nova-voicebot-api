import * as templates from '@services/support/templates/index';

describe('src/services/support/templates/index', () => {
    test('should be defined', () => {
        expect(templates).toBeTruthy();
    });

    const templateNames = ['contactEmailTemplate'];

    test('should have all templates', () => {
        Object.values(templates).forEach((template) => {
            expect(templateNames).toContain(template.name);
        });
    });

    test('should have all valid templates', () => {
        Object.values(templates).forEach((template) => {
            expect(typeof template).toBe('function');
        });
    });
});
