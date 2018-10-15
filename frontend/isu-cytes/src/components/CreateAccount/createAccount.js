import React from 'react'

import Navagation from '../Nav/navagation.js'
import { history, routes } from '../../history.js'

import './createAccount.css'

class CreateAccount extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: ''
        };
    }

    validatePassword = (pass, passCon) => {
        if(pass!==passCon){
            alert("passwords not the same");
            return false;
        }
        if(pass.length<8){
            alert("password must be atleast 8 characters");
            return false;
        }
        let symbol = /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(pass);
        if(!symbol){
            alert("password must include at least one symbol");
            return false;
        }
        let symbol2 = /abcdefghijklmnopqrstuvwxyz/g.test(pass);
        if(!symbol2){
            alert("password must include at least one lower case character");
            return false;
        }
        let symbol3 = /ABCDEFGHIJKLMNOPQRSTUVWXYZ/g.test(pass);
        if(!symbol3){
            alert("password must include at least one upper case character");
            return false;
        }
        return true;
    };

    createRequest = (e) => {
        e.preventDefault();
        const formdata = new FormData(e.target);
        let pass1 = document.getElementById('pass1').value;
        let pass2 = document.getElementById('pass2').value;
        if(!this.validatePassword(pass1,pass2)){
            return;
        }
        //encrypt
        //fetch
        document.getElementById('pass1').value='';
        document.getElementById('pass2').value='';
        this.setState({username:'',email:''});
    };

    usernameChange = (e) => {
        this.setState({ username: e.target.value });
    };

    emailChange = (e) => {
        this.setState({ email: e.target.value });
    };

    render(){
        return(
            <React.Fragment>
                <Navagation/>
                <div id="containerCreate">
                    <div id="formCreate">
                        <b id="createHeader">Create Account</b>
                        <div id="positionForm">
                            <form onSubmit={(e) => this.createRequest(e)} noValidate autoComplete="off">
                                <br/>
                                <b>email:</b>
                                <input maxLength="32" autoComplete="off" value={this.state.email}
                                       onChange={this.emailChange} required/>
                                <br/><br/>
                                <b>username:</b>
                                <input maxLength="20" autoComplete="off" value={this.state.username}
                                       onChange={this.usernameChange} required/>
                                <br/><br/>
                                <b>password:</b>
                                <input type="password" maxLength="32" autoComplete="off" id="pass1" required/>
                                <br/><br/>
                                <b>confirm password:</b>
                                <input type="password" maxLength="32" autoComplete="off" id="pass2" required/>
                                <br/><br/>
                                <input type="submit" value="Submit" id="createSubmit"/>
                            </form>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default CreateAccount;