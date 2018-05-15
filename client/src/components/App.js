import React, { Component } from 'react';
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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
import StoragePage  from './Storage/Storage';
import HomePage     from './Home/Home';
import ProfilPage   from './Profil/Profil';

//Containers
import Header       from '../containers/Common/Header';

//Css
import './App.css';

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

/**
 * Principal component of the application
 * 
 * @class App
 * @extends {Component}
 */
class App extends Component {

    /**
     * Load all of the data of the connected user
     * 
     * @param {String} token 
     * @memberof App
     */
    getDataOfConnectedUser(token){
        this.props.actions.fetchAllDataOfConnectedUser(token);
    }
    
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

                {window.localStorage.getItem('token') ? this.getUserRoute() : this.getGuestRoute()}
                
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
        this.getDataOfConnectedUser(window.localStorage.getItem('token'));
        return(
            <Switch>

                <Route exact path="/" component={HomePage} />
                <Route exact path="/profile" component={ProfilPage} />
                <Route path="/storages" component={StoragePage} />

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
        return(
            (<Route path="/about" component={AboutPage} />)     &&
            (<Route path="/help" component={HelpPage} />)        &&
            (<Route path="/contact" component={ContactPage} />)
        )
        
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));