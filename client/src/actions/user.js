import { 
    REQUEST_USER_DATA, 
    SUCCESS_USER_DATA, 
    FAILURE_USER_DATA 
} from '../constants/';
import { SERVER_URL } from '../constants';

//Models
// import User from '../models/User';

/**
 * Load all data of the current user
 * 
 * @export
 * @param {String} token The token of the user
 * @returns Le résultat du fetch
 */
export function fetchAllDataOfConnectedUser (token) {

    let config = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization' : token },
    }

    return dispatch => {
        dispatch(requestUserData())
        return fetch(`${SERVER_URL}/folder`, config)
            .then(
                response => {
                    console.log(response)
                    response.json().then(json => ({ json, response }))
                },
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

/**
 * Retourne l'action de la tentative de récupération des données utilisateurs
 *
 * @returns L'action de tentative de récupération des données utilisateur
 */
function requestUserData() {
    return {
        type: REQUEST_USER_DATA,
        isFetching: true
    }
}

/**
 * Retourne l'action lors de la réussite de récupération des données utilisateur
 *
 * @param {*} json Le json de retour
 * @returns  L'action en cas de succès
 */
function receiveUserData(json) {
    return {
        type: SUCCESS_USER_DATA,
        isFetching: false,
        storages: json
    }
}

/**
 * Retourne l'action lorsque la tentative de récupération des données utilisateur a échoué
 *
 * @param {*} message
 * @returns L'action en cas d'échec
 */
function fetchError(message) {
    return {
        type: FAILURE_USER_DATA,
        isFetching: false,
        message
    }
}