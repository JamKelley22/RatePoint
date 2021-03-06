import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './account.scss'

class UserList extends React.Component {
  state = {
    open: false,
    editingList: false,
    deleteSelected: false,
    editCheckmarkVisible: false,
    deleteCheckmarkVisible: false,
    newListName: '',
    timeout: null
  }

  selectDeleteList = () => {
    clearTimeout(this.state.timeout)
    this.setState({
      editingList: false,
      deleteSelected: true,
      lastTimeout: null
    })
    this.setDeleteCheckmark(true);
    this.setEditCheckmark(false);
  }

  editList = () => {
    this.setState({
      editingList: true,
      deleteSelected: false
    })
    this.setEditCheckmark(true);
    this.setDeleteCheckmark(false);
  }

  cancel = () => {
    this.setState({
      editingList: false,
      deleteSelected: false
    })
    this.setDeleteCheckmark(false);
    this.setEditCheckmark(false);
  }

  setEditCheckmark = (val) => {
    if(val) {
      let timeout = setTimeout(() => {
        this.setState({
          editCheckmarkVisible: true
        })
      },100)
      this.setState({
        lastTimeout: timeout
      })
    }
    else {
      this.setState({
        editCheckmarkVisible: false
      })
    }
  }
  setDeleteCheckmark = (val) => {
    if(val) {
      let timeout = setTimeout(() => {
        this.setState({
          deleteCheckmarkVisible: true
        })
      },100)
      this.setState({
        lastTimeout: timeout
      })
    }
    else {
      this.setState({
        deleteCheckmarkVisible: false
      })
    }
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
    return (
      <div>
        <div className='listItem'>
          <a className='listItemArrow' onClick={() => this.setState({open: !this.state.open})}>
            <FontAwesomeIcon id='listOpenCarot' style={{transform: this.state.open ? 'rotate(90deg)' : 'rotate(0deg)'}} icon="caret-right"/>
          </a>
          {
            !this.state.editingList
            ?
            <h2>{this.props.list.listname}</h2>
            :
            <input
              id='editListNameInput'
              name='newListName'
              placeholder={this.props.list.listname}
              onChange={this.handleInputChange}>
            </input>
          }

          <div
            className='listDiv'
            style={{
              width: (this.state.editingList) ? '60px' : '32px'
            }}>
            {
              (!this.state.editingList)
              ?
              <a className='editIcon' onClick={this.editList}>
                <FontAwesomeIcon
                  icon="edit"
                  />
              </a>
              :
              <a className='banIcon' onClick={this.cancel}>
                <FontAwesomeIcon
                  icon="ban"
                  />
              </a>
            }
            <a
              style={{
                visibility: (this.state.editCheckmarkVisible) ? 'visible' : 'hidden'
              }}
              className='checkIcon'
              onClick={this.state.editCheckmarkVisible ? () => this.props.setListName(this.props.list, this.state.newListName): null}
              >
              <FontAwesomeIcon
                icon="check"
                />
            </a>
          </div>

          <div
            className='listDiv'
            style={{
              width: (this.state.deleteSelected) ? '60px' : '32px'
            }}>
            {
              (!this.state.deleteSelected)
              ?
                <a onClick={this.selectDeleteList} className='trashIcon'>
                  <FontAwesomeIcon
                    icon="trash"
                    />
                </a>
              :
              <a onClick={this.cancel} className='banIcon'>
                <FontAwesomeIcon
                  icon="ban"
                  />
              </a>
            }
            <a
              onClick={this.state.deleteCheckmarkVisible ? () => this.props.deleteList(this.props.list): null}
              style={{
                visibility: (this.state.deleteCheckmarkVisible) ? 'visible' : 'hidden'
              }}
              className='checkIcon'>
              <FontAwesomeIcon
                icon="check"
                />
            </a>
          </div>
          {
            this.props.fetching.list === this.props.list
            &&
            this.props.fetching.msg
          }
        </div>
        <div className='poiListItems'>
          {
            this.state.open
            &&
            this.props.list.poilist.map((poi,i) =>
                <div key={i}>
                  {poi.name}
                  {'\u00A0'}
                  <a id='listViewPOI' onClick={() => this.props.viewPOI(poi)}>View</a>
                </div>
            )
          }
        </div>
      </div>
    )
  }
}

export default UserList;
