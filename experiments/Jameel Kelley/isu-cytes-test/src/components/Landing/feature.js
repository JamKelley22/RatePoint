import React from 'react'
import PropTypes from 'prop-types'

class Feature extends React.Component {
  render () {
    return (
      <a id='infoPiece' href="#block2">
        <i className={this.props.icon}></i>
        <div>
          <h3>{this.props.title}</h3>
          <p>{this.props.desc}</p>
        </div>
      </a>
    );
  }
}

export default Feature;
