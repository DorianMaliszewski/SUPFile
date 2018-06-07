import { SERVER_URL, AUTH_TOKEN } from "../constants";

/**
 * tente de créer un  nouveau dossier
 *
 * @export
 * @param {String} name Le nom du dossier à créer
 * @param {String} idParent L'id du dossier parent
 * @returns fetch de la requête de création
 */
export function newFolderRequest(name, idParent) {
    return fetch(SERVER_URL + "/folder",
        {
            method: 'POST',
            headers: {
                'Authorization' : 'Baerer ' + window.localStorage.getItem(AUTH_TOKEN),
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                id: idParent,
                name
            })
        })
}

/**
 * Tente de renommer le dossier
 *
 * @export
 * @param {String} id L'id du dossier à renommer)
 * @param {String} name Le nouveau nom du dossier
 * @returns
 */
export function renameFolderRequest (id, name) {
    return fetch(SERVER_URL + "/folder",
        {
            method: 'PUT',
            headers: {
                'Authorization' : 'Baerer ' + window.localStorage.getItem(AUTH_TOKEN),
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                id,
                name
            })
        })
}

/**
 * Tente de supprimer un dossier
 *
 * @export
 * @param {String} id L'id du dossier à supprimer
 * @returns fetch request de la suppresion
 */
export function deleteFolderRequest(id) {
    return fetch(SERVER_URL + "/folder",
    {
        method: 'DELETE',
        headers: {
            'Authorization' : 'Baerer ' + window.localStorage.getItem(AUTH_TOKEN),
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            id
        })
    })
}