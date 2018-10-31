import React from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import fuzzysort from 'fuzzysort'

import { history, routes } from '../../history.js'
import * as Actions from '../../actions/actions.js'

import './navagation.scss'

class Navigation extends React.Component {
  state = {
    accountVisible: false,
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
      accountVisible: !this.state.accountVisible
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

  clickPOI = (poi) => {
    this.props.Actions.setSelectedPOI(poi);
    history.push(routes._POI);
  }

  clickTag = (tag) => {

  }

  clickPerson = (person) => {

  }

  logout = () => {
    console.log("Logout");
    this.props.Actions.logoutUser();
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
          <NavLink
            className='navagation__link'
            activeClassName='navagation__link--active'
            to={routes._HOME}>
            Home
          </NavLink>
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
          <NavLink
            className='navagation__link'
            activeClassName='navagation__link--active'
            to={routes._FRIENDS}>
            Friends
          </NavLink>
        </div>
        <div className='navagation__searchbar'>
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <input type='text' name='name' className='navagation__searchbar__input'/>
            <button type='submit' className='navagation__searchbar__submit'><i className="fas fa-search"/></button>
          </form>
        </div>
        <div className='navagation__links'>
          <NavLink
            className='navagation__link'
            activeClassName='navagation__link--active'
            to={routes._SUGGEST}>
            Suggest a Location
          </NavLink>

          <div
            className='navagation__link__account'
            onClick={this.toggleAccount}>
            Account <FontAwesomeIcon icon="caret-down" />
          <div className={`accountBox ${this.state.accountVisible ? '' : '--hidden'}`}>
              <NavLink
                className='account__link'
                to={routes._ACCOUNT}>
                View
              </NavLink>
              <NavLink
                className='account__link'
                to={routes._LOGIN}>
                Login
              </NavLink>
              <NavLink
                className='account__link'
                to={routes._CREATEACCOUNT}>
                Signup
              </NavLink>
              {
                this.props.user
                &&
                <a
                  className='account__link'
                  onClick={() => this.logout()}>
                  Logout
                </a>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    pois: state.poi.poiList,
    user: state.user.currUser
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
