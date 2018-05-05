// Constants
import { FETCH_FAILURE, FETCH_REQUEST, FETCH_SUCCESS } from '../constants/file';

/**
 * The file's reducer that complete the action and return the new state
 * 
 * @export
 * @param {boolean} [state={ isFetching: false, files: [] }]  the current state
 * @param {any} action the action to complete
 * @returns The new state
 */
export default function fileReducer(state = { isFetching: false, files: [] }, action) {
    switch (action.type) {
        case FETCH_REQUEST:
            return [
                {
                    isFetching: true,
                    files: action.files
                }
            ]
        case FETCH_SUCCESS:
            return [
                ...action.files
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