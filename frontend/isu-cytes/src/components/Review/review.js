import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux';

import { Redirect } from "react-router-dom";
import { withAuthentication, withNav } from '../../hoc'
import { history, routes } from '../../history.js'
import * as Actions from '../../actions/actions.js'
import { ReviewAPI } from '../../api'

import './review.scss'

class Review extends React.Component {
    state = {
        title: '',
        body: '',
        display: 1,
        rating: 1,
        error: null,
        submitted: false
    }

    reviewSubmit = async(e) => {
        e.preventDefault();
        const formdata = new FormData(e.target);
        if(!e.target.checkValidity()){
            alert("not valid input");
            return;
        }
        /*
        let data = {
            poi: this.state.poi,
            title: formdata.get('title'),
            rating: this.state.rating,
            body: formdata.get('body')
        };

        let url = 'http://proj309-tg-03.misc.iastate.edu:8080/reviews/new';
        let rawResponse;
        try {
          rawResponse = await fetch(url, {
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
          });
        } catch (e) {
          console.error(e);
        }
        */
        let review = await ReviewAPI.SubmitReview(this.props.poi.id,this.state.rating,this.state.title,this.state.body,this.props.user.username)
        if(review.error) {
          console.error(review.error);
          this.setState({
            error: review.error
          });
          console.log(review.error);
          return;
        }
        else {
          //Suscessful
          //alert("Suscess");
          history.push(routes._POI);
          this.setState({submitted:true});
        }
    };

    TitleChange = (e) => {
        this.setState({ title: e.target.value });
    };

    BodyChange = (e) => {
        this.setState({ body: e.target.value });
    };

    RatingChange = (i) => {
        this.setState({rating:i});
    };

    RatingDisplayedChange = (i) => {
        this.setState({display:i});
    }

    RatingBackToState = () => {
        this.setState({display:this.state.rating});
    }

    render() {
        if(this.state.submitted){
            return(
                <Redirect to={routes._POI}/>
            )
        }
        return (
          <div id="form">
              <h2>{this.props.poi.name}</h2>
              <form onSubmit={(e) => this.reviewSubmit(e)} noValidate autoComplete="off">
                  <fieldset>
                      <div id="formReview">
                          <legend>Write A Review</legend>
                          Title
                          <br/>
                          <input type="text" required id="title" name="title" value={this.state.title}
                                 onChange={this.TitleChange} maxLength="20" autoComplete="off"/>
                          <br/>
                          Rating
                          <br/>
                          <div id="container">
                              <div id="gettable">
                                  <div id="icon1div" onMouseOver={(e) => this.RatingDisplayedChange(1)}
                                       onClick={(e) => this.RatingChange(1)} onMouseLeave={this.RatingBackToState}
                                        className={(this.state.display<1) ? "review__kiwi":"review__kiwi--colored"}>
                                      <i id="icon1" className="fas fa-kiwi-bird"></i>
                                  </div>
                                  <div id="icon2div" onMouseOver={(e) => this.RatingDisplayedChange(2)}
                                       onClick={(e) => this.RatingChange(2)} onMouseLeave={this.RatingBackToState}
                                       className={(this.state.display<2) ? "review__kiwi":"review__kiwi--colored"}>
                                      <i id="icon2" className="fas fa-kiwi-bird"></i>
                                  </div>
                                  <div id="icon3div" onMouseOver={(e) => this.RatingDisplayedChange(3)}
                                       onClick={(e) => this.RatingChange(3)} onMouseLeave={this.RatingBackToState}
                                       className={(this.state.display<3) ? "review__kiwi":"review__kiwi--colored"}>
                                      <i id="icon3" className="fas fa-kiwi-bird"></i>
                                  </div>
                                  <div id="icon4div" onMouseOver={(e) => this.RatingDisplayedChange(4)}
                                       onClick={(e) => this.RatingChange(4)} onMouseLeave={this.RatingBackToState}
                                       className={(this.state.display<4) ? "review__kiwi":"review__kiwi--colored"}>
                                      <i id="icon4" className="fas fa-kiwi-bird"></i>
                                  </div>
                                  <div id="icon5div" onMouseOver={(e) => this.RatingDisplayedChange(5)}
                                       onClick={(e) => this.RatingChange(5)} onMouseLeave={this.RatingBackToState}
                                       className={(this.state.display<5) ? "review__kiwi":"review__kiwi--colored"}>
                                      <i id="icon5" className="fas fa-kiwi-bird"></i>
                                  </div>
                              </div>
                          </div>
                          <br/>
                          Body
                          <br/>
                          <textarea type="text" required id="body" name="body" value={this.state.body} cols="100"
                                    rows="5" onChange={this.BodyChange} autoComplete="off" maxLength="500"/>
                          <br/><br/>
                          <input type="submit" value="Submit Review" id="submitReview"/>
                      </div>
                  </fieldset>
              </form>
          </div>
        );
    }
}

function mapStateToProps(state) {
  return {
    poi: state.poi.currPOI,
    user: state.user.currUser
  }
}

function mapDispatchToProps(dispatch) {
  return {
    Actions: bindActionCreators(Actions, dispatch)
  };
}

export default compose(
  withNav,
  withAuthentication,
  connect(mapStateToProps,mapDispatchToProps)
)(Review);
