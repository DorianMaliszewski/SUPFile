import React from 'react';
import { Link } from "react-router-dom";

export default class Header extends React.Component  {
    render(){
        return(
            <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
                <div className="container">
                    <Link to="/" className="navbar-brand">SUPFile</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    {window.localStorage.getItem('token') ? this.getUserMenu() : this.getGuestMenu()}
                </div>
            </div>
        )
    }

    getUserMenu(){
        return(
            <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Accueil</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/storages">Stockage</Link>
                    </li>
                
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="/" id="dropdown07" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Plus</a>
                        <div className="dropdown-menu" aria-labelledby="dropdown07">
                            <Link className="dropdown-item" to="/help">Aide</Link>
                            <Link className="dropdown-item" to="/contact">Contact</Link>
                            <Link className="dropdown-item" to="/about">À Propos</Link>
                        </div>
                    </li>
                </ul>
                <ul className="nav navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/profile">Profil</Link>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={e => this.handleLogout()}>Se déconnecter</a>
                    </li>
                </ul>
            </div>
        )
    }

    getGuestMenu(){
        return (
            <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Introduction</Link>
                    </li>
                                
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="/" id="dropdown07" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Plus</a>
                        <div className="dropdown-menu" aria-labelledby="dropdown07">
                            <Link className="dropdown-item" to="/help">Aide</Link>
                            <Link className="dropdown-item" to="/contact">Contact</Link>
                            <Link className="dropdown-item" to="/about">À Propos</Link>
                        </div>
                    </li>
                </ul>
                <ul className="nav navbar-nav ml-auto">
                        <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                        </li>
                </ul>
            </div>
        ) 
    }

    handleLogout () {
        window.localStorage.removeItem('token');
        this.props.history.push('/');
    }
}