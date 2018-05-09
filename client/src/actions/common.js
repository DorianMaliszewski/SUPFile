
// Constants
import { LOGIN_ACTION, REGISTER_ACTION, SERVER_URL } from '../constants';

/**
 * Tente de connecter l'utilisateur via l'api avec l'identifiant et le mot de passe passé en paramètre 
 * 
 * @export
 * @param {String} username  L'identifiant à utilisezr pour la connexion
 * @param {String} password Le mot de passe à utiliser pour la connexion
 * @returns L'action de type LOGIN_ACTION et le json de retour ou false si une erreur est déclenché lors de l'appel à l'API
 */
export function loginAction(username, password) {
    console.log(`Login : pass | ${username} : ${password}`);
    console.log(`${SERVER_URL}/api/users/login`);
    return fetch(`${SERVER_URL}/api/users/login`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username,
                password
            }),
        }
    ).then(
        response => {
            console.log("Response",response)  
            return response.json();
        },
        error => { console.log('An error occurred.', error); return false; }
    ).then(
        json => {
            return {
                type: LOGIN_ACTION,
                json
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
    console.log('User', user);

    //On récupère les propriétés de l'utilisateur
    const { username, password, name } = user;

    return fetch(`${SERVER_URL}/api/users/register`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username,
                password,
                name
            }),
        }
    ).then(
        response => response.json(),
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