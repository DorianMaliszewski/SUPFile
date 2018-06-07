import { REQUEST_STORAGES, SUCCESS_STORAGES, FAILURE_STORAGES, SUCCESS_CREATE_FOLDER, ERROR_CREATE_FOLDER, SUCCESS_RENAME_FOLDER, ERROR_RENAME_FOLDER, SUCESS_DELETE_FOLDER, ERROR_DELETE_FOLDER } from '../constants/storage';
import { SERVER_URL } from '../constants'
import { newFolderRequest, renameFolderRequest, deleteFolderRequest } from '../api/folder';

/**
 * Récupère l'espace de stockage de l'utilisateur
 *
 * @export
 * @param {String} token Token JWT de l'utilisateur connecté
 * @returns
 */
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


/**
 * Retourne l'action lorsqu'on lance la tentative de récupération de l'espqace de stockage
 *
 * @returns L'action lors de la tentative
 */
function requestStorage() {
    return {
        type: REQUEST_STORAGES,
        isFetching: true,
    }
}

/**
 * Retourne l'action lorque la tentative de récupération de l'espace de stockage est un succès
 *
 * @param {Array} storages
 * @returns L'action en cas de succès
 */
function receiveStorage(storages) {
    return {
        type: SUCCESS_STORAGES,
        isFetching: false,
        storages
    }
}

/**
 * Rtourne l'action lorque la tentative de récupération de l'espace de stockage a échoué
 *
 * @param {Array} error Les erreurs rencontrées
 * @returns L'action en cas d'erreur
 */
function fetchError(error) {
    return {
        type: FAILURE_STORAGES,
        isFetching: false,
        error
    }
}

/**
 * Lancer lorqu'on créer un fichier dans le front. Retourne une action en fonction du résultat de l'application
 *
 * @export
 * @param {String} name Nom que l'on veut mettre au dossier
 * @param {String} idParent id du dossier parent
 * @returns L'action du résultat
 */
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

/**
 * Tente de renommer un dossier retourne une action en fonction du résultat de l'opération
 *
 * @export
 * @param {String} id Id du dossier à modifier
 * @param {String} name Nouveau nom du dossier à mettre
 * @returns L'action du résultat
 */
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

/**
 * Tente de supprimer un dossier et retourne l'action en fonction du résultat de l'opération
 *
 * @export
 * @param {String} id Id du dossier à supprimer
 * @returns L'action du résultat de la suppression
 */
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