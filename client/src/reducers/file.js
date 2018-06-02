// Constants
import { FETCH_FAILURE, FETCH_REQUEST, FETCH_SUCCESS, SUCCESS_UPLOAD_FILE, TRY_UPLOAD_FILE, ERROR_UPLOAD_FILE } from '../constants/file';

/**
 * The file's reducer that complete the action and return the new state
 * 
 * @export
 * @param {Object} [state={ isFetching: false, storages: [] }]  the current state
 * @param {Object} action the action to complete
 * @returns The new state
 */
export default function fileReducer(state = [] , action) {
    switch (action.type) {
        case SUCCESS_UPLOAD_FILE:
            
            return  state.map(file => {
                if (file.name === action.fileName) {
                    file.isLoading = false
                }
                return false
            })
        case TRY_UPLOAD_FILE:
            state.push({...action.file, isLoading:true})
            return state
        case ERROR_UPLOAD_FILE:
            return [
                ...state
            ]
        default:
            return state
    }
}