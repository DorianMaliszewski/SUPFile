import { SERVER_URL, AUTH_TOKEN } from "../constants";

/**
 * Tente d'uploader un fichier
 *
 * @export
 * @param {File} file le fichier à uploader
 * @param {String} folderId le dossier dans lequel va se trouver le fichier
 * @returns fetch de la requête
 */
export function fileUploadAction(file, folderId) {
    var data = new FormData()
    data.append('sampleFile',  file)
    data.append('id', folderId)
    data.append('size', file.size)
    return fetch(SERVER_URL + "/file",
        {
            method: 'POST',
            headers: {
                'Authorization' : 'Baerer ' + window.localStorage.getItem(AUTH_TOKEN)
            },
            body: data
        })
}

/**
 * Tente de renommer un fichier
 *
 * @export
 * @param {String} id l'id du fichier a renommer
 * @param {String} name le nouveau nom du fichier
 * @returns fetch de la requête
 */
export function renameFileRequest (id, name) {
    return fetch(SERVER_URL + "/file",
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
 * Tente de supprimer un fichier
 *
 * @export
 * @param {String} id l'id du fichier à supprimer
 * @returns fetch de la requête
 */
export function deleteFileRequest(id) {
    return fetch(SERVER_URL + "/file",
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