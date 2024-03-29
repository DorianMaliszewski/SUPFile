import React from 'react';
import { NavLink } from "react-router-dom";
import { AUTH_TOKEN } from '../constants';

/**
 * Barre de navigation de l'application
 *
 * @export
 * @class Header
 * @extends {React.Component}
 */
export default class Header extends React.Component  {

    /**
     * Retourne l'élement JSX de la barre de navigation
     *
     * @returns
     * @memberof Header
     */
    render(){
        return(
            <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
                <div className="container">
                    <NavLink to="/" className="navbar-brand">SUPFile</NavLink>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    {window.localStorage.getItem(AUTH_TOKEN) ? this.getUserMenu() : this.getGuestMenu()}
                </div>
            </div>
        )
    }

    /**
     * retourne le menu pour les utilisateurs connectés
     *
     * @returns L'élément JSX pour les utilisateurs connectés
     * @memberof Header
     */
    getUserMenu(){
        return(
            <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/">Accueil</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/storages">Stockage</NavLink>
                    </li>
                
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="/" id="dropdown07" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Plus</a>
                        <div className="dropdown-menu" aria-labelledby="dropdown07">
                            <NavLink className="dropdown-item" to="/help">Aide</NavLink>
                            <NavLink className="dropdown-item" to="/contact">Contact</NavLink>
                            <NavLink className="dropdown-item" to="/about">À Propos</NavLink>
                        </div>
                    </li>
                </ul>
                <ul className="nav navbar-nav ml-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/profile">Profil</NavLink>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={e => this.handleLogout()}>Se déconnecter</a>
                    </li>
                </ul>
            </div>
        )
    }

    /**
     * Retourne le menu pour les utilisateurs non connectés
     *
     * @returns L'élément JSX du menu pour les utilisateurs non connectés
     * @memberof Header
     */
    getGuestMenu(){
        return (
            <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/">Introduction</NavLink>
                    </li>
                                
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="/" id="dropdown07" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Plus</a>
                        <div className="dropdown-menu" aria-labelledby="dropdown07">
                            <NavLink className="dropdown-item" to="/help">Aide</NavLink>
                            <NavLink className="dropdown-item" to="/contact">Contact</NavLink>
                            <NavLink className="dropdown-item" to="/about">À Propos</NavLink>
                        </div>
                    </li>
                </ul>
                <ul className="nav navbar-nav ml-auto">
                        <li className="nav-item">
                                <NavLink className="nav-link" to="/login">Se connecter</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/register">S'enregistrer</NavLink>
                        </li>

                </ul>
            </div>
        ) 
    }

    /**
     * Evenement déclenché pour déconnecté l'utilisateur 
     *
     * @memberof Header
     */
    handleLogout () {
        window.localStorage.removeItem(AUTH_TOKEN);
        this.props.history.push('/');
        window.location.reload();
    }
}