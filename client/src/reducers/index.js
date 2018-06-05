import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

//Reducers
import storageReducer from './storage';
import loginReducer from './login';
import fileReducer from './file'

//Constants


export default combineReducers({
    storages: storageReducer,
    auth: loginReducer,
    files: fileReducer,
    router: routerReducer
});
