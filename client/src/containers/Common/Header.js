import React from 'react';
import { Link } from "react-router-dom";

export default class Header extends React.Component  {
    render(){
        return(
<<<<<<< HEAD
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
                        <a className="nav-link dropdown-toggle" href="/" id="dropdown07" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">A propos</a>
                        <div className="dropdown-menu" aria-labelledby="dropdown07">
                            <Link className="dropdown-item" to="/help">Aide</Link>
                            <Link className="dropdown-item" to="/contact">Contact</Link>
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
                        <a className="nav-link dropdown-toggle" href="/" id="dropdown07" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">A propos</a>
                        <div className="dropdown-menu" aria-labelledby="dropdown07">
                            <Link className="dropdown-item" to="/help">Aide</Link>
                            <Link className="dropdown-item" to="/contact">Contact</Link>
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
=======
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

>>>>>>> 440dd0a6af6f125e7136c8536c9177cf91f8acda

    handleLogout () {
        window.localStorage.removeItem('token');
        this.props.history.push('/');
    }
}