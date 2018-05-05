
import { DISPLAY_ACTION } from '../constants/file';

//On exporte toutes nos actions
export * from './storages';
export * from './common';

export const displayFileAction = (file) => {
    return {
        type: DISPLAY_ACTION,
        file
    };
}