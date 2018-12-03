import React from 'react'
import bcrypt from 'bcryptjs'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux';
import Recaptcha from 'react-recaptcha'
import { Redirect } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router-dom';

import Navagation from '../Nav/navagation.js'
import { history, routes } from '../../history.js'
import { RECAPTCHA_SITE_KEY } from '../../constants'
import { RecaptchaAPI, RatePointWebSocket } from '../../api'
import * as Actions from '../../actions/actions.js'
import { caesarShift } from '../../security/security.js'
import { withAuthentication } from '../../hoc'
import Logo from '../../images/logo.png'
import { Button } from '../../util'

import './createAccount.scss'

let recaptchaInstance;

class CreateAccount extends React.Component {
    state = {
        username: '',
        name: '',
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
          name: this.state.name,
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
      if(history.location === routes._LOGIN || history.location === routes._CREATEACCOUNT) {

      }
      else {

      }
        return(
          <div className="loginPage">
            <div className='clickableContent'>
              <div className='login__topBar'>
                <a className='arrow' onClick={() => history.goBack()}><FontAwesomeIcon icon="arrow-left" /></a>
                <NavLink to={routes._LOGIN}>Login</NavLink>
              </div>
              <div className="loginFormWrapper">
                <div className="createAccountForm">
                  <div ><img className='login__logo' src={Logo} alt='Logo'/></div>

                    <form onSubmit={(e) => this.createRequest(e)} noValidate autoComplete="off">
                        <div className='createAccountFormItem'>
                          <b>name:</b>
                          <input type="text" maxLength="20" autoComplete="off"
                                 onChange={this.handleInputChange} required onBlur={this.checkError} name='name' value={this.state.name}/>
                        </div>

                        <div className='createAccountFormItem'>
                         <b>email:</b>
                         <input type="email" maxLength="32" autoComplete="off"
                                onChange={this.handleInputChange} required onBlur={this.checkError} name='email' value={this.state.email}/>
                       </div>

                        <div className='createAccountFormItem'>
                         <b>username:</b>
                           <input type="text" maxLength="20" autoComplete="off"
                                  onChange={this.handleInputChange} required onBlur={this.checkError} name='username' value={this.state.username}/>
                        </div>

                         <div className='createAccountFormItem'>
                           <b>password:</b>
                             <input type="password" maxLength="32" autoComplete="off" id="pass1"
                               onChange={this.handleInputChange} onBlur={this.checkError} name='pass1' value={this.state.pass1}/>
                         </div>

                        <div className='createAccountFormItem'>
                          <b>confirm password:</b>
                            <input type="password" maxLength="32" autoComplete="off" id="pass2"
                                onChange={this.handleInputChange} onBlur={this.checkError} name='pass2' value={this.state.pass2}/>
                        </div>
                        <div className='createAccountFormItem'>
                          <input type="submit" value="Submit" id="createSubmit"/>
                        </div>
                    </form>

          {
            /*
            <form onSubmit={(e) => this.onSubmitLogin(e)}>
                <label>Username</label>
                <input
                  type="text"
                  maxLength="20"
                  value={this.state.username}
                  name='username'
                  onBlur={this.checkError}
                  onFocus={this.checkError}
                  onChange={this.handleInputChange}
                />
              <label className='passLabel'>Password
                <div className='passInput'>
                  <input
                    type="password"
                    type={this.state.inputType}
                    maxLength="32"
                    name='pass'
                    onChange={this.handleInputChange}
                    onBlur={this.checkError}
                    onFocus={this.checkError}
                    value={this.state.pass}
                  />
                  <span className="password-trigger" onClick={() => this.setState({inputType: this.state.inputType === 'password' ? 'text' : 'password'})}>
                    <FontAwesomeIcon icon={this.state.inputType === 'password' ? 'eye' : 'eye-slash'} />
                  </span>
                </div>
              </label>
              <div >
                <div className='submitBtn'><Button name='Log In' size='medium' onClick={this.onSubmitLogin}/></div>
                <hr/>
                <div className='login__formFooter'>
                  {
                    this.state.error
                    &&
                    <div className='errorBox'>{this.state.error}</div>
                  }
                </div>
              </div>
            </form>
            */
          }
                </div>
              </div>
            </div>

            <div className="angles">
              <svg className="angle bottom-angle" viewBox="0 0 1440 128">
                <polygon className='angle' points="1440 957.884 0 894.563 0 1021.205 1440 1021.205" transform="translate(0 -894)"></polygon>
              </svg>

              <svg className="angle bottom-right-angle" viewBox="0 0 1056 215">
                <polygon className='angle' points="1440 807.75 384.781 1021.205 1440 1021.205" transform="translate(-384 -807)"></polygon>
              </svg>

              <svg className="angle bottom-right-large-angle" viewBox="0 0 1440 425">
                <polygon className='angle' points="0 1001.5 0 1024 1440 1024 1440 599.055" transform="translate(0 -599)"></polygon>
              </svg>

              <svg className="angle top-left-angle" viewBox="0 0 1440 254">
                <polygon className='angle' points="0 253.305 0 0 1440 0 1440 58.969" opacity=".15"></polygon>
              </svg>

              <svg className="angle top-right-angle" viewBox="0 0 720 134">
                <polygon className='angle' points="720 0 1439.938 0 1439.938 133.984" transform="translate(-720)" ></polygon>
              </svg>

              <Recaptcha
                ref={e => recaptchaInstance = e}
                sitekey={RECAPTCHA_SITE_KEY}
                size="invisible"
                verifyCallback={this.verifyCallback}
              />

            {
              this.state.error
              &&
              <div>
                {this.state.error}
              </div>
            }
            </div>

            {
              /*
              <div id="containerCreate">
                  <div id="formCreate">
                      <b id="createHeader">Create Account</b>
                      <div id="positionForm">
                          <form onSubmit={(e) => this.createRequest(e)} noValidate autoComplete="off">
                              <br/>
                              <b>name:</b>
                              <input type="text" maxLength="20" autoComplete="off"
                                     onChange={this.handleInputChange} required onBlur={this.checkError} name='name' value={this.state.name}/>
                              <br/><br/>
                              <b>email:</b>
                              <input type="email" maxLength="32" autoComplete="off"
                                     onChange={this.handleInputChange} required onBlur={this.checkError} name='email' value={this.state.email}/>
                              <br/><br/>
                              <b>username:</b>
                              <input type="text" maxLength="20" autoComplete="off"
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

              </div>
              */
            }
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
  connect(mapStateToProps,mapDispatchToProps)
)(CreateAccount);
