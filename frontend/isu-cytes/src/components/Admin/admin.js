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
    selectedUser: null
  }

  componentDidMount = async() => {
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
      selectedUser: null
    })
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
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
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
