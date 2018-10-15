import React from 'react'

import Navagation from '../Nav/navagation.js'
import { history, routes } from '../../history.js'

import './createAccount.scss'

class CreateAccount extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: ''
        };
    }

    createRequest = (e) => {
        e.preventDefault();
        const formdata = new FormData(e.target);
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
