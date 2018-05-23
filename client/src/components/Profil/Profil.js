import React, { Component } from 'react';
import './Profil.css';
import { connect } from 'react-redux';

class ProfilPage extends Component {
    render() {
        return (
            <div className="container">
                <div className="page-header" id="banner">
                    <div className="row">
                        <div className="col-lg-8 col-md-7 col-sm-6">
                            <h1>Profil</h1>
                            <p className="lead">Gérer vos informations utilisateur</p>
                        </div>
                    </div>
                    <div className="row">
                        <label htmlFor="staticName" className="col-sm-3 col-form-label">Nom Complet :</label>
                        <div className="col-sm-9">
                            <input type="text" readonly="" id="staticName" className="form-control-plaintext" value={this.props.user.name}/>
                        </div>
                        <label htmlFor="staticEmail" className="col-sm-3 col-form-label">Email :</label>
                        <div className="col-sm-9">
                            <input type="text" readonly="" className="form-control-plaintext" id="staticEmail" value={this.props.user.email}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps (store){
    return {user : store.auth.user}
}
export default connect(mapStateToProps,null)(ProfilPage);