/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 26 February 2020
 *
 * Create function which verify credentials for signIn and signUp.
 */

// External imports
import isemail from 'isemail';

// Application's imports
import { IFetchSignUpActionCredentials } from 'store/actionCreators/auth/signup';

export const verifySignUpCredentials = (credentials: IFetchSignUpActionCredentials) => {
    const { email, password, confPassword } = credentials;

    const invalidFields: string[] = [];

    // Check is email has right pattern
    if (!isemail.validate(email)) {
        invalidFields.push('email');
    }

    // Check is length of password not smaller then 8
    if (password.length < 8) {
        invalidFields.push('password');
    }

    // Check is passwords are the same
    if (password !== confPassword) {
        invalidFields.push('confPassword');
    }

    return { invalidFields };
};
