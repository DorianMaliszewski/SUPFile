import { FILTER_ACTION, SHOW_ALL_FILTER } from '../constants/index';

<<<<<<< HEAD
/**
 * The reducer for the storages
 * @param {Object} state 
 * @param {Object} action 
 */
=======
>>>>>>> 440dd0a6af6f125e7136c8536c9177cf91f8acda
export default function storageReducer(state = {date: null, type: SHOW_ALL_FILTER}, action) {
    switch (action.type) {
        case FILTER_ACTION: {
            return {
                type : action.filter,
                date: action.date
            };
        }
        default: {
            return state;
        }
    }
}