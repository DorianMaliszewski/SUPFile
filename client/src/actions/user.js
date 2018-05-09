import { 
    REQUEST_USER_DATA, 
    SUCCESS_USER_DATA, 
    FAILURE_USER_DATA 
} from '../constants/user';
import { SERVER_URL } from '../constants';

//Models
import User from '../models/User';

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
        headers: { 'Content-Type': 'application/json', 'Authorization' : token },
    }

    return dispatch => {
        dispatch(requestUserData())
        return fetch(`${SERVER_URL}/api/user`, config)
            .then(
                response => response.json().then(json => ({ json, response })),
                error => console.error("Une erreur est survenue lors du parse JSON", error)
            ).catch(
                error => console.log("Error : ",error)
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

function receiveUserData(json) {
    console.log("JSON", json);
    return {
        type: SUCCESS_USER_DATA,
        isFetching: false,
        user: new User(json.user.email, json.user.password, json.user.name),
        storages: json.user.folders
    }
}

function fetchError(message) {
    return {
        type: FAILURE_USER_DATA,
        isFetching: false,
        message
    }
}