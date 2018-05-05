import { FILTER_ACTION, SHOW_ALL_FILTER } from '../constants/index';

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