import React from 'react'
import PropTypes from 'prop-types'

import { history, routes } from '../../history.js'
import { USER_ROLES } from '../../constants'

import './account.scss'

class CurrentUserView extends React.Component {
  state = {
    editingProfile: false,
    name: '',
    username: '',
    biography: ''
  }

  submitUserUpdate = async(e) => {
    e.preventDefault();

    let p = {
      oldUsername: this.props.username,
      username: this.state.username.length > 0 ? this.state.username : this.props.username,
      email: this.props.email,
      name: this.state.name.length > 0 ? this.state.name : this.props.name,
      biography: this.state.biography.length > 0 ? this.state.biography : this.props.biography,
      password: this.props.password
    }

    this.props.updateUser(p,() => {
      this.setEditingProfile(false);
    })
  }

  setEditingProfile = (isEditing) => {
    this.setState({
      editingProfile: isEditing,
      name: '',
      username: '',
      biography: ''
    })
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div className='currentUserViewComponent'>
        <div className='accountUser'>
          {
            !this.state.editingProfile
            ?
            <React.Fragment>
              <div className='userProfilePic'>
                <img src={this.props.pic} alt='User Profile Picture'/>
              </div>
              <h3>{this.props.name}</h3>
              <p>{this.props.username}</p>
              <p>{this.props.biography.length > 0 ? this.props.biography : 'Empty Bio'}</p>
              <button onClick={() => this.setEditingProfile(true)}>Edit Profile</button>
            </React.Fragment>
            :
            <React.Fragment>
              <div className='userProfilePic'>
                <img src={this.props.pic} alt='User Profile Picture'/>
              </div>
              <form onSubmit={this.submitUserUpdate}>
                <label>Name</label>
                <input
                   placeholder={this.props.name}
                   name='name'
                   value={this.state.name}
                   type='text'
                   onChange={this.handleInputChange}>
                 </input>
                <label>Username</label>
                <input
                  placeholder={this.props.username}
                  name='username'
                  value={this.state.username}
                  type='text'
                  onChange={this.handleInputChange}>
                </input>
                <label>Biography</label>
                <input
                  placeholder={this.props.biography}
                  name='biography'
                  value={this.state.biography}
                  type='textarea'
                  onChange={this.handleInputChange}>
                </input>
                <button type='submit'>Save</button>
                <button onClick={() => this.setEditingProfile(false)}>Cancel</button>
              </form>
            </React.Fragment>
          }
          <hr/>
          {
            this.props.role >= USER_ROLES.MOD
            &&
            <button onClick={() => history.push(routes._MODERATION)}>Moderator View</button>
          }
        </div>
      </div>
    )
  }
}

export default CurrentUserView;

CurrentUserView.propTypes = {
  id: PropTypes.number,
  username: PropTypes.string,
  name: PropTypes.string,
  email: PropTypes.string,
  biography: PropTypes.string,
  role: PropTypes.number,
  pic: PropTypes.string
}

CurrentUserView.defaultProps = {
  id: 1,
  username: "jDefault",
  name: "Joe Default",
  email: "email@example.com",
  biography: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
  role: 0,
  pic: 'https://banner2.kisspng.com/20180614/vzk/kisspng-computer-icons-anonymous-anonymity-5b2333ee0ec363.3736667315290337100605.jpg'
}
