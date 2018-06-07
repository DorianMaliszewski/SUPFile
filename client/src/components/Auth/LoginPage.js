import React from 'react';
import './LoginPage.css';
import './OAuth.css'
import logo from '../../logo.svg';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, Redirect } from 'react-router'
import * as Actions from '../../actions/';
import {AUTH_TOKEN} from '../../constants'

/**
 * Page de Login
 *
 * @class LoginPage
 * @extends {React.Component}
 */
class LoginPage extends React.Component {

    /**
     * Creates an instance of LoginPage.
     * @param {Object} props Props du composant
     * @memberof LoginPage
     */
    constructor(props){
        super(props)
        this.state = {
            email:"",
            pass:""
        }
    }

    /**
     * Retourne l'élément JSX de la page
     *
     * @returns
     * @memberof LoginPage
     */
    render(){
        if(window.localStorage.getItem(AUTH_TOKEN) !== null && window.localStorage.getItem(AUTH_TOKEN) !== undefined){
            return(
                <Redirect to='/' />
            )
        }
        return(
            <div>
                <form className="form-signin" onSubmit={e => this.handleSubmit(e) }>
                    <div className="text-center mb-4">
                        <img className="mb-4" src={logo} alt="" width="72" height="72"/>
                    </div>
                    <div className="row mb-4">
                        <button className="loginBtn loginBtn--google" onClick={e => this.props.actions.googleLogin()}>Se connecter avec Google</button>
                        <button className="loginBtn--facebook loginBtn" onClick={e => this.props.actions.facebookLogin()}>Se connecter avec Facebook</button>
                    </div>
                    <div className="form-label-group">
                        <input id="inputEmail" className="form-control" placeholder="Email" value={this.state.email} onChange={ e => this.setState({email: e.target.value})} required autoFocus type="email"/>
                            <label htmlFor="inputEmail">Email</label>
                    </div>
                    <div className="form-label-group">
                        <input id="inputPassword" className="form-control" placeholder="Mot de passe" required type="password" onChange={e => this.setState({ pass: e.target.value })}/>
                            <label htmlFor="inputPassword">Mot de passe</label>
                    </div>
                    <div className="checkbox mb-3">
                        <label>
                            <input value="remember-me" type="checkbox"/> Se souvenir de moi
                        </label>
                    </div>
                    <ul style={{color: 'red'}}>
                        {this.getErrors()}
                    </ul>
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Se connecter</button>
                    <button className="btn btn-lg btn-secondary btn-block" onClick={e => this.props.history.push('/register')}>Créer un compte</button>
                    <p className="mt-5 mb-3 text-muted text-center">© 2017-2018</p>
                </form>
            </div>
        )
    }

    /**
     * Permet de lancé l'action de login
     *
     * @param {*} e
     * @memberof LoginPage
     */
    handleSubmit(e){
        e.preventDefault();
        this.props.actions.loginAction(this.state.email, this.state.pass)
    }

    /**
     * Recupères les erreurs lors de la connexion 
     *
     * @returns
     * @memberof LoginPage
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


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage));
