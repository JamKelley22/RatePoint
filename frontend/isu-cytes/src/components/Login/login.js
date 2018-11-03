import React from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import bcrypt from 'bcryptjs';

import Navagation from '../Nav/navagation.js'
import { history, routes } from '../../history.js'
import * as Actions from '../../actions/actions.js'
import { RatePointWebSocket } from '../../api'
import { caesarShift } from '../../security/security.js'

import './login.css'

class Login extends React.Component {
  state = {
    username: '',
    pass: ''
  }

  usernameChange = (e) => {
    this.setState({ username: e.target.value });
  };


  passChange = (e) => {
    this.setState({ pass: e.target.value });
  };

  onSubmitLogin = async(e) => {
      e.preventDefault();
      if(this.formHasError()) {
        console.error("Form has error");
        return;
      }
      this.hashPasswordThenLogin(this.state.pass);
  };

  formHasError = () => {
    return !(this.state.username.length > 0 && this.state.pass.length > 0);
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
      console.log(person);
      if(person.error) {
        //Unsuscessful Login
        alert(person.error)
      }
      else {
        //Suscessful Login
        console.log("=====Logged In=====");
        RatePointWebSocket.connect(person.username)
      }
    })
    .catch(err => {
      alert("Log in error: " + err);
    })
  }

  render(){
      return(
          <React.Fragment>
              <Navagation/>
              <div id="containerLogin">
                  <div id="formLogin">
                      <b id="loginHeader">Login</b>
                      <form onSubmit={(e) => this.onSubmitLogin(e)} noValidate autoComplete="off">
                          <br/>
                          <b>username:</b>
                          <input maxLength="20" autoComplete="off" value={this.state.username}
                                 onChange={this.usernameChange} />
                          <br/><br/>
                          <b>password:</b>
                          <input type="password" maxLength="32" autoComplete="off" id="pass"
                                 onChange={this.passChange} onBlur={this.checkError}/>
                          <br/><br/>
                          <input type="submit" value="Login"/>
                      </form>
                  </div>
              </div>
          </React.Fragment>
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

export default connect(mapStateToProps,mapDispatchToProps)(Login);
