// Constants
import { LOGIN_ACTION, REGISTER_ACTION } from '../constants/index';

/**
 * The login's reducer to check user login or register a new user
 * 
 * @export
<<<<<<< HEAD
 * @param {any} [state = {}] The current state
=======
 * @param {any} [state={}] The current state
>>>>>>> 440dd0a6af6f125e7136c8536c9177cf91f8acda
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
