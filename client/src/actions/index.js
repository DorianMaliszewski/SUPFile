
//Constants
import { DISPLAY_ACTION } from '../constants/file';

//On exporte toutes nos actions
export * from './storage';
export * from './user';
export * from './auth';
export * from './oauth';
export * from './file'
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