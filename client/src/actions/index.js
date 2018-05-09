
//Constants
import { DISPLAY_ACTION } from '../constants/file';

//On exporte toutes nos actions
export * from './storage';
export * from './common';
export * from './user';

/**
 * Load the file and then return it to the reducer, otherwise return an error
 * 
 * @export
 * @param {Object} file 
 * @returns 
 */
export function displayFileAction (file) {
    return {
        type: DISPLAY_ACTION,
        file
    };
}