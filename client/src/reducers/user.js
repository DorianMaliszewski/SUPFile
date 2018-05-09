// Constants
import { 
    REQUEST_USER_DATA, 
    SUCCESS_USER_DATA, 
    FAILURE_USER_DATA 
} from '../constants/user';

/**
 * 
 *  
 * @export
 * @param {boolean} [state={ isFetching: false, storages: [] }] 
 * @param {any} action 
 * @returns 
 */
export default function userReducer(state = { isFetching: false, storages: [] }, action) {
    switch (action.type) {
        case REQUEST_USER_DATA:
            return {
                    isFetching: true,
                    storages: action.storages
            };
        case SUCCESS_USER_DATA:
            return {
                    isFetching: false,
                    user: action.user,
                    storages : [...action.storages]
            }
        case FAILURE_USER_DATA:
            return {
                    isFetching: false,
                    errorMessage: action.message
            }
        default:
            return state
    }
}