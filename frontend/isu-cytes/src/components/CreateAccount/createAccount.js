import React from 'react'
import bcrypt from 'bcryptjs'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux';

import Navagation from '../Nav/navagation.js'
import { history, routes } from '../../history.js'
import { RatePointWebSocket } from '../../api'
import * as Actions from '../../actions/actions.js'
import { caesarShift } from '../../security/security.js'
import { withAuthentication, withNav } from '../../hoc'

import './createAccount.scss'

class CreateAccount extends React.Component {
    state = {
        username: '',
        email: '',
        pass1: '',
        pass2: '',
        error: null
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
        let symbol = /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/.test(pass);
        if (!symbol) {
            this.setState({
                error: 'password must include at least one symbol'
            });
            return true;
        }
        let symbol2 = /[a-z]/.test(pass);
        if (!symbol2) {
            this.setState({
                error: 'password must include at least one lower case character'
            });
            return true;
        }
        let symbol3 = /[A-Z]/.test(pass);
        if (!symbol3) {
            this.setState({
                error: 'password must include at least one upper case character'
            });
            return true;
        }
        let symbol4 = /[0-9]/.test(pass);
        if (!symbol4) {
            this.setState({
                error: 'password must include at least one number'
            });
            return true;
        }
        this.setState({
            error: null
        });
        return false;
        //Check email valid format
        //Check username for foul language
    };

    createRequest = async(e) => {
        e.preventDefault();

        if(false) {// TODO: Remove this line
          if(this.validatePassword(this.state.pass1,this.state.pass2)){
              console.error("Form Invalid");
              //Some error in form
              return;
          }
        }


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
            this.setState({username:'',email:'', pass1:'', pass2:''});
            history.push(routes._HOME)
          })
          .catch(err => {
            alert(err.error);
          })

        })
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


    handleInputChange = (event) => {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;

      this.setState({
        [name]: value
      });
    }

    render(){
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
                this.state.error
                &&
                <div className='formError'>
                  {this.state.error}
                </div>
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
  connect(mapStateToProps,mapDispatchToProps),
  withNav
)(CreateAccount);
