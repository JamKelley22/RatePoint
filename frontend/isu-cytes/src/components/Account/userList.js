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
          <a onClick={() => this.setState({open: !this.state.open})}>
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
              <a onClick={this.editList}>
                <FontAwesomeIcon
                  id='editIcon'
                  icon="edit"
                  />
              </a>
              :
              <FontAwesomeIcon onClick={this.cancel}
                id='banIcon'
                icon="ban"
                />
            }
            <FontAwesomeIcon
              onClick={() => this.props.setListName(this.props.list, this.state.newListName)}
              style={{
                visibility: (this.state.editCheckmarkVisible) ? 'visible' : 'hidden'
              }}
              id='checkIcon'
              icon="check"
              />
          </div>

          <div
            className='listDiv'
            style={{
              width: (this.state.deleteSelected) ? '60px' : '32px'
            }}>
            {
              (!this.state.deleteSelected)
              ?
                <a onClick={this.selectDeleteList}>
                  <FontAwesomeIcon
                    id='trashIcon'
                    icon="trash"
                    />
                </a>
              :
              <a onClick={this.cancel}>
                <FontAwesomeIcon
                  id='banIcon'
                  icon="ban"
                  />
              </a>
            }
            <a onClick={() => this.props.deleteList(this.props.list)}>
              <FontAwesomeIcon
                style={{
                  visibility: (this.state.deleteCheckmarkVisible) ? 'visible' : 'hidden'
                }}
                id='checkIcon'
                icon="check"
                />
            </a>
          </div>

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
