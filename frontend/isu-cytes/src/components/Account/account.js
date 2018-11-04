import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux';

import { withAuthentication, withNav } from '../../hoc'
import * as Actions from '../../actions/actions.js'
import { ReviewAPI, PersonAPI } from '../../api'
import { history, routes } from '../../history.js'
import { USER_ROLES } from '../../constants'

import './account.scss'

const TABS = {
  LISTS: 'Lists',
  REVIEWS: 'Reviews',
  FRIENDS: 'Friends'
}

class Account extends React.Component {
  state = {
    openTab: TABS.LISTS,
    editingProfile: false,
    reviewsFromUser: [],
    reviewsError: null,

    name: '',
    username: '',
    biography: ''
  }

  componentDidMount() {
    this.getUserReviews();
  }

  getUserReviews = async() => {
    let allReviews = await ReviewAPI.GetAllReviews();
    if(allReviews.error) {
      this.setState({
        reviewsError: allReviews.error
      })
      return;
    }
    let userReviews = allReviews.filter(review =>// TODO: Move this to backend (filtering on only review left by userID)
      true
    )
    this.setState({
      reviewsFromUser: userReviews
    })
  }

  switchTab = (newTab) => {
    this.setState({
      openTab: newTab
    })
  }

  submitUserUpdate = async(e) => {
    e.preventDefault();

    let p = {
      oldUsername: this.props.user.username,
      username: this.state.username.length > 0 ? this.state.username : this.props.user.username,
      email: this.props.user.email,
      name: this.state.name.length > 0 ? this.state.name : this.props.user.name,
      biography: this.state.biography.length > 0 ? this.state.biography : this.props.user.biography,
      password: this.props.user.password
    }

    this.props.Actions.updateUser(p.oldUsername,p.newUsername,p.email,p.name,p.biography,p.password)
    .then(res => {
      console.log(res);
      this.setEditingProfile(false);
    })
    .catch(err => {
      console.error(err);
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

  render () {
    let Tab;

    switch (this.state.openTab) {
      case TABS.LISTS:
        Tab = (
          <div className='tabContent'>
            {
              this.props.user.lists > 0
              ?
              this.props.user.lists.map((list,i) =>
                <div className='listItem' key={i}>{list.listname}</div>
              )
              :
              <h3>No Lists</h3>
            }
          </div>
        )
        break;
      case TABS.REVIEWS:
        Tab = (
          <div className='tabContent'>
            {
              this.state.reviewsFromUser > 0
              ?
              this.props.user.reviewsFromUser.map((review ,i) =>
                <div className='reviewItem' key={i}>
                  {review.title}
                  Rating: {review.rating}
                </div>
              )
              :
              //=====
                this.state.reviewsError
                ?
                  <h3>{this.state.reviewsError.message}</h3>
                :
                  <h3>No Reviews</h3>
              //=====
            }
          </div>
        )
        break;
      case TABS.FRIENDS:
        Tab = (
          <div className='tabContent'>
            <div className='friendItem'>Tom</div>
            <div className='friendItem'>Jerry</div>
            <div className='friendItem'>Spike</div>
          </div>
        )
        break;
      default:
        Tab = <div>Empty</div>

    }
    return (
      <div className='accountPage'>
        <div className='accountUser'>
          {
            !this.state.editingProfile
            ?
            <React.Fragment>
              <div className='userProfilePic'>
                <img alt='User Profile Picture'/>
              </div>
              <h3>{this.props.user.name}</h3>
              <p>{this.props.user.username}</p>
              <p>{this.props.user.biography.length > 0 ? this.props.user.biography : 'Empty Bio'}</p>
              <button onClick={() => this.setEditingProfile(true)}>Edit Profile</button>
            </React.Fragment>
            :
            <React.Fragment>
              <div className='userProfilePic'>
                <img scr={this.props.user.pic} alt='User Profile Picture'/>
              </div>
              <form onSubmit={this.submitUserUpdate}>
                <label>Name</label>
                <input
                   placeholder={this.props.user.name}
                   name='name'
                   value={this.state.name}
                   type='text'
                   onChange={this.handleInputChange}>
                 </input>
                <label>Username</label>
                <input
                  placeholder={this.props.user.username}
                  name='username'
                  value={this.state.username}
                  type='text'
                  onChange={this.handleInputChange}>
                </input>
                <label>Biography</label>
                <input
                  placeholder={this.props.user.biography}
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
            this.props.user.role >= USER_ROLES.MOD
            &&
            <button onClick={() => history.push(routes._MODERATION)}>Moderator View</button>
          }
        </div>

        <div className='accountContent'>
          <div className='accountTabs'>
            <button className={`accountTab ${this.state.openTab === TABS.LISTS && 'activeTab'}`} onClick={() => this.switchTab(TABS.LISTS)}>{TABS.LISTS}</button>
            <button className={`accountTab ${this.state.openTab === TABS.REVIEWS && 'activeTab'}`} onClick={() => this.switchTab(TABS.REVIEWS)}>{TABS.REVIEWS}</button>
            <button className={`accountTab ${this.state.openTab === TABS.FRIENDS && 'activeTab'}`} onClick={() => this.switchTab(TABS.FRIENDS)}>{TABS.FRIENDS}</button>
          </div>
          {Tab}
        </div>

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
  withNav,
  withAuthentication,
  connect(mapStateToProps,mapDispatchToProps)
)(Account);
