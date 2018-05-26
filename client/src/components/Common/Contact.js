import React, { Component } from 'react';
import {SERVER_URL} from "../../constants";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ContactPage extends Component {

    state = {
        firstName:"",
        lastName:"",
        email:"",
        mood:"",
        reason:"",
        details:"",
        errorDisplay: "none"
    }

    render() {
        return (
            <div className="container">
                <ToastContainer autoClose={3000}/>
                <h1>Vous voulez nous contacter ?</h1>
                <p>Voici quelques methodes pour vous permettre de rentrer en contact avec nous</p>
                <div className="row">
                    <form className="col-lg-6 col-md-6 col-sm-12 needs-validation" onSubmit={e => this.handleContact(e)}>
                        <h2>Vous avez l'habitude des formulaire ?</h2>
                        <label className="col-form-label" htmlFor="inputFirstName">Prénom</label>
                        <input type="text" className="form-control" placeholder="Prénom" id="inputFirstName" value={this.state.firstName} onChange={ e => this.setState({firstName: e.target.value})}/>
                        <label className="col-form-label" htmlFor="inputLastName">Nom</label>
                        <input type="text" className="form-control" placeholder="Nom" id="inputLastName" value={this.state.lastName} onChange={ e => this.setState({lastName: e.target.value})}/>
                        <label className="col-form-label" htmlFor="inputEmail">Adresse Email</label>
                        <input type="text" className="form-control" placeholder="Adresse Email" id="inputEmail" required value={this.state.email} onChange={ e => this.setState({email: e.target.value})}/>
                        <label className="col-form-label" htmlFor="inputMood">Votre état actuel</label>
                        <select className="form-control" id="inputMood" defaultValue="Sélectionner" onChange={ e => this.setState({mood: e.target.value})}>
                            <option>Sélectionner</option>
                            <option>Très Satisfait</option>
                            <option>Content</option>
                            <option>Neutre</option>
                            <option>Perdu</option>
                            <option>En Colère</option>
                        </select>
                        <label className="col-form-label" htmlFor="inputReason">Raison du contact</label>
                        <select className="form-control" id="inputReason" defaultValue="Sélectionner" onChange={ e => this.setState({reason: e.target.value})}>
                            <option>Sélectionner</option>
                            <option>Demande d'information</option>
                            <option>Problème(s) rencontré(s)</option>
                            <option>Proposition d'amélioration</option>
                        </select>
                        <label className="col-form-label" htmlFor="inputDetails">Ce dont vous souhaitez nous parler</label>
                        <textarea className="form-control" id="inputDetails" rows="3" value={this.state.details} onChange={ e => this.setState({details: e.target.value})}/>
                        <button type="submit" className="btn btn-outline-primary col-lg-12 col-md-12 col-sm-12">Envoyer</button>
                    </form>
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <h2>Vous preferrez une autre methode ?</h2>
                    <label htmlFor="ourPhoneNumber" className="col-sm-6 col-form-label">Télephone</label>
                    <a href="tel:+33667092244" id="PhoneNumber">+33667092244</a>
                    <label htmlFor="ourEmail" className="col-sm-6 col-form-label">Adresse Email</label>
                    <a href="mailto:285212@supinfo.com?subject=Le sujet&cc=cc@example.com&bcc=bcc@example.com&body=Corps du mail" id="ourEmail">285212@supinfo.com</a>
                    <iframe title="GoogleMaps" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2784.762064523833!2d4.875539126831891!3d45.73586630873972!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47f4c1e579cbfab1%3A0x5c3bc3d972690f1!2sSUPINFO+Lyon!5e0!3m2!1sfr!2sfr!4v1526292738896" className="col-sm-12" height="400px" frameBorder="0" allowFullScreen></iframe>
                </div>
                </div>
            </div>
        );
    }
    handleContact(e){
        console.log("Submit form", this);
        e.preventDefault();
        let status = 200;
        const {
            firstName,
            lastName,
            email,
            mood,
            reason,
            details
        } =  this.state
        return fetch(`${SERVER_URL}/contact`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    mood,
                    reason,
                    details
                }),
            }
        ).then(
            response => {
                console.log("Response",response);
                status = response.status
                return response.json()
            },
            error => { console.log('An error occurred.', error); return false; }
        ).then(
            json => {
                this.notify({status, message: json})
            }
        );
    }

    notify = (responseJson) => {
        console.log(responseJson)
        if (responseJson.status === 200){
            toast.success(responseJson.message, {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }else{
            toast.error(responseJson.message, {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }
    };
}

export default ContactPage;