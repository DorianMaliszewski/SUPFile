import React, { Component, Fragment } from 'react';
import { SERVER_URL, AUTH_TOKEN } from '../constants';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
//Context Menu
import { ContextMenu, Item, ContextMenuProvider } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.min.css';
import { renameFile, deleteFile } from '../actions';


/**
 * Container File représentrant un fichier uploadé
 * 
 * @class File
 * @extends {Component}
 */
class FileCard extends Component {

    constructor (props) {
        super(props);
        this.state = {
            fileName: props.file.name,
            extension: props.file.extension + '.svg'
        }
    }


    render() {
        const {file} = this.props
        return (
            <Fragment>
                <div id={file.id} className="col-lg-4 pb-2">
                    <ContextMenuProvider id={'MENU_' + this.props.file.id} className="card border-primary mb-3" onClick={this.openFile.bind(this)} component='div'>
                        <div className="card-body">
                            <h5 className="card-title" id={'span_' + file.id}><img src={'/file-format-icons/' + this.state.extension} width="50px" heigh="75px" alt="" />{this.state.fileName}</h5>
                            <input id={'input_' + file.id}
                                className="card-title"
                                style={{display: 'none', width: '80%', textAlign: 'left', overflow:"hidden"}} 
                                onChange={e => this.setState({fileName: e.target.value})} 
                                onBlur={this.handleChangeName.bind(this)} 
                                value={this.state.fileName}
                            />
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
     * Ouvre un popup pour télécharger le fichier
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
     * Ouvre le modal pour prévisualiser le fichier
     * Seulemnt pour les types text, pdf, musique et image
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

    /**
     * Evenement déclenché lorsque la zone de saisie pour renommer le fichier perd le focus
     * Lance l'action renameFile qui va contacter l'API pour renommer le fichier
     * 
     * @memberof StorageCard
     */
    handleChangeName(){
        document.getElementById('span_'+this.props.file.id).style.display = "inline"
        const input = document.getElementById('input_'+this.props.file.id)
        input.style.display = "none"
        if(this.props.file.name !== input.value){
            renameFile(this.props.file.id, input.value);
        }
    }

    /**
     * Remplace le span par un champs de saisie pour renommer le fichier et met le focus dans la zone de saisie
     * 
     * @memberof StorageCard
     */
    handleRename(){
        document.getElementById('span_'+this.props.file.id).style.display = "none"
        const input = document.getElementById('input_'+this.props.file.id)
        input.style.display = "inline"
        input.focus();
    }

    /**
     * tente de supprimer le fichier après avoir confirmer la suppresion
     *
     * @memberof FileCard
     */
    handleDelete () {
        const confirme = window.confirm("Etes-vous sur de vouloir supprimer "+this.props.file.name+" ?")
        if(confirme){
            document.getElementById(this.props.file.id).remove()
            this.props.dispatch(deleteFile(this.props.file.id))
        }
    }

    /**
     *Convertit la taille d'un fichier en octets vers des échelles pour améliorer la lisibilité (Ko, Mo, Go)
     * 
     * @param {Integer} size La taille du fichier en octets
     * @returns {String} La chaine de caractères de la taille formatté
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

    /**
     * Verifie le type du fichier pour savoir si oui ou non on peut prévisualiser le fichier
     *
     * @param {*} file
     * @returns
     * @memberof FileCard
     */
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

export default withRouter(connect()(FileCard));