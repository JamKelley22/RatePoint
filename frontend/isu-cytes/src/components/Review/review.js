import React from 'react'

import './review.css'

class Review extends React.Component {

  reviewSubmit=(e)=>{
      console.log(e);
      e.preventDefault();

  }

  render () {
    return (
        <div id="form">
          <h2>Name of POI</h2>
          <form onSubmit={(e)=>this.reviewSubmit(e)}>
            <fieldset>
              <legend>Write A Review</legend>
              Title
              <br/>
              <input type="text" name="title" maxLength="20"/>
              <br/>
              Body
              <br/>
              <input type="text" name="body" maxLength="500" size="100"/>
              <br/>
              <input type="submit" value="Submit Review"/>
            </fieldset>
          </form>
        </div>

    );
  }
}

export default Review;
