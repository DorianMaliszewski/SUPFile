import { combineReducers } from 'redux';

//Reducers
import storageReducer from './storage';
import loginReducer from './login';
<<<<<<< HEAD
=======
import userReducer from './user';
>>>>>>> 440dd0a6af6f125e7136c8536c9177cf91f8acda

//Constants
import { DISPLAY_ACTION } from '../constants/file';

/**
 * Check if the file in the action have a good type and display it to the user
 * Type accepted : Video, Movie or Text files
 * @param {*} state The current state of the application
 * @param {*} action The action to complete
 * @returns The new state if the file have a good type otherwise return the current state
 */
<<<<<<< HEAD
const fileTargeted = function(state = null, action){
=======
const fileToDisplay = function(state = null, action){
>>>>>>> 440dd0a6af6f125e7136c8536c9177cf91f8acda
    switch(action.type){
        case DISPLAY_ACTION:
            return action.file;
        default:
            return state;
    }
}


export default combineReducers({
    storages: storageReducer,
<<<<<<< HEAD
    auth: loginReducer,
    fileTargeted
=======
    login: loginReducer,
    fileToDisplay
>>>>>>> 440dd0a6af6f125e7136c8536c9177cf91f8acda
});
