// Constants
import { FAILURE_STORAGES, REQUEST_STORAGES, SUCCESS_STORAGES } from '../constants/storage';

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
        case REQUEST_STORAGES:
            return {
                isFetching: true,
                storages: state.storages
            }
        case SUCCESS_STORAGES:
            return {
                isFetching: false,
                storages : action.storages.folders
            }
        case FAILURE_STORAGES:
            return {
                    isFetching: false,
                    errorMessage: action.message,
                    storages: state.storages.folders
            }
        default:
            return state
    }
}