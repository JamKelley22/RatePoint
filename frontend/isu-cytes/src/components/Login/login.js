import React from 'react'

import Navagation from '../Nav/navagation.js'
import { history, routes } from '../../history.js'

import './login.css'

class Login extends React.Component {

    loginRequest = () => {

    };

    render(){
        return(
            <div id="form">
                <form onSubmit={(e) => this.loginRequest(e)} noValidate autoComplete="off">
                    <p>email</p>
                    <input></input>

                </form>
            </div>
        );
    }
}

export default Login;