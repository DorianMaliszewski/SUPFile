import { SERVER_URL, AUTH_TOKEN } from "../constants";

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