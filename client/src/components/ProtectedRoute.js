import React, { Component } from 'react';
import {Redirect, Route} from 'react-router-dom';
import { AUTH_TOKEN } from '../constants';
import {connect} from 'react-redux';

class ProtectedRoute extends Component {
    render() {
        if(!window.localStorage.getItem(AUTH_TOKEN)) {
            return (
                <Redirect
                to={{
                    pathname: "/login",
                    state: { from: this.props.history.location }
                }}
                />
            )
        }
        return (
            <Route path={this.props.path} component={this.props.component} />
        );
    }
}

export default connect()(ProtectedRoute);