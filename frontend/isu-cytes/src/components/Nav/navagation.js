import React from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import fuzzysort from 'fuzzysort'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as Actions from '../../actions/actions.js'
import { history, routes } from '../../history.js'
import { RatePointWebSocket } from '../../api'
import AccountDropdown from './accountDropdown.js'

import './navagation.scss'

class Navigation extends React.Component {
  state = {
    accountDropdownVisible: false,
    navSearch: '',
    searchResults: {
      pois: [],
      people: [],
      tags: []
    },
    searchVisable: false
  }

  handleSubmit = (e) => {
    e.preventDefault();
  }

  toggleAccount = () => {
    this.setState({
      accountDropdownVisible: !this.state.accountDropdownVisible
    })
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    }, () => {
      if(name == 'navSearch') {
          this.search(this.state.navSearch);//Search on input change
      }
    });
  }

  search = (term) => {
    let results = fuzzysort.go(term, this.props.pois, {key:'name'})
    let updatedSearchResults = this.state.searchResults;
    updatedSearchResults.pois = results.map(res => res.obj);
    this.setState({
      searchResults: updatedSearchResults
    })
  }

  doFullSearch = () => {
    //Save search to redux store?
    this.props.Actions.setSearchTerm(this.state.navSearch)
    history.push(routes._SEARCH)
  }

  clickPOI = (poi) => {
    this.props.setSelectedPOI(poi);
    history.push(routes._POI);
  }

  clickTag = (tag) => {

  }

  clickPerson = (person) => {

  }

  logout = () => {
    RatePointWebSocket.closeWebsocket();
    this.props.logoutUser(this.props.user.username);
    history.push(routes._LANDING);
  }

  render () {
    let foundResults = this.state.searchResults.pois.length > 0 ||
                      this.state.searchResults.tags.length > 0  ||
                      this.state.searchResults.people.length > 0;
    let searchList = (
      foundResults
      ?
      <React.Fragment>
        <div className='searchHeading'>POIs</div>
        {
          this.state.searchResults.pois.map((poi,i) => {
            return (
              <div
                key={i}
                className='searchResult'
                onMouseDown={() => this.clickPOI(poi)}>
                {poi.name}
              </div>
            )
          })
        }
        <div className='searchHeading'>People</div>
        {
          this.state.searchResults.people.map((person,i) => {
            return (
              <div
                key={i}
                className='searchResult'
                onMouseDown={() => this.clickPerson(person)}>
                {person.name}
              </div>
            )
          })
        }
        <div className='searchHeading'>Tags</div>
        {
          this.state.searchResults.tags.map((tag,i) => {
            return (
              <div
                key={i}
                className='searchResult'
                onMouseDown={() => this.clickTag(tag)}>
                {tag.name}
              </div>
            )
          })
        }
      </React.Fragment>

      :
      <div>
        Try searching for names, tags, or people
      </div>
    )

    return (
      <React.Fragment>
        <div className='navagation__bar'>
          <div className='navagation__logo'>
            <NavLink
              className='navagation__link'
              activeClassName='navagation__link--active'
              to={routes._HOME}>
              <h3>RatePoint</h3>
            </NavLink>
          </div>
          <div className='navagation__links'>
            {
              this.props.user
              &&
              <NavLink
                className='navagation__link'
                activeClassName='navagation__link--active'
                to={routes._HOME}>
                Home
              </NavLink>
            }
            <NavLink
              className='navagation__link'
              activeClassName='navagation__link--active'
              to={routes._MAP}>
              Map
            </NavLink>
            <NavLink
              className='navagation__link'
              activeClassName='navagation__link--active'
              to={routes._EXPLORE}>
              Explore
            </NavLink>
            {
              /*
              this.props.user
              &&
              <NavLink
                className='navagation__link'
                activeClassName='navagation__link--active'
                to={routes._FRIENDS}>
                Friends
              </NavLink>
              */
            }
          </div>
          <div className='navagation__searchbar'>
            <form onSubmit={(e) => this.handleSubmit(e)}>
              <div className='navagation__searchbar__wrapper'>
                <input
                  type='text'
                  name='navSearch'
                  className='navagation__searchbar__input'
                  onChange={this.handleInputChange}
                  onBlur={() => this.setState({searchVisable: false})}
                  onFocus={() => this.setState({searchVisable: true})}
                  />
                <button
                  type='submit'
                  className='navagation__searchbar__submit'
                  onClick={this.doFullSearch}>
                  <i className="fas fa-search"/>
                </button>
              </div>


              <div className='navagation__searchbar__results'>
                {this.state.searchVisable && searchList}
              </div>

            </form>
          </div>
          <div className='navagation__links'>
            {
              this.props.user
              &&
              <NavLink
                className='navagation__link'
                activeClassName='navagation__link--active'
                to={routes._SUGGEST}>
                Suggest a Location
              </NavLink>
            }

            <div
              className='navagation__link__account'
              onClick={this.toggleAccount}>
              Account <FontAwesomeIcon icon="caret-down" />
            <AccountDropdown
              accountDropdownVisible={this.state.accountDropdownVisible}
              me={this.props.user}
              links={[
                {name: 'View', dest: routes._ACCOUNT, action: null, visible: this.props.currUser},
                {name: 'Login', dest: routes._ACCOUNT, action: null, visible: !this.props.currUser},
                {name: 'Sign Up', dest: routes._ACCOUNT, action: null, visible: !this.props.currUser},
                {name: 'Logout', dest: history.location, action: this.logout, visible: this.props.currUser}
              ]}
            />
            </div>
          </div>
        </div>
        <div className={this.state.searchVisable ? 'pageCover' : ''}/>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    currUser: state.user.currUser,
    pois: state.poi.allPOIs
  };
}

function mapDispatchToProps(dispatch) {
  return {
    Actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation);
