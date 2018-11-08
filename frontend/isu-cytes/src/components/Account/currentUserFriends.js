import React from 'react'
import PropTypes from 'prop-types'

import './account.scss'

const CurrentUserFriends = (props) => {
  return (
    <div className='tabContent currentUserFriendsComponent'>
      <div className='friendItem'>Tom</div>
      <div className='friendItem'>Jerry</div>
      <div className='friendItem'>Spike</div>
    </div>
  )
}

export default CurrentUserFriends;

CurrentUserFriends.propTypes = {
  friends: PropTypes.array
}

CurrentUserFriends.defaultProps = {
  friends: []
}
