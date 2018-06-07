// Constants
import { LOGIN_ACTION, REGISTER_ACTION, AUTH_TOKEN , VALIDATE_TOKEN, OAUTH_SUCCESS} from '../constants';

/**
 * Reducer pour l'objet auth du store
 * 
 * @export
 * @param {any} [state = {}] Le state courant
 * @param {any} action L'action a accomplir
 * @returns Le nouveau state
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
            const { token, user } = action;
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
        case OAUTH_SUCCESS: {
            const { token, user } = action;
            if (token !== null && token !== undefined) {
                window.localStorage.setItem(AUTH_TOKEN, token);
            }
            return {
                token,
                user
            }
        }
        case VALIDATE_TOKEN: {
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
