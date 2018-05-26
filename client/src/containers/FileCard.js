import React, { Component } from 'react';

/**
 * Container File représentrant un fichier uploadé
 * 
 * @class File
 * @extends {Component}
 */
class FileCard extends Component {
    render() {
        const {file} = this.props
        return (
            <div className="col-lg-4 pb-2">
                <div className="card border-primary" onClick={e => this.openFile(file)}>
                    <div className="card-body">
                        <h5 className="card-title" style={{textOverflow : "ellipsis"}}><img alt="icon file" src="/file-format-icons/angel.svg" height='20' width='20' style={{display: 'inline-block'}} /> {file.name}</h5>
                        <p className="card-text">{file.size} bytes</p>
                    </div>
                </div>
            </div>
        );
    }

    /**
     * Show a popup to download the file
     * 
     * @memberof FileCard
     */
    downloadFile() {
        window.open(this.props.file.preview)
    }

    /**
     * Open a modal to preview the file
     * Only for text, pdf, music, image
     * 
     * @memberof FileCard
     */
    previewFile() {

    }

    /**
     * Convert the size in byte of thefile to human readable number with unit
     * 
     * @param {Integer} size The size in byte of the file
     * @returns {String} The formatted size
     * @memberof FileCard
     */
    convertSize(size) {
        var n = 0;
        while (size > 1024) {
            size = size / 1024;
            n++;
        }
        var scale = "octets";
        switch (n) {
            case 1:
                scale = "Ko";
                break;
            case 2:
                scale = "Mo";
                break;
            case n > 3:
                scale = "Go";
                break;
            default:
                break;
        }
        return Math.round(size) + " " + scale;
    }

}

export default FileCard;