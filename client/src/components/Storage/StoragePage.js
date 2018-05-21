import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from "react-router-dom"
import * as Actions from '../../actions'
import Dropzone from 'react-dropzone';
import { AUTH_TOKEN } from '../../constants';
import { Redirect } from 'react-router-dom'
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import folderIcon from '../../assets/folder.svg'
import folderSharedIcon from '../../assets/folder-shared.svg'
import Loader from '../../containers/Loader'

/**
 * 
 * 
 * @class StoragePage
 * @extends {Component}
 */
class StoragePage extends Component {

    /**
     * Creates an instance of StoragePage.
     * @param {any} props 
     * @memberof StoragePage
     */
    constructor(props){
        if(!window.localStorage.getItem(AUTH_TOKEN)){
            props.history.push('/');
            window.location.reload();
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

    /**
     * Retourne la page du dossier ciblé sinon retourne sur la page d'accueil et affiche une notification en bas à droite annonçant que le dossier n'a pas été trouvé
     * 
     * @returns 
     * @memberof StoragePage
     */
    render() {
        if(this.props.storages.isFetching === true) {
            return(<Loader />)
        }
        const storage = this.props.match.params.id ? this.getFolder(this.props.match.params.id) : this.getRootFolder()
        if(storage === null || storage === undefined){
            return (
                <Redirect
                to={{
                    pathname: "/",
                    state: { errors: [{status: 404, message: "Dossier non trouvé"}] }
                }}
                />
            )
        }
        const { accept, files, dropzoneActive } = this.state;
        const overlayStyle = {
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          width: '100%',
          height: '100%',
          padding: '2.5em 0',
          background: 'rgba(0,0,0,0.5)',
          textAlign: 'center',
          color: '#fff'
        };
        return (
            <div className="container">
                <div className="row">
                    <button className="btn btn-primary btn-lg mr-5" type="button" onClick={e => this.props.history.goBack()}>
                        Précedent
                    </button>
                    <button className="btn btn-info mr-5" type="button" onClick={e => this.dropzoneRef.open() }>
                        Ajouter un fichier
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
                    ref={node => this.dropzoneRef = node}
                    disableClick
                    style={{position: "relative"}}
                    accept={accept}
                    onDrop={this.onDrop.bind(this)}
                    onDragEnter={this.onDragEnter.bind(this)}
                    onDragLeave={this.onDragLeave.bind(this)}
                >
                    { dropzoneActive && <div style={overlayStyle}>Uploader un fichier ou un dossier</div> }
                    <div>
                    <h1>{storage.name}</h1>
                    {this.getChildFolders(storage.id)}
                    {this.getFiles(storage)}
                    </div>
                </Dropzone>
                </div>
            </div>
        );
    }
    
    /**
     * 
     * 
     * @memberof StoragePage
     */
    onDragEnter() {
        this.setState({
            dropzoneActive: true
        });
    }

    /**
     * 
     * 
     * @memberof StoragePage
     */
    onDragLeave() {
        this.setState({
            dropzoneActive: false
        });
    }

    /**
     * 
     * 
     * @param {any} files 
     * @memberof StoragePage
     */
    onDrop(files) {
        this.props.actions.uploadFiles(files);
        this.setState({
            
            dropzoneActive: false
        });
    }

    /**
     * 
     * 
     * @param {any} event 
     * @memberof StoragePage
     */
    applyMimeTypes(event) {
        this.setState({
            accept: event.target.value
        });
    }

    /**
     * 
     * 
     * @param {any} idFolder 
     * @returns 
     * @memberof StoragePage
     */
    getFolder(idFolder){
        var folderFinded = null
        if(idFolder !== null && idFolder !== undefined){
                folderFinded = this.props.storages.storages.find(storage => storage.id === parseInt(idFolder))
        }
        return folderFinded
    }

    getChildFolders(idParent) {
        let childs = null
        if(idParent !== null && idParent !== undefined){
            childs = this.props.storages.storages.filter(storage => storage.parentFolder === idParent)
        }
        if(childs === null || childs === undefined || childs.length === 0){
            return
        }else{
            return(
                <div>
                <h3>Dossiers</h3>
                <div className="row">
                    {childs.map((child, index) => (
                        <div key={index} className="col-lg-3">
                            <div className="card border-primary mb-3" onClick={e => this.openFolder(child.id)}>
                                <div className="card-body">
                                    <h4 className="card-title"><img alt="icon folder" src={child.sharedLink ? (folderSharedIcon) : (folderIcon)} height='20' width='20' style={{display: 'inline-block'}} /> {child.id} - {child.name}</h4>
                                    <p className="card-text">{child.files.length} fichiers</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                </div>
            )
        }
    }

    openFolder(id){
        this.props.history.push('/folders/' + id);
    }

    getRootFolder() {
        return this.props.storages.storages.find(storage => storage.parentFolder === null)
    }

    getFiles(storage){
        if(storage === null || storage === undefined || storage.files === null || storage.files === undefined || storage.files.length === 0){
            return
        }
        return(
            <div>
                <h3>Fichiers</h3>
                <div className="row">
                {
                    storage.files.map((f,i) => (
                        <div key={i} className="col-lg-4 pb-2">
                            <div className="card border-primary" onClick={e => this.openFile(f)}>
                                <div className="card-body">
                                    <h5 className="card-title" style={{textOverflow : "ellipsis"}}><img alt="icon file" src="/file-format-icons/angel.svg" height='20' width='20' style={{display: 'inline-block'}} /> {f.name}</h5>
                                    <p className="card-text">{f.size} bytes</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
                </div>
            </div>
        )
    }
}

/**
 * 
 * 
 * @param {any} store 
 * @returns 
 */
function mapStateToProps(store) {
    return {
        storages: store.storages
    };
}

/**
 * 
 * 
 * @param {any} dispatch 
 * @returns 
 */
function mapDispatchToProps(dispatch){
    return {
        actions : bindActionCreators(Actions, dispatch)
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StoragePage));