import React from 'react'
import { compose } from 'redux';

import { withAuthentication, withNav } from '../../hoc'
import { Navagation } from '../index.js'
import { history, routes } from '../../history.js'

import './review.scss'

class Review extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            poi: 1,
            title: '',
            display: 1,
            rating: 1,
            body: ''
        };
    }

    reviewSubmit = async(e) => {
        e.preventDefault();
        const formdata = new FormData(e.target);
        if(!e.target.checkValidity()){
            alert("not valid input");
            return;
        }
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

        this.setState({title:'',rating:1,body:''});
        setTimeout(() => history.push(routes._POI),1000);
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
        return (
          <React.Fragment>
            <Navagation/>
              <div id="form">
                  <h2>{this.state.poi}</h2>
                  <form onSubmit={(e) => this.reviewSubmit(e)} noValidate autoComplete="off">
                      <fieldset>
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
                          <input type="submit" value="Submit Review"/>
                      </fieldset>
                  </form>
              </div>
          </React.Fragment>
        );
    }
}

export default compose(
  withAuthentication,
  withNav
)(Review);
