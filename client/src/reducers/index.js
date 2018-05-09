import { combineReducers } from 'redux';

//Reducers
import storageReducer from './storage';
import loginReducer from './login';
import userReducer from './user';

//Constants
import { DISPLAY_ACTION } from '../constants/file';

/**
 * Check if the file in the action have a good type and display it to the user
 * Type accepted : Video, Movie or Text files
 * @param {*} state The current state of the application
 * @param {*} action The action to complete
 * @returns The new state if the file have a good type otherwise return the current state
 */
const fileTargeted = function(state = null, action){
    switch(action.type){
        case DISPLAY_ACTION:
            return action.file;
        default:
            return state;
    }
}


export default combineReducers({
    user : userReducer,
    storages: storageReducer,
    auth: loginReducer,
    fileTargeted
});
