import React, { Component } from 'react';

/**
 * Page d'aide
 *
 * @class HelpPage
 * @extends {Component}
 */
class HelpPage extends Component {
    /**
     * Retourne l'élément JSX de la page
     *
     * @returns
     * @memberof HelpPage
     */
    render() {
        return (
            <div className="container">
                <h1>Aide</h1>
                <p>comment on s'en sert</p>
            </div>
        );
    }
}

export default HelpPage;