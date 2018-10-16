import React from 'react'

import Navagation from '../Nav/navagation.js'
import { history, routes } from '../../history.js'

import './createAccount.scss'

class CreateAccount extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            pass1: '',
            pass2: '',
            error: null
        };
    }

    validatePassword = (pass, passCon) => {
        if (pass !== passCon) {
            this.setState({
                error: 'Passwords do not match'
            });
            return true;
        }
        if (pass.length < 8) {
            this.setState({
                error: 'password must be atleast 8 characters'
            });
            return true;
        }
        let symbol = /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(pass);
        if (!symbol) {
            this.setState({
                error: 'password must include at least one symbol'
            });
            return true;
        }
        let symbol2 = /abcdefghijklmnopqrstuvwxyz/g.test(pass);
        if (!symbol2) {
            this.setState({
                error: 'password must include at least one lower case character'
            });
            return true;
        }
        let symbol3 = /ABCDEFGHIJKLMNOPQRSTUVWXYZ/g.test(pass);
        if (!symbol3) {
            this.setState({
                error: 'password must include at least one upper case character'
            });
            return true;
        }
        this.setState({
            error: null
        });
        return false;
    };

    createRequest = async(e) => {
        e.preventDefault();
        if(this.validatePassword(this.state.pass1,this.state.pass2)){
            console.error("Form Invalid");
            //Some error in form
            return;
        }
        /*if(this.checkError()) {
          console.error("Form Invalid");
          //Some error in form
          return;
        }*/
        console.log("no error");
        console.log("Username: " + this.state.username);
        console.log("Email: " + this.state.email);
        console.log("Password: " + this.state.pass1);

        //Make post request
        let response = await fetch('http://proj309-tg-03.misc.iastate.edu:8080/people/new', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'username': "this.state.username",
            'email': "this.state.email",
            'name': "this.state.username",
            'password': "this.state.pass1",
            'biography': 'Bio'
          })
        });
        console.log(response);
        //const data = await response.json();

        //console.log(data);

        this.setState({username:'',email:'', pass1:'', pass2:''});
    };

    checkError = () => {
      //No empty fields

      //Compare Passwords
      if(this.state.pass1 !== this.state.pass2) {
        this.setState({
          error: 'Passwords do not match'
        })
        return true;
      }
      else {
        this.setState({
          error: null
        })
        return false;
      }

      //Check email valid format

      //Check username for foul language
    };

    /*
    Use in future for forms
    onElementChange = (e) => {
      console.log([e.target.name]);
      this.setState({
        [e.target.name]: e.target.value
      })
    }
    */

    usernameChange = (e) => {
        this.setState({ username: e.target.value });
    };

    emailChange = (e) => {
        this.setState({ email: e.target.value });
    };

    pass1Change = (e) => {
      this.setState({ pass1: e.target.value });
    }

    pass2Change = (e) => {
      this.setState({ pass2: e.target.value });
    }

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
                                       onChange={this.emailChange} required onBlur={this.checkError}/>
                                <br/><br/>
                                <b>username:</b>
                                <input maxLength="20" autoComplete="off" value={this.state.username}
                                       onChange={this.usernameChange} required onBlur={this.checkError}/>
                                <br/><br/>
                                <b>password:</b>
                                <input type="password" maxLength="32" autoComplete="off" id="pass1" required
                                  onChange={this.pass1Change} onBlur={this.checkError}/>
                                <br/><br/>
                                <b>confirm password:</b>
                                <input type="password" maxLength="32" autoComplete="off" id="pass2" required
                                  onChange={this.pass2Change} onBlur={this.checkError}/>
                                <br/><br/>
                                <input type="submit" value="Submit" id="createSubmit"/>
                            </form>
                        </div>
                    </div>
                    {
                      this.state.error
                      &&
                      <div className='formError'>
                        {this.state.error}
                      </div>
                    }
                </div>
            </React.Fragment>
        );
    }
}

export default CreateAccount;
