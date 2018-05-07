import React, {Component} from 'react';


class Toast extends Component{

    render(){
        const {toasts} = this.props;
        return(
            <div class="toastDiv">
                {toasts.map( (toast, index) =>
                    <li key={index} className="toast">
                        {toast.message}
                        <button className="toastCloseButton"><i className="fas fas-close"></i> Fermer</button>      
                    </li>
                )}    
            </div>
        );
    }
}