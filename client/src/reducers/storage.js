// Constants
import { FAILURE_STORAGES, REQUEST_STORAGES, SUCCESS_STORAGES, SUCCESS_CREATE_FOLDER, SUCCESS_RENAME_FOLDER, ERROR_RENAME_FOLDER } from '../constants/storage';

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
                storages : action.storages
            }
        case FAILURE_STORAGES:
            return {
                    errorMessage: action.message,
                    storages: state.storages
            }
        case SUCCESS_CREATE_FOLDER:
            return {
                storages: [
                    ...state.storages,
                    action.folder
                ]
            }
        case SUCCESS_RENAME_FOLDER:
            const storages = state.storages
            const index = storages.findIndex(storage => storage.id === action.folder.id)
            storages.splice(index,1, action.folder)
            return {
                storages
            }
        case ERROR_RENAME_FOLDER:
            return {
                storages: state.storages,
                error: action.error
            }
        default:
            return state
    }
}