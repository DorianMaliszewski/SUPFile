import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

//Icons
import folderIcon from '../assets/folder.svg'
import folderSharedIcon from '../assets/folder-shared.svg'

//Context Menu
import { ContextMenu, Item, ContextMenuProvider } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.min.css';

//Actions
import {renameFolder, deleteFolder } from '../actions'

/**
 * Container Storage représentant une carte dossier
 * 
 * @class Storage
 * @extends {Component}
 */
class StorageCard extends Component {
    /**
     * Créer une instance de StorageCard
     * @param {*} props
     * @memberof StorageCard
     */
    constructor(props) {
        super(props);
        this.state = {
            folderName: props.folder.name
        };
    }

    /**
     * Retourne l'élément JSx de la carte
     *
     * @returns
     * @memberof StorageCard
     */
    render() {
        const {folder} = this.props;
        return(
            <Fragment>
                <div id={folder.id} className="col-lg-3">
                    <ContextMenuProvider id={'MENU_' + folder.id} className="card border-primary mb-3" onClick={this.openFolder.bind(this)} component='div'>
                        <div className="card-body">
                            <h4 className="card-title">
                                <img alt="icon folder" src={folder.sharedLink ? (folderSharedIcon) : (folderIcon)} height='20' width='20' style={{display: 'inline-block', marginRight: '5px'}} />
                                <span id={'span_'+ folder.id}>{this.state.folderName}</span>
                                <input id={'input_' + folder.id} 
                                    style={{display: 'none', width: '80%', textAlign: 'left', overflow:"hidden"}} 
                                    onChange={e => this.setState({folderName: e.target.value})} 
                                    onBlur={this.handleChangeName.bind(this)} 
                                    value={this.state.folderName}
                                />
                            </h4>
                        </div>
                    </ContextMenuProvider>
                </div>

                <ContextMenu id={'MENU_' + this.props.folder.id}>
                    <Item onClick={this.handleRename.bind(this)}>Renommer</Item>
                    <Item onClick={this.handleDelete.bind(this)}>Supprimer</Item>
                </ContextMenu>

            </Fragment>
        )
    }
    
    /**
     * Evenement déclenché lorsque la zone de saisie perd le focus lors du renommage du dossier
     * 
     * @memberof StorageCard
     */
    handleChangeName(){
        document.getElementById('span_'+this.props.folder.id).style.display = "inline"
        const input = document.getElementById('input_'+this.props.folder.id)
        input.style.display = "none"
        if(this.props.folder.name !== input.value){
            renameFolder(this.props.folder.id, input.value)
        }
    }

    /**
     * Remplace le span du nom du dossier par une zone de saisie et lui met le focus
     * 
     * @memberof StorageCard
     */
    handleRename(){
        document.getElementById('span_'+this.props.folder.id).style.display = "none"
        const input = document.getElementById('input_'+this.props.folder.id)
        input.style.display = "inline"
        input.focus()   
    }

    /**
     * Tente de supprimer le dossier après avoir demander une confirmation
     * 
     * @param {Event} e 
     * @memberof StorageCard
     */
    handleDelete(e) {
        const confirme = window.confirm("Etes-vous sur de vouloir supprimer le dossier ?")
        if(confirme){
            document.getElementById(this.props.folder.id).remove()
            this.props.dispatch(deleteFolder(this.props.folder.id))
        }
    }

    /**
     * Redirige vers la page du dossier
     *
     * @memberof StorageCard
     */
    openFolder(){
        this.props.history.push('/folders/' + this.props.folder.id);
    }
}

export default withRouter(connect()(StorageCard));
