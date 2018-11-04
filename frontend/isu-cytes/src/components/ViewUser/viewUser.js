import React from 'react'
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux'

import { withAuthentication, withNav } from '../../hoc'
import * as Actions from '../../actions/actions.js'
import { USER_ROLES } from '../../constants'

import './viewUser.scss'

const User = (props) => {
  let role;
  switch (props.selectedUser.role) {
    case USER_ROLES.USER:
      role = 'User'
      break;
    case USER_ROLES.MOD:
      role = 'Mod'
      break;
    case USER_ROLES.ADMIN:
      role = 'Admin'
      break;
    default:
      role = '???'
  }
  return (
    <div className='userPage'>
      <h1>View User</h1>
      Name: {props.selectedUser.name}<br/>
      Username: {props.selectedUser.username}<br/>
      Biography: {(props.selectedUser.biography.length > 0) ? props.selectedUser.biography : 'No Bio'}<br/>
      User Role: {role}
    </div>
  )
}

function mapStateToProps(state) {
  return {
    selectedUser: state.user.selectedUser
  };
}

function mapDispatchToProps(dispatch) {
  return {
    Actions: bindActionCreators(Actions, dispatch)
  };
}

export default compose(
  withAuthentication,
  withNav,
  connect(mapStateToProps,mapDispatchToProps)
)(User);
