import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal, Button } from 'react-bootstrap';

import { withAuthentication, withAuthorization, withNav } from '../../hoc'
import { USER_ROLES } from '../../constants'
import * as Actions from '../../actions/actions.js'
import { PersonAPI } from '../../api'

import './admin.scss'

class Admin extends React.Component {
  state = {
    allPeople: [],
    showChangeUserRoleModal: false,
    selectedUser: {},
    selectedRole: null
  }

  componentDidMount = () => {
    this.refresh();
  }

  refresh = async() => {
    console.log("refresh");
    let allPeople = await PersonAPI.GetAllPersons();
    this.setState({
      allPeople: allPeople
    })
  }

  openChangeRole = (user) => {
    this.setState({
      showChangeUserRoleModal: true,
      selectedUser: user
    })
  }

  handleClose = () => {
    this.setState({
      showChangeUserRoleModal: false,
      selectedUser: {}
    })
  }

  handleSubmit = async() => {
    if(this.state.selectedUser) {
      let p = this.state.selectedUser;
      let res = PersonAPI.UpdatePerson(p.username,p.username,p.email,p.name,p.biography,p.password,this.state.selectedRole || p.role)
      .then(res => {
        console.log(res);
        console.log('Good');
        this.setState({
          showChangeUserRoleModal: false,
          selectedUser: {},
          selectedRole: null
        })
        this.refresh();
      })
      .catch(err => {
        console.error(err);
      })
    }
    else {
      console.error("No user selected");
      this.setState({
        showChangeUserRoleModal: false
      })
    }
  }

  render () {
    let peopleList = this.state.allPeople.map((person,i) => {
      let userRole;
      switch (person.role) {
        case USER_ROLES.ADMIN:
          userRole = 'Admin'
          break;
        case USER_ROLES.MOD:
          userRole = 'Moderator'
          break;
        case USER_ROLES.USER:
          userRole = 'User'
          break;
        default:

      }
      return (
        <div key={i} className='adminPersonCard'>
          <h5>{person.name}</h5>
          <p>Role: {userRole}</p>
          <p>{person.username}</p>
          <a onClick={() => this.openChangeRole(person)}>Change Role</a>
        </div>
      );
    })

    let selectedUserRole;

    if(this.state.selectedUser.name) {
      switch (this.state.selectedUser.role) {
        case USER_ROLES.ADMIN:
          selectedUserRole = 'Admin'
          break;
        case USER_ROLES.MOD:
          selectedUserRole = 'Moderator'
          break;
        case USER_ROLES.USER:
          selectedUserRole = 'User'
          break;
        default:

      }
    }

    return (
      <React.Fragment>
        <div className='adminPage'>
          <h1>Admin</h1>
          <div className='peopleList'>
            {peopleList}
          </div>
        </div>

        <Modal show={this.state.showChangeUserRoleModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.selectedUser.name}</Modal.Title>
            <p>Current Role: {selectedUserRole}</p>
          </Modal.Header>
          <Modal.Body>
            <Button
              style={{backgroundColor: this.state.selectedRole === USER_ROLES.USER ? 'blue' : ''}}
              onClick={() => this.setState({selectedRole: USER_ROLES.USER})}>
              User
            </Button>
            <Button
              style={{backgroundColor: this.state.selectedRole === USER_ROLES.MOD ? 'blue' : ''}}
              onClick={() => this.setState({selectedRole: USER_ROLES.MOD})}>
              Moderator
            </Button>
            <Button
              style={{backgroundColor: this.state.selectedRole === USER_ROLES.ADMIN ? 'blue' : ''}}
              onClick={() => this.setState({selectedRole: USER_ROLES.ADMIN})}>
              Admin
            </Button>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
            <Button onClick={this.handleSubmit}>Submit</Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {
    Actions: bindActionCreators(Actions, dispatch)
  };
}

export default compose(
  withNav,
  withAuthorization(USER_ROLES.ADMIN),
  connect(mapStateToProps,mapDispatchToProps)
)(Admin);
