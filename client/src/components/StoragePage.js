import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from "react-router-dom"
import Dropzone from 'react-dropzone';
import { Redirect } from 'react-router-dom'

//Toast
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Containers
import Loader from '../containers/Loader'
import FileCard from '../containers/FileCard'
import StorageCard from '../containers/StorageCard'

//Actions
import * as Actions from '../actions'
//Constants
import { AUTH_TOKEN } from '../constants';
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
        super(props);
        if(!window.localStorage.getItem(AUTH_TOKEN)){
            props.history.push('/');
            window.location.reload();
            return;
        }
        this.dropzoneRef = React.createRef();
        this.storage = null
        this.state = {
            accept: '',
            dropzoneActive: false
        }
    }


    componentDidUpdate() {
        if (this.props.files) {
            this.props.files.forEach(file => {
                if(file.isLoading && !file.toastId){
                    file.toastId = toast.info(this.props.storages.file.name + " is Uploading...", {
                        position: "bottom-right",
                        autoClose: false,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true
                    });
                }else if (!file.isLoading && file.toastId) {
                    toast.dismiss(this.toastId)
                    toast.success("Upload terminé de " + file.name, {
                        position: "bottom-right",
                        closeOnClick: true,
                        pauseOnHover: true,
                        autoClose: 5000
                    })
                }
            })
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

        const { accept, dropzoneActive } = this.state;
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
                <div className="row pb-3">
                    <button className="btn btn-primary btn-lg mr-5" type="button" onClick={e => this.props.history.goBack()}>Précedent</button>
                    <button className="btn btn-info mr-5" type="button" onClick={e => this.dropzoneRef.open() }>Ajouter un fichier</button>
                    <button className="btn btn-info mr-5" onClick={this.createFolder.bind(this)}>Ajouter un dossier</button>
                </div>
                <Dropzone
                    ref={node => this.dropzoneRef = node}
                    disableClick
                    style={{position: "relative"}}
                    accept={accept}
                    onDrop={this.onDrop.bind(this)}
                    onDragEnter={this.onDragEnter.bind(this)}
                    onDragLeave={this.onDragLeave.bind(this)}
                >
                    { dropzoneActive && <div style={overlayStyle}>Déposez un fichier</div> }
                    {!this.props.storages.storages || this.props.storages.storages.length === 0 ? (
                        <div>
                            Importer des fichiers ou créer un nouveau dossier
                        </div>
                    ):
                    (
                        this.getStorageList()
                    )}
                </Dropzone>
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
        console.log(files)
        files.forEach(file => {
            this.props.actions.uploadFile(file, this.storage.id);
        })
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
     * Get a folder in the store with the id specified
     * 
     * @param {Integer} idFolder 
     * @returns 
     * @memberof StoragePage
     */
    getFolder(idFolder){
        var folderFinded = null
        if(idFolder){
            folderFinded = this.props.storages.storages.find(storage => storage.id === idFolder)
        }
        return folderFinded
    }

    /**
     * Get All childs folders of the current folder and return the JSX Element of it
     * 
     * @param {Integer} idParent 
     * @returns 
     * @memberof StoragePage
     */
    getChildFolders(idParent) {
        let childs = null
        if(idParent !== null && idParent !== undefined){
            childs = this.props.storages.storages.filter(storage => storage.parent === idParent)
        }
        if(childs === null || childs === undefined || childs.length === 0){
            return
        }else{
            return(
                <div className="col-12">
                    <h3>Dossiers</h3>
                    <div className="row">
                        {childs.map((child, index) => <StorageCard key={index} child={child} />)}
                    </div>
                </div>
            )
        }
    }

    /**
     * Get The root folder of the user
     * 
     * @returns 
     * @memberof StoragePage
     */
    getRootFolder() {
        return this.props.storages.storages.find(storage => storage.parent === null)
    }

    /**
     * Return JSX Element of all files in the folder
     * 
     * @param {any} storage 
     * @returns 
     * @memberof StoragePage
     */
    getFiles(storage){
        if(!storage || !storage.files || storage.files.length === 0){
            return (<p>Aucun fichier dans ce dossier</p>)
        }
        return(
            <div className="col-xs-12">
                <h3>Fichiers</h3>
                <div className="row">
                    {storage.files.map((f,i) => (<FileCard key={i} file={f} />))}
                </div>
            </div>
        )
    }

    /**
     * Get folders and files inside the current folder if the current folder is not accessible Redirect to HomePage
     * 
     * @returns 
     * @memberof StoragePage
     */
    getStorageList(){
        this.storage = this.props.match.params.id ? this.getFolder(this.props.match.params.id) : this.getRootFolder()
        if(!this.storage){
            return (
                <Redirect
                to={{
                    pathname: "/",
                    state: { errors: [{status: 404, message: "Dossier non trouvé"}] }
                }}
                />
            )
        }else {
            return(
                <Fragment>
                    <div className="col-xs-12">
                        <h1>{this.storage.name}</h1>
                    </div>
                    {this.getChildFolders(this.storage.id)}
                    {this.getFiles(this.storage)}
                </Fragment>
            )
        }
    }

    /**
     * Create a folder and request the API to create it too.
     * 
     * @memberof StoragePage
     */
    createFolder(){
        const name = prompt("Entrez le nom du nouveau dossier", "Nouveau Dossier")
        if(name){
            this.props.actions.newFolder(name, this.storage.id)
        }
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
        storages: store.storages,
        files : store.files
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