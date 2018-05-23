import React, { Component } from 'react';
import {connect} from 'react-redux'

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
                    <div className="col-lg-4 col-md-5 col-sm-6">
                        <div className="sponsor">
                        <script async="" type="text/javascript" src="//cdn.carbonads.com/carbon.js?zoneid=1673&amp;serve=C6AILKT&amp;placement=bootswatchcom" id="_carbonads_js"></script>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(store) {
    return {
        auth: store.auth
    }
}

export default connect(mapStateToProps, null)(ProfilPage);