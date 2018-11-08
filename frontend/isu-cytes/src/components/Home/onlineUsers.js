import React from 'react'
import PropTypes from 'prop-types'
import { history, routes } from '../../history.js'

const OnlineUsers = (props) => {
  console.log(props.onlineUserList);
  return (
    <div className='onlineUsersComponent'>
      <h2>Online Users</h2>
      <h3>Me</h3>
      <div
        className='onlineUser'>
        {props.me.username}
        <a
          onClick={() => history.push(routes._ACCOUNT)}>
          View
        </a>
      </div>
      <h3>Others</h3>
      {
        props.onlineUserList.map((username,i) => {
          if(username !== props.me.username) {
            return (
              <div
                className='onlineUser'
                key={i}>
                Username: {username}
                <a
                  onClick={() => props.onUserClick(username)}>
                  View
                </a>
              </div>
              )
            }
          })
        }
    </div>
  )
}

export default OnlineUsers;

OnlineUsers.propTypes = {
  me: PropTypes.object,
  onlineUserList: PropTypes.array,
  onUserClick: PropTypes.func
}

OnlineUsers.defaultProps = {
  me: {
    id: 1,
    username: "jDefault",
    name: "Joe Default",
    email: "email@example.com",
    biography: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    role: 0,
    lists: []
  },
  onlineUserList: [],
  onUserClick: (username) => {console.log(`Clicked user ${username} but function not specified`);}
}
