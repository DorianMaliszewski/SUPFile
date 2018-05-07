import React from 'react';
import {connect} from 'react-redux';

/**
 * Home component for connected users
 * 
 * @class Home
 * @extends {React.Component}
 */
class Home extends React.Component {

    /**
     * Render the component
     * 
     * @returns 
     * @memberof Home
     */
    render() {
        return (
            <div className="container">
                <div className="page-header" id="banner">
                    <div className="row">
                    <div className="col-lg-8 col-md-7 col-sm-6">
                        <h1>Home</h1>
                        <p className="lead">Activité Récente</p>
                    </div>
                    <div className="col-lg-4 col-md-5 col-sm-6">
                        <div className="sponsor">
                        <script async="" type="text/javascript" src="//cdn.carbonads.com/carbon.js?zoneid=1673&amp;serve=C6AILKT&amp;placement=bootswatchcom" id="_carbonads_js"></script>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

//mapXToProps
function mapStateToProps(store) {
    return {
        articles: store.articles
    }
}

export default connect(mapStateToProps)(Home);