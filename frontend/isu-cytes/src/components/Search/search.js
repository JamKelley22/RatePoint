import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux';
import fuzzysort from 'fuzzysort'

import { withNav } from '../../hoc'
import * as Actions from '../../actions/actions.js'
import POICard from '../Explore/poiCard.js'
import { history, routes } from '../../history.js'

import './search.scss'

class Search extends React.Component {
  state = {
    searchResults: {
      pois: [],
      people: [],
      tags: []
    }
  }

  componentDidMount() {
    this.search(this.props.searchTerm);
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.searchTerm!==this.props.searchTerm){
      this.search(this.props.searchTerm);
    }
  }

  search = (term) => {
    let results = fuzzysort.go(term, this.props.pois, {key:'name'})
    let updatedSearchResults = this.state.searchResults;
    updatedSearchResults.pois = results.map(res => res.obj);
    this.setState({
      searchResults: updatedSearchResults
    })
  }

  onPOICardClick = (poi) => {
    //Update Redux
    this.props.Actions.setPOI(poi);
    //Push new history
    history.push(routes._POI);
  }

  render () {
    return (
      <div className='searchPage'>
        <h1>Search</h1>
        <br/>
        <div className='resultsScroll'>
          <div className='poiResults'>
            <h1>POIs</h1>
            <hr/>
            {
              this.state.searchResults.pois.length > 0
              ?
              this.state.searchResults.pois.map((poi,i) => {
                return (
                  <div className='poiResult'>
                    <POICard
                      title={poi.name}
                      key={i}
                      pic={(poi.pictures && poi.pictures.length > 0) ? poi.pictures[0] : null}
                      rating={poi.rating}
                      onClick={() => this.onPOICardClick(poi)}
                    />
                  </div>
                )
              })
              :
              <p>No Results</p>
            }
          </div>

          <div className='peopleResults'>
            <h1>People</h1>
            <hr/>
              {
                this.state.searchResults.people.length > 0
                ?
                this.state.searchResults.people.map((person,i) => {
                  return (
                    <div className='personResult'>
                      {person.name}
                    </div>
                  )
                })
                :
                <p>No Results</p>
              }
          </div>

          <div className='tagResults'>
            <h1>Tags</h1>
            <hr/>
              {
                this.state.searchResults.tags.length > 0
                ?
                this.state.searchResults.tags.map((tag,i) => {
                  return (
                    <div className='tagResult'>
                      {tag.name}
                    </div>
                  )
                })
                :
                <p>No Results</p>
              }
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    pois: state.poi.allPOIs,
    searchTerm: state.search.searchTerm
  };
}

function mapDispatchToProps(dispatch) {
  return {
    Actions: bindActionCreators(Actions, dispatch)
  };
}

export default compose(
  withNav,
  connect(mapStateToProps,mapDispatchToProps)
)(Search);
