// Constants
import { LOGIN_ACTION, REGISTER_ACTION, SERVER_URL, AUTH_TOKEN, VALIDATE_TOKEN } from '../constants';

/**
 * Tente de connecter l'utilisateur via l'api avec l'identifiant et le mot de passe passé en paramètre 
 * 
 * @export
 * @param {String} email  L'identifiant à utilisezr pour la connexion
 * @param {String} password Le mot de passe à utiliser pour la connexion
 * @returns L'action de type LOGIN_ACTION et le json de retour ou false si une erreur est déclenché lors de l'appel à l'API
 */
export function loginAction(email, password) {
    return fetch(SERVER_URL + "/login",
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                password
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
                type: LOGIN_ACTION,
                ...json
            };
        }
    );
}

/**
 * Retourne l'action après avoir tenter d'enregistrer un nouvel utilisateur sur l'api
 * POST : /api/users/register
 * 
 * @export
 * @param {User} user L'utilisateur de type User à enregistrer
 * @returns L'action avec le type REGISTER_ACTION et le json de retour ou false si une erreur est déclenché lors de l'appel à l'API
 */
export function registerAction(user) {

    //On récupère les propriétés de l'utilisateur
    const { email, password, name } = user;

    return fetch(`${SERVER_URL}/signup`,
        {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                password,
                name
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
                type: REGISTER_ACTION,
                json
            };
        }
    );
}

export function facebookRegisterAction(user) {
    console.log('User', user);

    //On récupère les propriétés de l'utilisateur
    const { email, password, name } = user;

    return fetch(`${SERVER_URL}/signup`,
        {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                password,
                name
            }),
        }
    ).then(
        response => {
            response.json()
        },
        error => { console.log('An error occurred.', error); return false; }
    ).then(
        json => {
            return {
                type: REGISTER_ACTION,
                json
            };
        }
    );
}


export function validateToken () {
    return fetch(`${SERVER_URL}/validateToken`,
        {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer '+ window.localStorage.getItem(AUTH_TOKEN) },
        }
    ).then(
        response => { 
            return response.json();
        },
        error => { console.log('An error occurred.', error); return false; }
    ).then(
        json => {
            return {
                type: VALIDATE_TOKEN,
                ...json
            };
        }
    );
}
