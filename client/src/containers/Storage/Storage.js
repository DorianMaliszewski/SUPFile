import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

//Custom Containers
import File from '../File/File';

/**
 * Container Storage représentant un Dossier dans lequel on a
 * 
 * @class Storage
 * @extends {Component}
 */
class Storage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            storage: null,
            dropzoneActive: false
        }
    }
    render() {
        const { storage, dropzoneActive } = this.state;
        const overlayStyle = {
            position: 'relative',
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
                <h1>Espace de stockage</h1>
                <div>
                    <Dropzone disableClick
                        multiple={false}
                        style={{ position: "relative"}}
                        onDrop={this.onDrop.bind(this)}
                        onDragEnter={this.onDragEnter.bind(this)}
                        onDragLeave={this.onDragLeave.bind(this)}>

                        {dropzoneActive && <div style={overlayStyle}>Drop files...</div>}

                        { this.storage.files.map( (file, index) => {
                            <File key={index} file={file} />
                        })}
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

    onDrop(storage) {
        this.setState({
            dropzoneActive: false
        });
        this.state.storages.push(storage[0]);
        console.log(this.state.storages);
    }
}

export default Storage;