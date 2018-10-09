import React from 'react'

import Navagation from '../Nav/navagation.js'
import { history, routes } from '../../history.js'

import './createAccount.css'

class CreateAccount extends React.Component {

    createRequest = (e) => {
        e.preventDefault();
        const formdata = new FormData(e.target);
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
                                <input maxLength="32" autoComplete="off"/>
                                <br/><br/>
                                <b>username:</b>
                                <input maxLength="20" autoComplete="off"/>
                                <br/><br/>
                                <b>password:</b>
                                <input type="password" maxLength="32" autoComplete="off"/>
                                <br/><br/>
                                <b>confirm password:</b>
                                <input type="password" maxLength="32" autoComplete="off"/>
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