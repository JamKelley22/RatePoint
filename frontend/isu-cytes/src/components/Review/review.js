import React from 'react'

import './review.css'

class Review extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            poi: "Insert POI here",
            title: '',
            display: 0,
            rating: 0,
            body: ''
        };
    }

    reviewSubmit = (e) => {
        e.preventDefault();
        const formdata = new FormData(e.target);
        if(!e.target.checkValidity()){
            alert("not valid input");
            return;
        }
        let data = {
            poi: this.state.poi,
            title: formdata.get('title'),
            rating: '',
            body: formdata.get('body')
        };
        console.log(JSON.stringify(data));
        fetch('/reviewSubmit', {method: 'POST', body: JSON.stringify(data)})
            .catch(function(error){
                console.log(error);
                return;
            });
        this.setState({title:'',rating:'',body:''});
    }

    componentDidMount(){

    }

    TitleChange = (e) => {
        this.setState({ title: e.target.value });
    };

    BodyChange = (e) => {
        this.setState({ body: e.target.value });
    };

    RatingChange = () => {

    };

    RatingDisplayedChange = () => {

    }

    render() {
        return (
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
                                <div id="icon1div">
                                    <img id="icon1" src="img/staricon.png" height="30px" width="30px"/>
                                </div>
                                <div id="icon2div">
                                    <img id="icon2" src="img/staricon.png" height="30px" width="30px"/>
                                </div>
                                <div id="icon3div">
                                    <img id="icon3" src="img/staricon.png" height="30px" width="30px"/>
                                </div>
                                <div id="icon4div">
                                    <img id="icon4" src="img/staricon.png" height="30px" width="30px"/>
                                </div>
                                <div id="icon5div">
                                    <img id="icon5" src="img/staricon.png" height="30px" width="30px"/>
                                </div>
                            </div>
                        </div>
                        <br/>
                        Body
                        <br/>
                        <input type="text" required id="body" name="body" value={this.state.body}
                               onChange={this.BodyChange} autoComplete="off" maxLength="500" size="100"/>
                        <br/>
                        <input type="submit" value="Submit Review"/>
                    </fieldset>
                </form>
            </div>

        );
    }
}

export default Review;
