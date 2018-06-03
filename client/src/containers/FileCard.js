import React, { Component, Fragment } from 'react';
import { SERVER_URL, AUTH_TOKEN } from '../constants';

//Context Menu
import { ContextMenu, Item, ContextMenuProvider } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.min.css';

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
            <Fragment>
                <div className="col-lg-4 pb-2">
                    <ContextMenuProvider id={'MENU_' + this.props.file.id} className="card border-primary mb-3" onClick={this.openFile.bind(this)} component='div'>
                        <div className="card-body">
                            <h5 className="card-title" style={{textOverflow : "ellipsis"}}><img alt="icon file" src="/file-format-icons/angel.svg" height='20' width='20' style={{display: 'inline-block'}} /> {file.name}</h5>
                            <p className="card-text">{this.convertSize(file.size)}</p>
                        </div>
                    </ContextMenuProvider>
                </div>

                <ContextMenu id={'MENU_' + this.props.file.id}>
                    <Item onClick={this.downloadFile.bind(this)}>Télécharger</Item>
                    <Item onClick={this.handleRename.bind(this)}>Renommer</Item>
                    <Item onClick={this.handleDelete.bind(this)}>Supprimer</Item>
                </ContextMenu>
            </Fragment>
        );
    }

    /**
     * 
     * 
     * @memberof FileCard
     */
    openFile(){
        if(this.checkTypeForPreview(this.props.file)){
            this.previewFile()
        }else{
            this.downloadFile()
        }
    }

    /**
     * Show a popup to download the file
     * 
     * @memberof FileCard
     */
    downloadFile() {
        var client = new XMLHttpRequest();
        var file = this.props.file
        client.open("GET", `${SERVER_URL}/file/${file.id}`, true);
        client.setRequestHeader("Authorization", "Baerer " + window.localStorage.getItem(AUTH_TOKEN));
        client.responseType = 'blob';
        client.onload = function (e) {
            if(this.status === 200) {
                var downloadUrl = URL.createObjectURL(this.response);
                var a = document.createElement("a");
                document.body.appendChild(a);
                a.style = "display: none";
                a.href = downloadUrl;
                a.target = "_blank";
                a.download = file.name;
                a.click();
            }
        }
        client.send();
    }

    /**
     * Open a modal to preview the file
     * Only for text, pdf, music, image
     * 
     * @memberof FileCard
     */
    previewFile() {
        var previewXHR = new XMLHttpRequest();
        var file = this.props.file
        var toogleModal = this.props.toogleModal;
        previewXHR.open("GET", `${SERVER_URL}/file/${file.id}`, true);
        previewXHR.setRequestHeader("Authorization", "Baerer " + window.localStorage.getItem(AUTH_TOKEN));
        previewXHR.responseType = 'blob';
        previewXHR.onload = function (e) {
            if(this.status === 200) {
                var downloadUrl = URL.createObjectURL(this.response);
                
                toogleModal(downloadUrl, this.response.type)
            }
        }
        previewXHR.send();
    }

    handleRename () {

    }

    handleDelete () {

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
        while (size > 1024 && n < 3) {
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

    checkTypeForPreview (file) {
        const typeToPreview=['image', 'media', 'video', 'text', 'application']
        if(typeToPreview.includes(file.typeDoc)) {
            if(file.typeDoc === 'application' && file.extension !== 'pdf') {
                return false;
            }
            return true
        }else {
            return false
        }
    }
}

export default FileCard;