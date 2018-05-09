import React, { Component } from 'react';

/**
 * Container File représentrant un fichier uploadé
 * 
 * @class File
 * @extends {Component}
 */
class File extends Component {
    render() {
        return (
        <div className="file-item" onClick={this.showMenu(this, file)}>
            <img src={'icon-file-' + file.type.substring(12)} alt={'Icon ' + file.type.substring(12)} />
            <p>{file.name} - {this.convertSize(file.size)}</p>
        </div>
        );
    }

    downloadFile(file) {
        const reader = new FileReader();
        //On lit le fichier qu'il essaie de télécharge
        reader.onload = () => {
            const fileAsBinaryString = reader.result;
        };
        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');

        reader.readAsDataURL(file)
        window.open(file.preview)
    }

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

export default File;