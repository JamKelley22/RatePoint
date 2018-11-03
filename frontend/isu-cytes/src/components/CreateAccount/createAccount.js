import React from 'react'
import bcrypt from 'bcryptjs'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux';
import Recaptcha from 'react-recaptcha'
import { Redirect } from 'react-router-dom'

import Navagation from '../Nav/navagation.js'
import { history, routes } from '../../history.js'
import { RECAPTCHA_SITE_KEY } from '../../constants'
import { RecaptchaAPI, RatePointWebSocket } from '../../api'
import * as Actions from '../../actions/actions.js'
import { caesarShift } from '../../security/security.js'
import { withAuthentication, withNav } from '../../hoc'

import './createAccount.scss'

let recaptchaInstance;

class CreateAccount extends React.Component {
    state = {
        username: '',
        email: '',
        pass1: '',
        pass2: '',
        error: []
    }

    validatePassword = (pass, passCon) => {
        if (pass !== passCon) {
          return 'Passwords do not match'
        }
        if (pass.length < 8) {
          return 'password must be atleast 8 characters';
        }
        let symbol = /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/.test(pass);
        if (!symbol) {
          return 'password must include at least one symbol';
        }
        let symbol2 = /[a-z]/.test(pass);
        if (!symbol2) {
          return 'password must include at least one lower case character';
        }
        let symbol3 = /[A-Z]/.test(pass);
        if (!symbol3) {
          return 'password must include at least one upper case character';
        }
        let symbol4 = /[0-9]/.test(pass);
        if (!symbol4) {
          return 'password must include at least one number';
        }
        return null;
        //Check email valid format
        //Check username for foul language
    };

    validateForm = () => {
      let errors = []
      if(this.state.username.length === 0) {
        errors.push("Please Enter Username")
      }
      if(this.state.email.length === 0) {
        errors.push("Please Enter Email")
      }
      if(this.state.pass1.length === 0) {
        errors.push("Please Enter Password")
      }
      if(this.state.pass2.length === 0) {
        errors.push("Please Repeat Password")
      }
      /*
      let passError = this.validatePassword(this.state.pass1,this.state.pass2)
      if(passError)
        errors.push(passError)
      */

      this.setState({
        error: errors
      })

      return errors.length === 0;//Return true valid if 0 errors
    }

    createRequest = async(e) => {
        e.preventDefault();

        if(!this.validateForm()) {
            console.error("Invalid Form");
            return;
        }

        if(recaptchaInstance)
          recaptchaInstance.execute(RECAPTCHA_SITE_KEY, {action: 'create_account'})//will then call verifyCallback
        else
          console.error("No reCAPTCHA!");
    };

    verifyCallback = async(response) => {
      //DO NOT CHANGE ABOVE LINE, IT STOPS WORKING IF YOU DO
      let serverResponse = await RecaptchaAPI.DoVerifyRecaptcha(response)
      /*
      serverResponse
      {
      "success": true|false,      // whether this request was a valid reCAPTCHA token for your site
      "score": number             // the score for this request (0.0 - 1.0)
      "action": string            // the action name for this request (important to verify)
      "challenge_ts": timestamp,  // timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
      "hostname": string,         // the hostname of the site where the reCAPTCHA was solved
      "error-codes": [...]        // optional
      }
      */
      if(serverResponse.success) {
        this.attemptCreateUser();
      }
      else {
        this.setState({
          error: ["Failed reCAPTCHA"]
        })
      }
    }

    attemptCreateUser = () => {
      bcrypt.hash(this.state.pass1, 10,(err, hashedPassword) => {

        let personProps = {
          username: this.state.username,
          email: this.state.email,
          name: this.state.username,
          password: caesarShift(this.state.pass1),// TODO: Remove this trash
          biography: ''
        };

        this.props.Actions.createUser(personProps.username,personProps.email,personProps.name,personProps.biography,personProps.password)
        .then(person => {
          //Suscessful Login
          RatePointWebSocket.connect(person.username)
          //this.setState({username:'',email:'', pass1:'', pass2:''});
          history.push(routes._HOME)
        })
        .catch(err => {
          alert(err.error);
        })

      })
    }

    checkError = () => {
      //Check for empty on blur
    };


    handleInputChange = (event) => {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;

      this.setState({
        [name]: value
      });
    }

    render(){
      if(this.props.user) {
        //Already Logged in
        return (
          <Redirect to={routes._HOME}/>
        )
      }
        return(
          <div id="containerCreate">
              <div id="formCreate">
                  <b id="createHeader">Create Account</b>
                  <div id="positionForm">
                      <form onSubmit={(e) => this.createRequest(e)} noValidate autoComplete="off">
                          <br/>
                          <b>email:</b>
                          <input type="email" maxLength="32" autoComplete="off" value={this.state.email}
                                 onChange={this.handleInputChange} required onBlur={this.checkError} name='email' value={this.state.email}/>
                          <br/><br/>
                          <b>username:</b>
                          <input maxLength="20" autoComplete="off" value={this.state.username}
                                 onChange={this.handleInputChange} required onBlur={this.checkError} name='username' value={this.state.username}/>
                          <br/><br/>
                          <b>password:</b>
                          <input type="password" maxLength="32" autoComplete="off" id="pass1"
                            onChange={this.handleInputChange} onBlur={this.checkError} name='pass1' value={this.state.pass1}/>
                          <br/><br/>
                          <b>confirm password:</b>
                          <input type="password" maxLength="32" autoComplete="off" id="pass2"
                            onChange={this.handleInputChange} onBlur={this.checkError} name='pass2' value={this.state.pass2}/>
                          <br/><br/>
                          <input type="submit" value="Submit" id="createSubmit"/>
                      </form>
                  </div>
              </div>
              {
                this.state.error.length > 0
                &&
                <div className='formError'>
                  {this.state.error}
                </div>
              }
              <Recaptcha
                ref={e => recaptchaInstance = e}
                sitekey={RECAPTCHA_SITE_KEY}
                size="invisible"
                verifyCallback={this.verifyCallback}
              />
          </div>
        );
    }
}

function mapStateToProps(state) {
  return {
    user: state.user.currUser
  }
}

function mapDispatchToProps(dispatch) {
  return {
    Actions: bindActionCreators(Actions, dispatch)
  };
}

export default compose(
  withNav,
  connect(mapStateToProps,mapDispatchToProps)
)(CreateAccount);
