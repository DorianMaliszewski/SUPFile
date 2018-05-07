// Constants
import { FETCH_FAILURE, FETCH_REQUEST, FETCH_SUCCESS } from '../constants/storage';

/**
 * 
 *  
 * @export
 * @param {boolean} [state={ isFetching: false, storages: [] }] 
 * @param {any} action 
 * @returns 
 */
export default function storageReducer(state = { isFetching: false, storages: [] }, action) {
    switch (action.type) {
        case FETCH_REQUEST:
            return [
                {
                    isFetching: true,
                    storages: action.storages
                }
            ]
        case FETCH_SUCCESS:
            return [
                ...action.storages
            ]
        case FETCH_FAILURE:
            return [
                {
                    isFetching: false,
                    errorMessage: action.message
                }
            ]
        default:
            return state
    }
}