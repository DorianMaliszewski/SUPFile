import React, { Component } from 'react';
import './Loader.css'

class Loader extends Component {
    render(){
        window.close();
        return(
            <div className="loader">
            </div>
        )
    }
}

export default Loader;