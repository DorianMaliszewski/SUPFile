import url from 'url';
import qs from 'querystring'
import { OAUTH_FAILURE, OAUTH_SUCCESS } from '../constants';

/**
 * Permet la connexion avec facebook, ouvre un popup
 *
 * @export
 * @returns
 */
export function facebookLogin() {
  const facebook = {
    url: 'http://localhost:1337/auth/facebook',
    clientId: '354086235112985',
    redirectUri: 'http://localhost:3000/loading',
    authorizationUrl: 'https://www.facebook.com/v2.5/dialog/oauth',
    scope: 'public_profile,email',
    width: 580,
    height: 400
  };

  return (dispatch) => {
    oauth2(facebook, dispatch)
      .then(openPopup)
      .then(pollPopup)
      .then(exchangeCodeForToken)
      .then(signIn)
      .then(closePopup)
  };
}

/**
 * Permet la connexion avec Google. Ouvre un popup
 *
 * @export
 * @returns
 */
export function googleLogin() {
  const google = {
    url: 'http://localhost:1337/auth/google',
    clientId: '449962804508-p3dape0sp7jc7q6o2h9kr0ccj3r78djo.apps.googleusercontent.com',
    redirectUri: 'http://localhost:3000/loading/',
    authorizationUrl: 'https://accounts.google.com/o/oauth2/auth',
    scope: 'openid profile email',
    width: 452,
    height: 633
  };

  return (dispatch) => {
    oauth2(google, dispatch)
      .then(openPopup)
      .then(pollPopup)
      .then(exchangeCodeForToken)
      .then(signIn)
      .then(closePopup);
  };
}

/**
 * Créer les params et la requête pour récupérer le token oauth
 *
 * @param {*} config
 * @param {*} dispatch
 * @returns
 */
function oauth2(config, dispatch) {
  return new Promise((resolve, reject) => {
    const params = {
      client_id: config.clientId,
      redirect_uri: config.redirectUri,
      scope: config.scope,
      display: 'popup',
      response_type: 'code'
    };
    const url = config.authorizationUrl + '?' + qs.stringify(params);
    resolve({ url: url, config: config, dispatch: dispatch });
  });
}

/**
 * Ouvre un popup pour s'authentifier
 *
 * @param {*} { url, config, dispatch }
 * @returns
 */
function openPopup({ url, config, dispatch }) {
  return new Promise((resolve, reject) => {
    const width = config.width || 500;
    const height = config.height || 500;
    const options = {
      width: width,
      height: height,
      top: window.screenY + ((window.outerHeight - height) / 2.5),
      left: window.screenX + ((window.outerWidth - width) / 2)
    };
    const popup = window.open(url, '_blank', qs.stringify(options, ','));

    if (url === 'about:blank') {
      popup.document.body.innerHTML = 'Loading...';
    }

    resolve({ window: popup, config: config, dispatch: dispatch });
  });
}

/**
 * Créer la requête pour le système d'authentification
 *
 * @param {*} { window, config, requestToken, dispatch }
 * @returns
 */
function pollPopup({ window, config, requestToken, dispatch }) {
  return new Promise((resolve, reject) => {
    const redirectUri = url.parse(config.redirectUri);
    const redirectUriPath = redirectUri.host + redirectUri.pathname;

    if (requestToken) {
      window.location = config.authorizationUrl + '?' + qs.stringify(requestToken);
    }

    const polling = setInterval(() => {
      if (!window || window.closed) {
        clearInterval(polling);
      }
      try {
        const popupUrlPath = window.location.host + window.location.pathname;
        if (popupUrlPath === redirectUriPath) {
          if (window.location.search || window.location.hash) {
            const query = qs.parse(window.location.search.substring(1).replace(/\/$/, ''));
            const hash = qs.parse(window.location.hash.substring(1).replace(/[/$]/, ''));
            const params = Object.assign({}, query, hash);

            if (params.error) {
              dispatch({
                type: OAUTH_FAILURE,
                messages: [{ msg: params.error }]
              });
            } else {
              resolve({ oauthData: params, config: config, window: window, interval: polling, dispatch: dispatch });
            }
          } else {
            dispatch({
              type: OAUTH_FAILURE,
              messages: [{ msg: 'OAuth redirect has occurred but no query or hash parameters were found.' }]
            });
          }
        }
      } catch (error) {
        console.log(error)
      }
    }, 500);
  });
}

/**
 * Permet de récupérer le Token du système d'authentification
 *
 * @param {*} { oauthData, config, window, interval, dispatch }
 * @returns
 */
function exchangeCodeForToken({ oauthData, config, window, interval, dispatch }) {
  return new Promise((resolve, reject) => {
    const data = Object.assign({}, oauthData, config);

    return fetch(config.url, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin', // By default, fetch won't send any cookies to the server
      body: JSON.stringify(data)
    }).then((response) => {
      if (response.ok) {
        return response.json().then((json) => {
          resolve({ token: json.token, user: json.user, window: window, interval: interval, dispatch: dispatch });
        });
      } else {
        return response.json().then((json) => {
          dispatch({
            type: OAUTH_FAILURE,
            messages: Array.isArray(json) ? json : [json]
          });
          closePopup({ window: window, interval: interval });
        });
      }
    });
  });
}

/**
 * Renvoi le token au serveur en cas de succès
 *
 * @param {*} { token, user, window, interval, dispatch }
 * @returns
 */
function signIn({ token, user, window, interval, dispatch }) {
  return new Promise((resolve, reject) => {
    dispatch({
      type: OAUTH_SUCCESS,
      token: token,
      user: user
    });
    resolve({ window: window, interval: interval });
  });

}

/**
 * Ferme le popup
 *
 * @param {*} { window, interval }
 * @returns
 */
function closePopup({ window, interval }) {
  return new Promise((resolve, reject) => {
    clearInterval(interval);
    window.close();
    resolve();
  });
}

