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
        };

        expect(verifySignUpCredentials(input)).toEqual(expected);
    });
});
