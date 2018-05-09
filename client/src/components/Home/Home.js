import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import './Home.css';
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
                    </div>
                    <div className="row">
                    {this.props.isFetching === true ?
                        (<div className="loader"></div> ):(
                        <div>
                            {this.getLastActivity()}
                        </div>
                    )}
                    </div>
                </div>
            </div>
        )
    }

    getLastActivity(){
        var storages = this.props.storages.slice(0,5);
        return(
            storages.map((storage, index) => (
                <div key={index} className="card border-primary mb-3" onClick={e => this.openFolder(storage.id)}>
                    <div className="card-header">{storage.id} - {storage.name}</div>
                    <div className="card-body">
                    <h4 className="card-title">{storage.files.length} fichiers</h4>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                </div>
            ))
        )
    }

    openFolder(id){
        this.props.history.push('/folders/' + id);
    }
}

//mapXToProps
function mapStateToProps(store) {
    return {
        storages: store.user.storages,
        isFetching: store.user.isFetching
    }
}

export default withRouter(connect(mapStateToProps)(Home));
