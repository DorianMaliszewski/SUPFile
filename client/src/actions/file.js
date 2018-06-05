// Constants
import { 
    TRY_UPLOAD_FILE, 
    SUCCESS_UPLOAD_FILE, 
    ERROR_UPLOAD_FILE, 
    ERROR_DELETE_FILE,
    SUCESS_DELETE_FILE,
    SUCCESS_RENAME_FILE,
    ERROR_RENAME_FILE
} from '../constants';

import { fileUploadAction, renameFileRequest, deleteFileRequest } from '../api/file';

/**
 * Permet d'uploader un ou plusieurs fichiers
 * 
 * @export
 * @param {Array<File>} file  Fichier à uploader
 * @returns L'action de type UPLOAD_FILES_ACTION et le json de retour ou false si une erreur est déclenché lors de l'appel à l'API
 */
export function uploadFile(file, FileId) {
    return dispatch => {
        dispatch(tryUploadFile(file))
        return fileUploadAction(file, FileId).then(
            response => { 
                return response.json();
            },
            error => { console.log('An error occurred.', error); dispatch(errorUploadFile(error.message, file.name)) }
        ).then(
            json => {
                if(json.success === true){
                    dispatch(successUploadFile(json.folder, file.name))
                }else{
                    dispatch(errorUploadFile(json.error, file.name))
                }
            }
        );
    }
}

function tryUploadFile(file) {  
    return {
        type: TRY_UPLOAD_FILE,
        isUploading: true,
        fileName : file.name
    }
}

function successUploadFile(folder, fileName) {
    return {
        type: SUCCESS_UPLOAD_FILE,
        isUploading : false,
        folder,
        fileName
    };
}

function errorUploadFile (error, fileName) {
    return {
        type: ERROR_UPLOAD_FILE,
        isUploading : false,
        error,
        fileName
    };
}

export function renameFile(id, name) {
    return renameFileRequest(id, name).then(
        response => {
            return response.json()
        },
        error => console.log(error)
    ).then(
        data => {
            if(data.success === true){
                return {
                    type: SUCCESS_RENAME_FILE,
                    file: data.file
                }
            }else{
                return {
                    type: ERROR_RENAME_FILE,
                    error: data.msg
                }
            }
        }
    )
}

export function deleteFile (id) {
    return deleteFileRequest(id).then(
        response => response.json(),
        err => console.log(err)
    ).then(
        data => {
            if (data.success === true) {
                return {
                    type: SUCESS_DELETE_FILE,
                    id
                }
            } else {
                return {
                    type: ERROR_DELETE_FILE,
                    id,
                    error: data.msg
                }
            }
        }
    )
}