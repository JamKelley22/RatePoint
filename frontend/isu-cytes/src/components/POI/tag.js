import React from 'react'

class Tag extends React.Component {

  tagClick = () => {
    
  }

  tagHover = () => {

  }

  render () {
    return (
      <div className='tag' onClick={this.tagClick} onMouseOver={this.tagHover}>
        <i className="fas fa-tag"/>
        <p>{this.props.name}</p>
      </div>
    );
  }
}

export default Tag;
