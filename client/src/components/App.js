import React, { Component } from 'react';
import './App.css';
import { Route, withRouter } from "react-router-dom";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions/';

//Components
import Header from '../containers/Header';
import StoragePage from './Storage/Storage';
import HomePage from './Home/Home';
import AboutPage from './About/About';
import LoginPage from './Login/Login';

//Containers
import Article from '../containers/Article/Article';

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

class App extends Component {

  constructor(props){
    super(props);
    this.props.actions.fetchAllArticles();
  }
  
  render() {
    return (
      <div>
        <Header history={this.props.history}/>

        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/storages" component={StoragePage} />
        <Route path="/login" component={LoginPage} />
  
        <Article article={this.props.articleToDisplay} backClickAction={this.props.actions.backClickAction}/>
        
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));