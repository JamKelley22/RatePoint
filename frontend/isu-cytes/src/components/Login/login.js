import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux';
import bcrypt from 'bcryptjs';
import { Redirect } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router-dom';

import { withAuthentication } from '../../hoc'
import { history, routes } from '../../history.js'
import * as Actions from '../../actions/actions.js'
import { RatePointWebSocket } from '../../api'
import { caesarShift } from '../../security/security.js'
import { Button } from '../../util'

import Logo from '../../images/logo.png'
import './login.scss'

class Login extends React.Component {
  state = {
    username: '',
    pass: '',
    error: '',
    inputType: 'password'
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  onSubmitLogin = async(e) => {
      e.preventDefault();
      let err = this.formHasError();
      if(err) {
        this.setState({
          error: err
        })
        return;
      }
      this.hashPasswordThenLogin(this.state.pass);
  };

  checkError = () => {
    let err = this.formHasError();
    this.setState({
      error: err
    })
  }

  formHasError = () => {
    if(this.state.username.length === 0) {
      return 'Please enter your username '
    }
    else if(this.state.pass.length === 0) {
      return 'Please enter your password '
    }
    else {
      return null;
    }
    //Do error checking
    //Fields not empty
    //password length
  }

  hashPasswordThenLogin = async(password) => {
    //bcrypt.hash(password, 10, (err, hash) => this.doLoginRequest(err,hash));
    this.doLoginRequest(null,caesarShift(password));//For now...
    // TODO: Get the backend the hash and have them check it
  }

  doLoginRequest = async(err,hashedPassword) => {
    this.props.Actions.loginUser(this.state.username,hashedPassword)
    .then(person => {
      //Suscessful Login
      console.log("=====Logged In=====");
      RatePointWebSocket.connect(person.username)
      history.push(routes._HOME)
    })
    .catch(err => {
      console.log(err.error.message);
      this.setState({
        error: err.error.message
      })
    })
  }

  render(){
    if(this.props.user) {
      //Already Logged in
      return (
        <Redirect to={routes._HOME}/>
      )
    }
      return(
        <div className="loginPage">
          <div className='clickableContent'>
            <div className='login__topBar'>
              <a className='arrow' onClick={() => history.goBack()}><FontAwesomeIcon icon="arrow-left" /></a>
              <NavLink to={routes._CREATEACCOUNT}>Sign Up</NavLink>
            </div>
            <div className="loginFormWrapper">
              <div className="loginForm">
                <div ><img className='login__logo' src={Logo} alt='Logo'/></div>
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
                    <input
                      type="password"
                      type={this.state.inputType}
                      maxLength="32"
                      className="passInput"
                      name='pass'
                      onChange={this.handleInputChange}
                      onBlur={this.checkError}
                      onFocus={this.checkError}
                      value={this.state.pass}
                    />
                  <span className="password-trigger" onClick={() => this.setState({inputType: this.state.inputType === 'password' ? 'text' : 'password'})}>
                    <FontAwesomeIcon icon={this.state.inputType === 'password' ? 'eye' : 'eye-slash'} />
                  </span>
                  </label>
                  {
                    this.state.error
                    &&
                    <div className='errorBox'>{this.state.error}</div>
                  }
                  <div className={this.state.error ? 'moveError' : ''}>
                    <div className='submitBtn'><Button name='Log In' size='medium' onClick={this.onSubmitLogin}/></div>
                    <hr/>

                    <div className='login__formFooter'>

                    </div>
                  </div>
                </form>
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
          </div>
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
)(Login);
