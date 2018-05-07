import React, {Component} from 'react';


export default class  extends Component {

    render(){
        return localStorage.getItem('token') ? (
            <div>

            </div>
        ):(
            <div>
            </div>
        );
    }
}