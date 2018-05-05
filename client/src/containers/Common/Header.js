import React from 'react';
import { Link } from "react-router-dom";

export default class Header extends React.Component  {
    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <a className="navbar-brand" href="/">SUPFile</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample07" aria-controls="navbarsExample07" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarsExample07">
                        <ul className="navbar-nav mr-auto">
                            {window.localStorage.getItem('token') ? (
                                <section>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/">Accueil</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/storages">Stockage</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/profile">Profil</Link>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" onClick={e => this.handleLogout()}>Se déconnecter</a>
                                    </li>
                                </section>
                            ) : (
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">Login</Link>
                                    </li>
                            )}
                            
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="/" id="dropdown07" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">A propos</a>
                                <div className="dropdown-menu" aria-labelledby="dropdown07">
                                    <Link className="dropdown-item" to="/help">Aide</Link>
                                    <Link className="dropdown-item" to="/contact">Contact</Link>
                                </div>
                            </li>
                        </ul>
                        <form className="form-inline my-2 my-md-0">
                            <input className="form-control" placeholder="Rechercher dans vos fichiers" aria-label="Rechercher" type="text"/>
                        </form>
                    </div>
                </div>
            </nav>
        )
    }


    handleLogout () {
        window.localStorage.removeItem('token');
        this.props.history.push('/');
    }
}