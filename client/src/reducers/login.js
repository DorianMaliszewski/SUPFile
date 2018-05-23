// Constants
import { LOGIN_ACTION, REGISTER_ACTION, AUTH_TOKEN } from '../constants';

/**
 * The login's reducer to check user login or register a new user
 * 
 * @export
 * @param {any} [state = {}] The current state
 * @param {any} action The action to complete
 * @returns The new state with the user token otherwise the current state
 */
export default function loginReducer(state = {}, action) {
    switch (action.type) {
        case LOGIN_ACTION: {
            const { token, user, json } = action;
            if (token !== null && token !== undefined) {
                window.localStorage.setItem(AUTH_TOKEN, token);
                return {
                        token,
                        user        
                };
            }else{
                return {
                    errorMessages: json
                }
            }
        }
        case REGISTER_ACTION : {
            const { token, user, json } = action;
            if (token !== null && token !== undefined) {
                window.localStorage.setItem(AUTH_TOKEN, token);
                return {
                        token,
                        user        
                };
            }else{
                return {
                    errorMessages: action.json
                }
            }
        }
        case 'OAUTH_SUCCESS': {
            const { token, user } = action;
            if (token !== null && token !== undefined) {
                window.localStorage.setItem(AUTH_TOKEN, token);
            }
            return {
                token,
                user
            }
        }
        default: {
            return state;
        }
    }
}
