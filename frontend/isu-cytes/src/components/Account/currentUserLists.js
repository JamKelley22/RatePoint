import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import UserList from './userList.js'

import './account.scss'

class CurrentUserLists extends React.Component {
  state ={
    newListSelected: false,
    timeout: null,
    listCheckmarkVisible: false,
    listName: ''
  }

  selectNewList = () => {
    clearTimeout(this.state.timeout)
    this.setState({
      newListSelected: true,
      lastTimeout: null
    })
    this.setListSelectedCheckmark(true);
  }

  cancel = () => {
    this.setState({
      newListSelected: false
    })
    this.setListSelectedCheckmark(false);
  }

  setListSelectedCheckmark = (val) => {
    if(val) {
      let timeout = setTimeout(() => {
        this.setState({
          listCheckmarkVisible: true
        })
      },100)
      this.setState({
        timeout: timeout
      })
    }
    else {
      this.setState({
        listCheckmarkVisible: false
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

  render() {
    return (
      <div className='tabContent currentUserListsComponent'>
        <div className='createNewListDiv'>
          {
            !this.state.newListSelected
            ?
            <p>New List</p>
            :
            <input
              id='editListNameInput'
              name='listName'
              placeholder='New List'
              onChange={this.handleInputChange}>
            </input>
          }

          <div
            className='listDiv'
            style={{
              width: (this.state.newListSelected) ? '60px' : '32px'
            }}>
            {
              (!this.state.newListSelected)
              ?
                <a onClick={this.selectNewList}>
                  <FontAwesomeIcon
                    id='trashIcon'
                    icon="plus-circle"
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
            <a onClick={() => this.props.createList(this.state.listName)}>
              <FontAwesomeIcon
                style={{
                  visibility: (this.state.listCheckmarkVisible) ? 'visible' : 'hidden'
                }}
                id='checkIcon'
                icon="check"
                />
            </a>
          </div>

        </div>
        {
          this.props.lists.length > 0
          ?
          this.props.lists.map((list,i) => {
            return (
              <UserList
                list={list}
                key={i}
                deleteList={this.props.deleteList}
                viewPOI={this.props.viewPOI}
                setListName={this.props.setListName}
              />
            )
          })
          :
          <h3>No Lists</h3>
        }
      </div>
    )
  }
}

export default CurrentUserLists;

CurrentUserLists.propTypes = {
  lists: PropTypes.array
}

CurrentUserLists.defaultProps = {
  lists: []
}
