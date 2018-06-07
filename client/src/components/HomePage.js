import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import Loader from '../containers/Loader';
import StorageCard from '../containers/StorageCard';

/**
 * Page d'accueil pour les utilisateurs connectés
 * 
 * @class Home
 * @extends {React.Component}
 */
class Home extends React.Component {

    /**
     * Retourne l'élement JSX de la page
     * 
     * @returns 
     * @memberof Home
     */
    render() {
        return (
            <div className="container">
                <ToastContainer autoClose={3000}/>
                <div className="page-header" id="banner">
                    <div className="row">
                        <div className="col-lg-8 col-md-7 col-sm-6">
                            <h1>Home</h1>
                            <p className="lead">Activité Récente</p>
                        </div>
                    </div>
                    <div className="row">
                    {this.props.isFetching === true ?
                        (<Loader /> ):
                        (this.getLastActivity())
                    }
                    </div>
                </div>
            </div>
        )
    }

    /**
     * Retourne les premiers dossier du tableau récupéré de tous les dossiers de l'utilisateur
     *
     * @returns L'élement JSX
     * @memberof Home
     */
    getLastActivity(){
        if(this.props.storages && this.props.storages.length > 0){
            var storages = this.props.storages.slice(0,5);
            return(
                storages.map((storage, index) => (
                    <StorageCard key={storage.id} folder={storage} location={this.props.location} />
                ))
            )
        }else{
            return(
                <p>Aucune activités récente, rendez-vous dans la page Stockage pour commencer à stocker vos fichiers</p>
            )
        }
    }
}


function mapStateToProps(store) {
    return {
        storages: store.storages.storages,
        isFetching: store.storages.isFetching
    }
}

export default withRouter(connect(mapStateToProps)(Home));
