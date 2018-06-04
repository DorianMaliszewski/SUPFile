import { REQUEST_STORAGES, SUCCESS_STORAGES, FAILURE_STORAGES, SUCCESS_CREATE_FOLDER, ERROR_CREATE_FOLDER, SUCCESS_RENAME_FOLDER, ERROR_RENAME_FOLDER, SUCESS_DELETE_FOLDER, ERROR_DELETE_FOLDER } from '../constants/storage';
import { SERVER_URL } from '../constants'
import { newFolderRequest, renameFolderRequest, deleteFolderRequest } from '../api/folder';

export function fetchAllStorages(token) {
    let config = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization' : 'Bearer '+ token },
    }

    return dispatch => {
        dispatch(requestStorage())
        return fetch(`${SERVER_URL}/folder/`, config)
            .then(
                response => response.json(),
                error => console.error("Une erreur est survenue lors du parse JSON", error)
            ).catch(
                error => dispatch(fetchError(error.message))
            )
            .then( json => {
                if (!json.folders) {
                    dispatch(fetchError(json.error))
                } else {
                    dispatch(receiveStorage(json.folders))
                }
            })
            .catch(err =>  dispatch(fetchError(err.message)))
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

function fetchError(error) {
    return {
        type: FAILURE_STORAGES,
        isFetching: false,
        error
    }
}


export function newFolder(name, idParent) {
        return newFolderRequest(name, idParent).then(
            response => { 
                return response.json();
            },
            error => { console.log('An error occurred.', error); return false; }
        ).then(
            json => {
                if(json.success === true){
                    return {
                        type: SUCCESS_CREATE_FOLDER,
                        folder: json.folder
                    }
                }else{
                    return {
                        type: ERROR_CREATE_FOLDER,
                        error: json.msg
                    }
                }
            }
        )
}

export function renameFolder(id, name) {
    return renameFolderRequest(id, name).then(
        response => {
            return response.json()
        },
        error => console.log(error)
    ).then(
        data => {
            if(data.success === true){
                return {
                    type: SUCCESS_RENAME_FOLDER,
                    folder: data.folder
                }
            }else{
                return {
                    type: ERROR_RENAME_FOLDER,
                    error: data.msg
                }
            }
        }
    )
}

export function deleteFolder (id) {
    return deleteFolderRequest(id).then(
        response => response.json(),
        err => console.log(err)
    ).then(
        data => {
            if (data.success === true) {
                return {
                    type: SUCESS_DELETE_FOLDER,
                    id
                }
            } else {
                return {
                    type: ERROR_DELETE_FOLDER,
                    id,
                    error: data.msg
                }
            }
        }
    )
}