import React from 'react'
import PropTypes from 'prop-types'
import { history, routes } from '../../history.js'

class OnlineUsers extends React.Component {
  state = {
    open: false
  }
  render() {
    return (
      <div className='onlineUsersComponent'>
        <a className='openListBtn' onClick={() => this.setState({open: !this.state.open})}>Online Users</a>
        <div className={`onlineUsersList ${this.state.open ? '' : 'closed'}`}>
          {
            this.props.onlineUserList.map((username,i) => {
              //if(username !== props.me.username) {
                return (
                  <div
                    className='onlineUser'
                    key={i}>
                    Username: {username}
                    <a
                      onClick={() => this.props.onUserClick(username)}>
                      View
                    </a>
                  </div>
                  )
                }
              )//})
            }
        </div>
      </div>
    )
  }
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
