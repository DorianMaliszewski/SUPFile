import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from "react-router-dom"
import * as Actions from '../../actions'

class StoragePage extends Component {
    
    constructor(props){
        if(!window.localStorage.getItem('token')){
            props.history.push('/');
        }
        super(props);
    }

    render() {
        return (
            <div>
                <div className="row">
                    <button className="btn btn-info mr-5">Ajouter un fichier</button>
                    <button className="btn btn-info mr-5">Ajouter un dossier</button>
                    <button className="btn btn-info dropdown-toggle" id="dropdown_action" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Action</button>
                    <div className="dropdown-menu" aria-labelledby="dropdown07">
                            <button className="dropdown-item">Renommer</button>
                            <button className="dropdown-item">Supprimer</button>
                    </div>
                </div>
            </div>
        );
    }
}

//mapXToProps
function mapStateToProps(store) {
    return {
        storages: store.storages
    };
}

function mapDispatchToProps(dispatch){
    return {
        actions : bindActionCreators(Actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoragePage);