// Constants
import { UPLOAD_FILES_ACTION, SERVER_URL } from '../constants';

/**
 * Permet d'uploader un ou plusieurs fichiers
 * 
 * @export
 * @param {Array<File>} files  Tableau de fichiers à uploader
 * @returns L'action de type UPLOAD_FILES_ACTION et le json de retour ou false si une erreur est déclenché lors de l'appel à l'API
 */
export function uploadFiles(files) {
    return fetch(`${SERVER_URL}/api/files/upload`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...files
            }),
        }
    ).then(
        response => { 
            return response.json();
        },
        error => { console.log('An error occurred.', error); return false; }
    ).then(
        json => {
            return {
                type: UPLOAD_FILES_ACTION,
                ...json
            };
        }
    );
}