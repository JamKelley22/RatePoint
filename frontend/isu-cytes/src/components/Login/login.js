import React from 'react'
import bcrypt from 'bcryptjs';
import Navagation from '../Nav/navagation.js'
import { history, routes } from '../../history.js'

import './login.css'

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            pass1: ''
        };
    }

    loginRequest = async(e) => {
        e.preventDefault();
        bcrypt.hash(this.state.pass1, 10, (err, hash) => {
            console.log(hash);
            let hashedPass = hash;
        });
        let body = JSON.stringify({
            username: this.state.username,
            password: hashedPass,
        });
        let response = await fetch('http://proj309-tg-03.misc.iastate.edu:8080/people/validate', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
        });
        console.log(response);
        this.setState({username:'',pass1:''});
    };

    usernameChange = (e) => {
        this.setState({ username: e.target.value });
    };

    pass1Change = (e) => {
        this.setState({ pass1: e.target.value });
    };

    render(){
        return(
            <React.Fragment>
                <Navagation/>
                <div id="containerLogin">
                    <div id="formLogin">
                        <b id="loginHeader">Login</b>
                        <form onSubmit={(e) => this.loginRequest(e)} noValidate autoComplete="off">
                            <br/>
                            <b>username:</b>
                            <input maxLength="20" autoComplete="off" value={this.state.username}
                                   onChange={this.usernameChange} />
                            <br/><br/>
                            <b>password:</b>
                            <input type="password" maxLength="32" autoComplete="off" id="pass1"
                                   onChange={this.pass1Change} onBlur={this.checkError}/>
                            <br/><br/>
                            <input type="submit" value="Login"/>
                        </form>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Login;