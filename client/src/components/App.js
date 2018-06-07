import React, { Component, Fragment } from 'react';
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Actions
import * as Actions from '../actions/';

import HelpPage     from './Common/Help';
import AboutPage    from './Common/About';
import ContactPage  from './Common/Contact';
import IntroPage    from './IntroPage';

import LoginPage    from './Auth/LoginPage';
import RegisterPage from './Auth/RegisterPage';

import StoragePage  from './StoragePage';
import HomePage     from './HomePage';
import ProfilPage   from './Profil/Profil';

//Containers
import Header       from '../containers/Header'
//Css
import './App.css';
import { AUTH_TOKEN } from '../constants';
import Loader from '../containers/Loader';  
import ProtectedRoute from './ProtectedRoute';


//mapXToProps
function mapStateToProps(store) {
    return {
        storages: store.storages,
        auth: store.auth,
        files: store.files,
        router: store.router
    };
}

function mapDispatchToProps(dispatch){
    return {
        actions : bindActionCreators(Actions, dispatch)
    }
}

/**
 * Principal component of the application
 * 
 * @class App
 * @extends {Component}
 */
class App extends Component {

    /**
     * A la construction vérifie le token de l'utilisateur si les données utilisateurs sont inexxistants
     * @param {Object} props Props du composant
     * @memberof App
     */
    constructor(props) {
        super(props)
        if(!props.auth.user && window.localStorage.getItem(AUTH_TOKEN)){
            props.actions.validateToken()
        } 
    }
    /**
     * Charge toutes les données de l'utilisateur (espace de stockage)
     * 
     * @param {String} token 
     * @memberof App
     */
    getDataOfConnectedUser(token){
        if(this.props.storages.length === 0 && token){
            this.props.actions.fetchAllStorages(token);
        }
    }

    /**
     * Si des erreurs sont soulévées durant un changement de page on affichage une notification toast
     */
    componentWillMount(){
        if(this.props.location.state && this.props.location.state.errors){
            this.props.location.state.errors.forEach(error => this.notify(error))
            this.props.history.replace({state: null})

        }
    }

    /**
     * Créer la notification toast
     * @param {status: Number, message: String} responseJson The array of json reponse to create the toast
     */
    notify(responseJson) {
        console.log(responseJson)
        if (responseJson.status === 200){
            toast.success(responseJson.message, {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }else{
            toast.error(responseJson.message, {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }
    };
    
    /**
     * Retourne l'élément JSX de la page
     * 
     * @returns 
     * @memberof App
     */
    render() {
        return (
            <Fragment>
                <Header history={this.props.history}/>
                <ToastContainer autoClose={3000} />
                {this.getUserRoute()}
            </Fragment>
        );
    }
    
    /**
     * Charge les données de l'utilisateur connecté puis 
     * retourne l'élément JSX Switch avec les routes pour les utilisateurs connectés.
     * 
     * @returns L'élément JSX du Switch
     * @memberof App
     */
    getUserRoute(){
        this.getDataOfConnectedUser(window.localStorage.getItem(AUTH_TOKEN));
        return(
            <Switch>
                <ProtectedRoute exact path="/profile" component={ProfilPage} />
                <ProtectedRoute path="/storages" component={StoragePage} />
                <ProtectedRoute path="/folders/:id" location={this.props.router.location} component={StoragePage} />
                <Route path="/about" component={AboutPage} />
                <Route path="/help" component={HelpPage} />
                <Route path="/contact" render={props => <ContactPage contactAction={this.props.actions.contactAction} />} />
                <Route path="/loading" component={Loader} />
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
                {window.localStorage.getItem(AUTH_TOKEN) ? (
                    <ProtectedRoute component={HomePage}/>
                ): (
                    <Route component={IntroPage}/>
                )}

            </Switch>
        )
    }
    
    /**
     * Retourne l'éléement JSX du Switch pour les utilisateurs non connectés
     * 
     * @returns L'élément JSX du Switch
     * @memberof App
     */
    getGuestRoute(){
        return(
            <Switch>
                

                {this.getCommonRoutes()}

                <Route render={() =>
                    <Redirect to={{pathname: "/", state: { from: this.props.location }}} /> 
                } />

            </Switch>
        )
    }

    /**
     * Retour l'élément JSX du Switch des routes en commmun pour les utilisateurs connectés et non connnectés
     * 
     * @memberof App
     * @returns L'éelemnt JSX du Switch
     */
    getCommonRoutes(){
        return (
            <Switch>
            </Switch>
        )
        
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));