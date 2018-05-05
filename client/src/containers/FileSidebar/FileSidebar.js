import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {
        storages: state.storages
    };
}

class FileSidebar extends Component {
    render() {
        const {targetFile} = this.props;
        return targetFile && (
            <div className="file-sidebar">
                <p>{targetFile.name}</p>
                <p>{targetFile.createdAt}</p>
                <p>{targetFile.updatedAt}</p>
                <p>{targetFile.type}</p>
                <hr/>
                <button onClick={e => this.rename()}>   Renommer            </button>
                <button onClick={e => this.download()}> Télécharger         </button>
                <button onClick={e => this.delete()}>   Supprimer           </button>
                <button onClick={e => this.moveTo()}>   Déplacer vers...    </button>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(FileSidebar);