import React from 'react'

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

    loginRequest = (e) => {
        e.preventDefault();
        const formdata = new FormData(e.target);

        this.setState({username:'',pass1:''});
    };

    usernameChange = (e) => {
        this.setState({ username: e.target.value });
    };

    pass1Change = (e) => {
        this.setState({ pass1: e.target.value });
    }

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
                                   onChange={this.usernameChange} required/>
                            <br/><br/>
                            <b>password:</b>
                            <input type="password" maxLength="32" autoComplete="off" id="pass1" required
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