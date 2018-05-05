// Constants
import { LOGIN_ACTION, REGISTER_ACTION } from '../constants/index';

/**
 * The login's reducer to check user login or register a new user
 * 
 * @export
 * @param {any} [state={}] The current state
 * @param {any} action The action to complete
 * @returns The new state with the user token otherwise the current state
 */
export default function loginReducer(state = {}, action) {
    switch (action.type) {
        case LOGIN_ACTION: {
            const { token, rep } = action.json;
            return {
                    token,
                    rep        
            };
        }
        case REGISTER_ACTION : {
            const { token, rep } = action.json;
            return {
                token,
                rep
            }
        }
        default: {
            return state;
        }
    }
}
