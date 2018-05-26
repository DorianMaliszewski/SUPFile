import React, { Component } from 'react';
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { OAUTH_FAILURE, OAUTH_SUCCESS } from '../constants'

//Actions
import * as Actions from '../actions/';

//Common Pages
import HelpPage     from './Common/Help';
import AboutPage    from './Common/About';
import ContactPage  from './Common/Contact';

//Guest Pages
import IntroPage    from './Intro/Intro';

//Login Pages
import LoginPage    from './Common/LoginPage';
import RegisterPage from './Common/RegisterPage';

//Users Pages
import StoragePage  from './Storage/StoragePage';
import HomePage     from './Home/Home';
import ProfilPage   from './Profil/Profil';

//Containers
import Header       from '../containers/Header'
//Css
import './App.css';
import { AUTH_TOKEN } from '../constants';
import Loader from '../containers/Loader';


//mapXToProps
function mapStateToProps(store) {
    return {
        storages: store.storages,
        auth: store.auth
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

    constructor(props) {
        super(props)
        if((props.auth.user === null || props.user === undefined) && window.localStorage.getItem(AUTH_TOKEN)){
            props.actions.validateToken()
        } 
    }
    /**
     * Load all of the data of the connected user
     * 
     * @param {String} token 
     * @memberof App
     */
    getDataOfConnectedUser(token){
        if(this.props.storages.length === 0){
            this.props.actions.fetchAllStorages(token);
        }
    }

    componentDidUpdate(){
        if(this.props.location.state && this.props.location.state.errors){
            this.props.location.state.errors.forEach(error => this.notify(error))
            this.props.history.replace({state: null})

        }
    }

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
     * Render the component
     * 
     * @returns 
     * @memberof App
     */
    render() {
        return (
            <div>

                <Header history={this.props.history}/>
                <ToastContainer autoClose={3000} />

                {window.localStorage.getItem(AUTH_TOKEN) ? this.getUserRoute() : this.getGuestRoute()}
                
            </div>
        );
    }
    
    /**
     * Return the Switch element with all routes for connected users
     * And load the data of the user
     * 
     * @returns JSX Element The switch element
     * @memberof App
     */
    getUserRoute(){
        this.getDataOfConnectedUser(window.localStorage.getItem(AUTH_TOKEN));
        return(
            <Switch>

                <Route exact path="/" component={HomePage} />
                <Route exact path="/profile" component={ProfilPage} />
                <Route path="/storages" component={StoragePage} />
                <Route path="/folders/:id" component={StoragePage} />
                {this.getCommonRoutes()}

                <Route render={() =>
                    <Redirect to={{pathname: "/", state: { from: this.props.location }}} /> 
                } />

            </Switch>
        )
    }
    
    /**
     * Return the Switch element with all routes for Guest users
     * 
     * @returns JSX Element The Switch element
     * @memberof App
     */
    getGuestRoute(){
        return(
            <Switch>
                <Route exact path="/" component={IntroPage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />

                {this.getCommonRoutes()}

                <Route render={() =>
                    <Redirect to={{pathname: "/", state: { from: this.props.location }}} /> 
                } />

            </Switch>
        )
    }

    /**
     * Commons routes of users
     * 
     * @memberof App
     */
    getCommonRoutes(){
        return (
            <Switch>
                <Route path="/about" component={AboutPage} />
                <Route path="/help" component={HelpPage} />
                <Route path="/contact" render={props => <ContactPage contactAction={this.props.actions.contactAction} />} />
                <Route path="/loading" component={Loader} />
            </Switch>
        )
        
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));