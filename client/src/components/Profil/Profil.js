import React, { Component } from 'react';
import './Profil.css';
import './../Auth/OAuth.css';
import { connect } from 'react-redux';

/**
 * Page de profil de l'utilisateur
 *
 * @class ProfilPage
 * @extends {Component}
 */
class ProfilPage extends Component {
    /**
     * Return l'élément JSX de la page
     *
     * @returns
     * @memberof ProfilPage
     */
    render() {
        return (
            <div className="container">
                <div className="page-header" id="banner">
                    <div className="row">
                        <div className="col-lg-8 col-md-7 col-sm-6">
                            <div className="row">
                            <h1 className="col-sm-3">Profil</h1>
                            {(this.props.user && this.props.user.google !== undefined && this.props.user.google !== null) &&
                                <div className="col-sm-9 loginBtn Add--google">Connecté avec google</div>
                            }
                            {(this.props.user && this.props.user.facebook !== undefined && this.props.user.facebook !== null) &&
                                <div className="col-sm-9 loginBtn Add--facebook">Connecté avec facebook</div>
                            }
                            </div>
                            <p className="lead">Gérer vos informations utilisateur</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3">
                            {(this.props.user && ((this.props.user.google) || (this.props.user.facebook))) &&
                                <img alt='Profile' className="profilePicture" src={this.props.user.picture}/>
                            }
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
            </div>
        );
    }
}

function mapStateToProps (store){
    return {user : store.auth.user}
}
export default connect(mapStateToProps,null)(ProfilPage);