import React, { Component } from 'react';
import './About.css';

class AboutPage extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <h1 className="col-lg-12 col-md-12 col-sm-12">À Propos</h1>
                    <div className="card text-white bg-primary col-lg-4">
                        <div className="card-body">
                            <h4 className="card-title">Accès</h4>
                            <p className="card-text">SUPFile est un service de stockage que nous apportons à nos utilisateurs. Dans un monde où nous sommes de plus en plus pressés, où nous avons de moins en moins de temps pour penser aux fichiers à emmener avec nous, SUPFile vous permet d’avoir accès à tous vos documents, photos, vidéos et bien d’autres et ce partout où le réseau le permet.</p>
                        </div>
                    </div>
                    <div className="card text-white bg-primary col-lg-4">
                        <div className="card-body">
                            <h4 className="card-title">Visualisation</h4>
                            <p className="card-text">SUPFile vous permet de visualiser directement le contenu stocké dans votre espace de stockage.</p>
                        </div>
                    </div>
                    <div className="card text-white bg-primary col-lg-4">
                        <div className="card-body">
                            <h4 className="card-title">Sécurité</h4>
                            <p className="card-text">N’ayez plus peur de perdre vos vidéos restées sur la mémoire de la GoPro que vous avez perdue au ski l’hiver dernier, ni même les souvenirs restés sur l’appareil photo qui est tombé dans la piscine cet été, ni même des dossiers chiffrés que contenait cette clé USB qui doit bien être quelque part dans vos poches.</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AboutPage;