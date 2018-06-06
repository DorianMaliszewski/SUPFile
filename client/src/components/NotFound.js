import React, { Component } from 'react';

/**
 * Page que l'on peut utiliser si l'utilisateur veut accéder à une page qui n'existe pas.
 * Une redirection vers la page d'accueil est mise en place
 *
 * @class NotFound
 * @extends {Component}
 */
class NotFound extends Component {
    /**
     * Retourne l'élément JSX de la page
     *
     * @returns
     * @memberof NotFound
     */
    render() {
        return (
            <div clasName="container">
                La page n'existe pas
            </div>
        );
    }
}

export default NotFound;