import React from 'react';
import './LoginPage.css';
import logo from '../../logo.svg';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions/';

class LoginPage extends React.Component {

    state = {
        email:"",
        pass:"",
        errorDisplay: "none"
    }

    render(){
        console.log("Store",this)
        return(
            <div>
                <form className="form-signin" onSubmit={e => this.handleSubmit(e) }>
                    <div className="text-center mb-4">
                        <img className="mb-4" src={logo} alt="" width="72" height="72"/>
                    </div>
                    <div className="form-label-group">
                        <input id="inputEmail" className="form-control" placeholder="Email" value={this.state.email} onChange={ e => this.setState({email: e.target.value})} required="" autoFocus="" type="email"/>
                            <label htmlFor="inputEmail">Email</label>
                    </div>
                    <div className="form-label-group">
                        <input id="inputPassword" className="form-control" placeholder="Mot de passe" required="" type="password" onChange={e => this.setState({ pass: e.target.value })}/>
                            <label htmlFor="inputPassword">Mot de passe</label>
                    </div>
                    <div className="checkbox mb-3">
                        <label>
                            <input value="remember-me" type="checkbox"/> Se souvenir de moi
                        </label>
                    </div>
                    <small style={{color: 'red', display : this.state.errorDisplay }}>Identifiants incorrect</small>
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                    <p className="mt-5 mb-3 text-muted text-center">© 2017-2018</p>
                </form>
            </div>
        )
    }

    handleSubmit(e){
        console.log("Submit form", this);
        e.preventDefault();
        var rep = {};

        this.props.actions.loginAction(this.state.email, this.state.pass).then(
            data => {
                rep = data.json;

                if (rep.token) {
                    window.localStorage.setItem('token',rep.token);
                    this.props.history.push('/');
                    window.reload();
                    return;
                }
            }
        );
    }

}

function mapStateToProps(store) {
    return {
        storages: store.storages,
        actions: store.actions
    };
}

function mapDispatchToProps(dispatch){
    return {
      actions : bindActionCreators(Actions, dispatch)
    }
  }
  

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
