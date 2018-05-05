import { FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAILURE } from '../constants/storage';


export const fetchAllStorages = () => {
    let config = {
        method: 'GET'
    }

    return dispatch => {
        dispatch(requestStorage())
        return fetch('http://localhost:3030/api/storages', config)
            .then(response =>
                response.json().then(storages => ({ storages, response }))
            ).then(({ storages, response }) => {
                if (!response.ok) {
                    dispatch(fetchError(storages.message));
                    return Promise.reject(storages);
                } else {
                    localStorage.setItem('storages', storages);
                    dispatch(receiveStorage(storages));
                }
            }).catch(err => console.log("Error: ", err))
    }
}


function requestStorage() {
    return {
        type: FETCH_REQUEST,
        isFetching: true,
    }
}

function receiveStorage(storages) {
    return {
        type: FETCH_SUCCESS,
        isFetching: false,
        storages
    }
}

function fetchError(message) {
    return {
        type: FETCH_FAILURE,
        isFetching: false,
        message
    }
}