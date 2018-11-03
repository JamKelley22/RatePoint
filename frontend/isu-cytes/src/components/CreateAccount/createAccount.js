import React from 'react'
import bcrypt from 'bcryptjs'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';

import Navagation from '../Nav/navagation.js'
import { history, routes } from '../../history.js'
import { RatePointWebSocket } from '../../api'
import * as Actions from '../../actions/actions.js'
import { caesarShift } from '../../security/security.js'

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

        if(false) {//===============================================================
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
            console.log(person);
            if(person.error) {
              //Unsuscessful Create
              alert(person.error)
            }
            else {
              //Suscessful Login
              alert("Created User")
              RatePointWebSocket.connect(person.username)
            }
          })
          .catch(err => {
            alert("Log in error: " + err);
          })

        })

        //this.setState({username:'',email:'', pass1:'', pass2:''});
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
    };

    pass2Change = (e) => {
      this.setState({ pass2: e.target.value });
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
                                <input type="email" maxLength="32" autoComplete="off" value={this.state.email}
                                       onChange={this.emailChange} required onBlur={this.checkError}/>
                                <br/><br/>
                                <b>username:</b>
                                <input maxLength="20" autoComplete="off" value={this.state.username}
                                       onChange={this.usernameChange} required onBlur={this.checkError}/>
                                <br/><br/>
                                <b>password:</b>
                                <input type="password" maxLength="32" autoComplete="off" id="pass1"
                                  onChange={this.pass1Change} onBlur={this.checkError}/>
                                <br/><br/>
                                <b>confirm password:</b>
                                <input type="password" maxLength="32" autoComplete="off" id="pass2"
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

export default connect(mapStateToProps,mapDispatchToProps)(CreateAccount);
