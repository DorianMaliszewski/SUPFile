import React, { Component } from 'react';
import './IntroPage.css';

class IntroPage extends Component {
    render() {
        return (
            <div className="container">
                <div className="page-header" id="banner">
                    <div className="row">
                        <div className="col-lg-8 col-md-7 col-sm-6">
                            <h1>Voici SUPFile</h1>
                            <p className="lead">Stocker et Partager vos fichiers</p>
                        </div>
                        <div className="col-lg-4 col-md-5 col-sm-6">
                            <div className="sponsor">
                            <script async="" type="text/javascript" src="//cdn.carbonads.com/carbon.js?zoneid=1673&amp;serve=C6AILKT&amp;placement=bootswatchcom" id="_carbonads_js"></script>
                            </div>
                        </div>
                        <div className="affichageIntro">
                            <div className="partieAffichageIntro">
                                <h2>Votre cloud de qualité</h2>
                                <img alt="Accueil 1" className="tailleImg" src="/nuage.png"/>
                                <p>
                                    Choissisez un cloud de qualité avec SupFile.
                                    Votre cloud vous permet de toujours avoir vos fichier avec vous.
                                </p>
                            </div>
                            <div className="partieAffichageIntro reverse">
                                <h2>Des serveurs puissants et performants</h2>
                                <img alt="Accueil 2" className="tailleImg" src="https://upload.wikimedia.org/wikipedia/commons/6/67/Inside_Suite.jpg" />
                                <p>
                                    Choissisez un cloud de qualité avec SupFile.
                                    Votre cloud vous permet de toujours avoir vos fichier avec vous.
                                </p>
                            </div>
                            <div className="partieAffichageIntro">
                                <h2>Votre cloud de qualité</h2>
                                <img alt="Accueil 3" className="tailleImg" src="https://upload.wikimedia.org/wikipedia/commons/9/9e/Samsung_Galaxy_Note_5%2C_S6_edge%2B_and_Note_7_20161010b.jpg" />
                                <p>
                                    Choissisez un cloud de qualité avec SupFile.
                                    Votre cloud vous permet de toujours avoir vos fichier avec vous.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default IntroPage;