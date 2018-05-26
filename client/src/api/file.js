import { SERVER_URL, AUTH_TOKEN } from "../constants";

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