/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 26 February 2020
 *
 * Create combined reducer for slices related to auth.
 * Export all actions from all slices.
 */

// External imports
import { combineReducers } from '@reduxjs/toolkit';

// Application's imports
import signUp from './signup';

// Export all actions from all slices
export * from './signup';

// Export combined reducer related to auth
export default combineReducers({
    signUp,
});
