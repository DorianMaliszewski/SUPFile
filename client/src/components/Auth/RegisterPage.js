import React, {Component} from 'react'
import logo from '../../assets/logo.svg'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {withRouter, Redirect} from 'react-router'
import {AUTH_TOKEN} from '../../constants'
//Actions
import * as Actions from '../../actions'

import './OAuth.css';

/**
 * Page d'inscription
 *
 * @class RegisterPage
 * @extends {Component}
 */
class RegisterPage extends Component {

    /**
     * Reference vers le formulaire d'inscription
     * 
     * @memberof RegisterPage
     */
    registerForm = null;

    state = {
        errors : []
    }

    /**
     * Retourne l'élément JSX de la page d'inscription
     *
     * @returns
     * @memberof RegisterPage
     */
    render() {
        if(window.localStorage.getItem(AUTH_TOKEN)){
            return(
                <Redirect to='/' />
            )
        }
        return (
            <div className="container">
                <div className="pb-5 text-center">
                    <img
                        className="d-block mx-auto mb-4"
                        src={logo}
                        alt=""
                        width="72"
                        height="72"/>
                    <h2>Créer un compte</h2>
                    <p className="lead">N'attendez plus pour profitez de SUPFile...Inscrivez-vous</p>
                </div>

                <div className="row offset-1">
                    <ul style={{color: 'red'}}>
                        {this.getErrors()}
                    </ul>
                    <div className="col-md-10 order-md-1">
                        <div className="row">
                            <button className="loginBtn loginBtn--google" onClick={e => this.props.actions.googleLogin()}>S'inscrire avec Google</button>
                            <button className="loginBtn--facebook loginBtn" onClick={this.facebookLogin.bind(this)}>S'inscrire avec Facebook</button>
                        </div>
                        <h4 className="mb-3">Informations</h4>
                        <form id="registerForm" name="registerForm" className="needs-validation" onSubmit={e => this.handleRegister(e)}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="firstName">Prénom</label>
                                    <input
                                        className="form-control"
                                        id="firstName"
                                        placeholder="Prénom"
                                        required
                                        type="text"/>
                                    <div className="invalid-feedback">
                                        Le prénom n'est pas valide
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="lastName">Nom de famille</label>
                                    <input
                                        className="form-control"
                                        id="lastName"
                                        placeholder="Nom"
                                        required
                                        type="text"/>
                                    <div className="invalid-feedback">
                                        Le nom de famille n'est pas valide
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        className="form-control"
                                        id="email"
                                        placeholder="you@example.com"
                                        type="email"
                                        required/>
                                    <div className="invalid-feedback">
                                        L'adresse e-mail n'est pas valide
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="password">Mot de passe</label>
                                    <input
                                        className="form-control"
                                        id="password"
                                        placeholder="Mot de passe"
                                        type="password"
                                        required />
                                    <div className="invalid-feedback">
                                        Le mot de passe est invalide
                                    </div>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label htmlFor="address2">Confirmer</label>
                                    <input
                                        className="form-control"
                                        id="password2"
                                        placeholder="Confirmer le mot de passe"
                                        type="password"
                                        required/>
                                    <div className="invalid-feedback">
                                        Les mots de passe ne sont pas identiques
                                    </div>
                                </div>
                            </div>

                            <hr className="mb-4"/>

                            <button className="btn btn-primary btn-lg btn-block" type="submit">S'inscrire</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    /**
     * Lance l'action d'inscription après avoir vérifier le formulaire. Si une erreur est présente dans le formulaire on l'affiche
     * 
     * @param {any} e 
     * @memberof RegisterPage
     */
    handleRegister(e){
        e.preventDefault();
        const {
            firstName,
            lastName,
            password,
            password2,
            email
        } = document.registerForm;
        //TODO: Vérification du formulaire
        if(this.isEmptyRequired([firstName, lastName, password, password2, email])){
            return;
        }

        let success = true

        if(firstName.value.length < 3){
            success = false
            firstName.classList.add("is-invalid")
            firstName.focus()
        }

        if(password.value !== password2.value){
            success = false
            password2.classList.add("is-invalid")
            password2.focus()
        }
        if(success){
            this.props.actions.registerAction({
                name: firstName.value + ' '+ lastName.value,
                password: password.value,
                email: email.value
            });
        }
    }

    /**
     * Vérifie si tus les élément requis sont non null
     * 
     * @param {any} array Le tableau des éléments à vérifier
     * @returns {Boolean} Le résultat de la vérification
     * @memberof RegisterPage
     */
    isEmptyRequired(array){
        let empty = false;
        Array.from(array).forEach(element => {
            element.classList.remove("is-invalid")
            if(element.value === ""){
                if(empty === false){
                    element.focus()
                    empty = true;
                }
                element.classList.add("is-invalid")
            }
        });
        return empty;
    }

    /**
     * Lance l'action de login via google
     *
     * @param {*} response
     * @memberof RegisterPage
     */
    responseGoogle(response){
        this.props.actions.googleLogin()
    }

    /**
     * Lance l'action de login via facebook
     *
     * @memberof RegisterPage
     */
    facebookLogin(){
        this.props.actions.facebookLogin()
    }

    /**
     * Retourne les erreurs lors de l'inscription
     *
     * @returns
     * @memberof RegisterPage
     */
    getErrors(){
        if(this.props.auth.errorMessages){
            if(Array.isArray(this.props.auth.errorMessages)){
                return this.props.auth.errorMessages.map(error =>
                    <li>{error.msg}</li>
                )
            }else{
                return this.props.auth.errorMessages.msg
            }
        }
    }
}

function mapStateToProps(store) {
    return {
        auth: store.auth,
        actions: store.actions
    };
}

function mapDispatchToProps(dispatch){
    return {
        actions : bindActionCreators(Actions, dispatch)
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegisterPage))