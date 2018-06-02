// Constants
import { 
    TRY_UPLOAD_FILE, 
    SUCCESS_UPLOAD_FILE, 
    ERROR_UPLOAD_FILE 
} from '../constants';

import { fileUploadAction } from '../api/file';

/**
 * Permet d'uploader un ou plusieurs fichiers
 * 
 * @export
 * @param {Array<File>} file  Fichier à uploader
 * @returns L'action de type UPLOAD_FILES_ACTION et le json de retour ou false si une erreur est déclenché lors de l'appel à l'API
 */
export function uploadFile(file, folderId) {
    return dispatch => {
        dispatch(tryUploadFile(file))
        return fileUploadAction(file, folderId).then(
            response => { 
                return response.json();
            },
            error => { console.log('An error occurred.', error); return false; }
        ).then(
            json => {
                if(json.success === true){
                    dispatch(successUploadFile(json.folder, file.name))
                }else{
                    dispatch(errorUploadFile(json.msg))
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

function errorUploadFile (msg) {
    return {
        type: ERROR_UPLOAD_FILE,
        isUploading : false,
        error: msg
    };
}