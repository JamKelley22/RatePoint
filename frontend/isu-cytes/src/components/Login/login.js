import React from 'react'

import Navagation from '../Nav/navagation.js'
import { history, routes } from '../../history.js'

import './login.css'

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    loginRequest = (e) => {
        e.preventDefault();
        const formdata = new FormData(e.target);

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
                            <input maxLength="20" autoComplete="off"/>
                            <br/><br/>
                            <b>password:</b>
                            <input type="password" maxLength="32" autoComplete="off"/>
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