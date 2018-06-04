import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import Loader from '../containers/Loader';
import StorageCard from '../containers/StorageCard';

/**
 * Home component for connected users
 * 
 * @class Home
 * @extends {React.Component}
 */
class Home extends React.Component {

    /**
     * Render the component
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

    getLastActivity(){
        if(this.props.storages && this.props.storages.length > 0){
            var storages = this.props.storages.slice(0,5);
            return(
                storages.map((storage, index) => (
                    <StorageCard key={index} folder={storage} onClick={this.openFolder.bind(this)} />
                ))
            )
        }else{
            return(
                <p>Aucune activités récente, rendez-vous dans la page Stockage pour commencer à stocker vos fichiers</p>
            )
        }
    }

    openFolder(id){
        this.props.history.push('/folders/' + id);
    }
}

//mapXToProps
function mapStateToProps(store) {
    return {
        storages: store.storages.storages,
        isFetching: store.storages.isFetching
    }
}

export default withRouter(connect(mapStateToProps)(Home));
