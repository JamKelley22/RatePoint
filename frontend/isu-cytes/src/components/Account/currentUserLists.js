import React from 'react'
import PropTypes from 'prop-types'

import './account.scss'

const CurrentUserLists = (props) => {
  return (
    <div className='tabContent currentUserListsComponent'>
      {
        props.lists.length > 0
        ?
        props.lists.map((list,i) => {
          return (
            <div key={i}>
              <div className='listItem'><h2>{list.listname}</h2></div>
              {
                list.poilist.map((poi,i) =>
                    <div key={i}>{poi.name}</div>
                )
              }
            </div>
          )
        })
        :
        <h3>No Lists</h3>
      }
    </div>
  )
}

export default CurrentUserLists;

CurrentUserLists.propTypes = {
  lists: PropTypes.array
}

CurrentUserLists.defaultProps = {
  lists: []
}
