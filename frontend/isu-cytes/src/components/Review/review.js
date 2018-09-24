import React from 'react'

import './review.css'

class Review extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            poi: "Insert POI here",
        };
    }

    reviewSubmit = (e) => {
        e.preventDefault();
        const formdata = new FormData(e.target);
        let data = {
            poidata: this.state.poi,
            titledata: formdata.get('title'),
            bodydata: formdata.get('body')
        }
        if(!e.target.checkValidity()){
            
            return;
        }
        fetch('/reviewSubmit', {method: 'PUT', body: JSON.stringify(data)})
            .catch(function(error){
                console.log(error);
                return;
            });

    }

    componentWillMount(){

    }

    render() {
        return (
            <div id="form">
                <h2>{this.state.poi}</h2>
                <form onSubmit={(e) => this.reviewSubmit(e)} noValidate>
                    <fieldset>
                        <legend>Write A Review</legend>
                        Title
                        <br/>
                        <input type="text" required id="title" name="title" maxLength="20"/>
                        <br/>
                        Body
                        <br/>
                        <input type="text" required id="body" name="body" maxLength="500" size="100"/>
                        <br/>
                        <input type="submit" value="Submit Review"/>
                    </fieldset>
                </form>
            </div>

        );
    }
}

export default Review;
