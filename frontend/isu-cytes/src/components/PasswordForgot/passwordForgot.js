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
class PasswordForgot extends React.Component {
  state = {
    username: '',
    error: ''
  }

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
        <div className="loginPage">
          <div className='clickableContent'>
            <div className='login__topBar'>
              <a className='arrow' onClick={() => history.goBack()} ><FontAwesomeIcon icon="arrow-left" /></a>
            </div>
            <div className="loginFormWrapper">
              <div className="loginForm">
                <div ><img className='login__logo' src={Logo} alt='Logo'/></div>
                <form onSubmit={(e) => e.preventDefault()}>
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
                  {
                    this.state.error
                    &&
                    <div className='errorBox'>{this.state.error}</div>

                  }
                  <div className={this.state.error ? 'moveError' : ''}>
                    <div className='submitBtn'><Button name='Email Me' size='medium' onClick={this.onSubmitLogin}/></div>
                    <hr/>

                    <div className='login__formFooter'>
                      <a onClick={() => history.push(routes._SIGNUP)}>Sign Up</a>
                      <a onClick={() => history.push(routes._CREATEACCOUNT)}>Join</a>
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
)(PasswordForgot);
