import React from 'react'
import { connect } from 'react-redux'

import Navagation from '../Nav/navagation.js'
import { history, routes } from '../../history.js'

import './login.css'

class Login extends React.Component {
  state = {
    username: '',
    pass1: ''
  }

  loginRequest = async(e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    let body = JSON.stringify({
      username: this.state.username,
      password: this.state.pass1,
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
        <button onClick={() => this.props.login({userName: 'testName'})}>Login</button>
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

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    login: (info) => {
      dispatch({type: 'LOGIN', payload: info})
    }
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);
