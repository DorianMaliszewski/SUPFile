import { REQUEST_STORAGES, SUCCESS_STORAGES, FAILURE_STORAGES } from '../constants/storage';
import { SERVER_URL } from '../constants'

export function fetchAllStorages(token) {
    let config = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization' : token },
    }

    return dispatch => {
        dispatch(requestStorage())
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
                    dispatch(receiveStorage(json));
                }
            })
            .catch(err => console.log("Error: ", err))
    }
}


function requestStorage() {
    return {
        type: REQUEST_STORAGES,
        isFetching: true,
    }
}

function receiveStorage(storages) {
    return {
        type: SUCCESS_STORAGES,
        isFetching: false,
        storages
    }
}

function fetchError(message) {
    return {
        type: FAILURE_STORAGES,
        isFetching: false,
        message
    }
}