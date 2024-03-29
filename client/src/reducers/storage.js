// Constants
import { FAILURE_STORAGES, REQUEST_STORAGES, SUCCESS_STORAGES, SUCCESS_CREATE_FOLDER, SUCCESS_RENAME_FOLDER, ERROR_RENAME_FOLDER } from '../constants/storage';
import { AUTH_TOKEN, SUCCESS_UPLOAD_FILE, TRY_UPLOAD_FILE } from '../constants';

/**
 * Reducer pour l'objet sotrage du store.
 *  
 * @export
 * @param {boolean} [state={ isFetching: false, storages: [] }] L'état actuel de l'application
 * @param {any} action L'action a éxécuter
 * @returns 
 */
export default function storageReducer(state = { isFetching: false, storages: {}, files: [] }, action) {
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
            window.localStorage.removeItem(AUTH_TOKEN)
            return {
                    errorMessage: action.error,
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
            var storages = state.storages
            let index = storages.findIndex(storage => storage.id === action.folder.id)
            storages.splice(index,1, action.folder)
            return {
                storages
            }
        case ERROR_RENAME_FOLDER:
            return {
                storages: state.storages,
                error: action.error
            }
        case SUCCESS_UPLOAD_FILE:
            let i = state.storages.findIndex(storage => storage.id === action.folder.id)
            state.storages.splice(i,1, action.folder)
            return {
                storages: state.storages
            }
        case TRY_UPLOAD_FILE:
            return {
                storages: state.storages
            }
        default:
            return state
    }
}