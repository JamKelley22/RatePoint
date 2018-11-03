import React from 'react'
import { compose } from 'redux';

import { withAuthentication, withAuthorization, withNav } from '../../hoc'
import { USER_ROLES } from '../../constants'

import './moderation.scss'

class Moderation extends React.Component {
  render () {
    return (
      <div className='moderationPage'>
        <h1>Moderation</h1>
      </div>
    );
  }
}

export default compose(
  withNav,
  withAuthorization(USER_ROLES.MOD)
)(Moderation);
