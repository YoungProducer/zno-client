/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 26 February 2020
 *
 * Create tests suites for credentials verifying functions.
 */

// Application's imports
import { verifySignUpCredentials } from '../verify-credentials';
import { IFetchSignUpActionCredentials } from 'store/actionCreators/auth/signup';

describe('Verify signUp credentials', () => {
    test('Verify if email patter is invalid', () => {
        // Define input value
        const input: IFetchSignUpActionCredentials = {
            email: 'foo',
            password: 'barbarbar',
            confPassword: 'barbarbar',
        };

        // Define expected value
        const expected = {
            invalidFields: ['email'],
            fieldsMessages: {
                email: 'Неправильний шаблон',
            },
        };

        expect(verifySignUpCredentials(input)).toEqual(expected);
    });

    test('Verify if password length are less than 8', () => {
        // Define input value
        const input: IFetchSignUpActionCredentials = {
            email: 'foo@gmail.com',
            password: 'bar',
            confPassword: 'bar',
        };

        // Define expected value
        const expected = {
            invalidFields: ['password'],
            fieldsMessages: {
                password: 'Занад-то короткий пароль',
            },
        };

        expect(verifySignUpCredentials(input)).toEqual(expected);
    });

    test('Verify if password are not the same', () => {
        // Define input value
        const input: IFetchSignUpActionCredentials = {
            email: 'foo@gmail.com',
            password: 'barbarbar',
            confPassword: 'bar',
        };

        // Define expected value
        const expected = {
            invalidFields: ['confPassword'],
            fieldsMessages: {
                confPassword: 'Паролі відрізняються',
            },
        };

        expect(verifySignUpCredentials(input)).toEqual(expected);
    });

    test('Verify if password length is less than 8 and email patter is invalid', () => {
        // Define input value
        const input: IFetchSignUpActionCredentials = {
            email: 'foo',
            password: 'bar',
            confPassword: 'bar',
        };

        // Define expected value
        const expected = {
            invalidFields: ['email', 'password'],
            fieldsMessages: {
                email: 'Неправильний шаблон',
                password: 'Занад-то короткий пароль',
            },
        };

        expect(verifySignUpCredentials(input)).toEqual(expected);
    });

    test('Verify if email is invalid and passwords are different', () => {
        // Define input value
        const input: IFetchSignUpActionCredentials = {
            email: 'foo',
            password: 'barbarbar',
            confPassword: 'barbarbarr',
        };

        // Define expected value
        const expected = {
            invalidFields: ['email', 'confPassword'],
            fieldsMessages: {
                email: 'Неправильний шаблон',
                confPassword: 'Паролі відрізняються',
            },
        };

        expect(verifySignUpCredentials(input)).toEqual(expected);
    });

    test('Verify if all fields filled correctly', () => {
        // Define input valie
        const input: IFetchSignUpActionCredentials = {
            email: 'foo@gmail.com',
            password: 'barbarbar',
            confPassword: 'barbarbar',
        };

        // Check is function returns null
        expect(verifySignUpCredentials(input)).toEqual(null);
    });
});
