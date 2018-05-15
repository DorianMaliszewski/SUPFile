import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from "react-router-dom"
import * as Actions from '../../actions'
import Dropzone from 'react-dropzone';

class StoragePage extends Component {

    constructor(props){
        if(!window.localStorage.getItem('token')){
            props.history.push('/');
            document.reload();
            return;
        }
        super(props);
        this.dropzoneRef = React.createRef();
        this.state = {
            accept: '',
            files: [],
            dropzoneActive: false
        }
    }

    render() {
        const storage = this.getFolder(this.props.match.params.id ? this.props.match.params.id : 0)
        const { accept, files, dropzoneActive } = this.state;
        const overlayStyle = {
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          padding: '2.5em 0',
          background: 'rgba(0,0,0,0.5)',
          textAlign: 'center',
          color: '#fff'
        };
        return (
            <div>
                <div className="row">
                    <button type="button" onClick={() => {e => this.dropzoneRef.open() }}>
                        Open File Dialog
                    </button>
                    <button className="btn btn-info mr-5">Ajouter un fichier</button>
                    <button className="btn btn-info mr-5">Ajouter un dossier</button>
                    <button className="btn btn-info dropdown-toggle" id="dropdown_action" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Action</button>
                    <div className="dropdown-menu" aria-labelledby="dropdown07">
                            <button className="dropdown-item">Renommer</button>
                            <button className="dropdown-item">Supprimer</button>
                    </div>
                </div>
                <div className="row">
                </div>
                <div className="row">
                <Dropzone
                    ref={this.dropzoneRef}
                    disableClick
                    style={{position: "relative"}}
                    accept={accept}
                    onDrop={this.onDrop.bind(this)}
                    onDragEnter={this.onDragEnter.bind(this)}
                    onDragLeave={this.onDragLeave.bind(this)}
                >
                    { dropzoneActive && <div style={overlayStyle}>Drop files...</div> }
                    <div>
                    <h1>My awesome app</h1>
                    <label htmlFor="mimetypes">Enter mime types you want to accept: </label>
                    <input
                        type="text"
                        id="mimetypes"
                        onChange={this.applyMimeTypes.bind(this)}
                    />
            
                    <h2>Dropped files</h2>
                    <ul>
                        {
                        files.map(f => <li>{f.name} - {f.size} bytes</li>)
                        }
                    </ul>
            
                    </div>
                </Dropzone>
                </div>
            </div>
        );
    }
    
      onDragEnter() {
        this.setState({
          dropzoneActive: true
        });
      }
    
      onDragLeave() {
        this.setState({
          dropzoneActive: false
        });
      }
    
      onDrop(files) {
        this.setState({
          files,
          dropzoneActive: false
        });
      }
    
      applyMimeTypes(event) {
        this.setState({
          accept: event.target.value
        });
      }

      getFolder(idFolder){
          return this.props.storages.storages ? this.props.storages[0] : null;
      }
}

//mapXToProps
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StoragePage));