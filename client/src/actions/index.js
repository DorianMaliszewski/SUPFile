
//Constants
import { DISPLAY_ACTION } from '../constants/file';
import { 
    REQUEST_USER_DATA, 
    SUCCESS_USER_DATA, 
    FAILURE_USER_DATA 
} from '../constants/index';

//Models
import User from '../models/User';

//On exporte toutes nos actions
export * from './storage';
export * from './common';

/**
 * Load the file and then return it to the reducer, otherwise return an error
 * 
 * @export
 * @param {Object} file 
 * @returns 
 */
export function displayFileAction (file) {
    return {
        type: DISPLAY_ACTION,
        file
    };
}

/**
 * Load all data of the current user
 * 
 * @export
 * @param {String} token The token of the user
 * @returns {String|User|}
 */
export function fetchAllDataOfConnectedUser (token) {

    let config = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({token}),
    }

    return dispatch => {
        dispatch(requestUserData())
        return fetch('http://localhost:3030/api/user', config)
            .then(response =>
                response.json().then(json => ({ json, response }))
            )
            .then(({ json, response }) => {
                if (!response.ok) {
                    dispatch(fetchError(json.message));
                    return Promise.reject(json);
                } else {
                    dispatch(receiveUserData(json));
                }
            })
            .catch(err => console.log("Error: ", err))
    }
}


function requestUserData() {
    return {
        type: REQUEST_USER_DATA,
        isFetching: true
    }
}

function receiveUserData(jsonUser) {

    return {
        type: SUCCESS_USER_DATA,
        isFetching: false,
        user: new User(jsonUser.username, jsonUser.password, jsonUser.name)
    }
}

function fetchError(message) {
    return {
        type: FAILURE_USER_DATA,
        isFetching: false,
        message
    }
}