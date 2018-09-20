import React from 'react'

import './review.css'

class Review extends React.Component {
  render () {
    return (
        <div id="form">
          <form>
            <fieldset>
              <legend>Write A Review</legend>
              Title
              <br/>
              <input type="text" name="title" maxlength="20"/>
              <br/>
              Body
              <br/>
              <input type="text" name="body" maxlength="500" size="100"/>
              <br/>
              <input type="submit" value="Submit Review"/>
            </fieldset>
          </form>
        </div>

    );
  }
}

export default Review;
