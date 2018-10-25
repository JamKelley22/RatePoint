import React from 'react'

import {Navagation} from '../index.js'

import './suggest.scss'

class Suggest extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            discription: '',
            error: null
        };
    }

    nameChange = (e) => {
        this.setState({name: e.target.value});
    };

    discriptionChange = (e) => {
        this.setState({discription: e.target.value});
    };

    createRequest = async (e) => {
        e.preventDefault();
        let body = JSON.stringify({
            placeName: this.state.name,
            placeDiscription: this.state.discription,
        });
        /*let response = await fetch('http://proj309-tg-03.misc.iastate.edu:8080/people/new', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
        });*/
        this.setState({name:'',discription:''});
    };

    render() {
        return (
            <React.Fragment>
                <Navagation/>
                <div id="containerSuggest">
                    <div id="formSuggest">
                        <b id="suggestHeader">Suggest a Point of Interest</b>
                        <div id="suggestForm">
                            <form onSubmit={(e) => this.suggestRequest(e)} noValidate autoComplete="off">
                                <div id="suggestNotMaps">
                                    <br/>
                                    <b>Name of Place:</b>
                                    <input maxLength="32" autoComplete="off" value={this.state.name}
                                           onChange={this.nameChange} onBlur={this.checkError}/>
                                    <br/><br/>
                                    <b>Discription:</b>
                                    <input maxLength="32" autoComplete="off" value={this.state.discription}
                                           onChange={this.discriptionChange} onBlur={this.checkError}/>
                                    <br/><br/>
                                    <b>Image:</b>
                                    <input/>
                                </div>
                                <div id="suggestMaps">
                                    <b>Location:</b>
                                    <input/>
                                </div>
                                <input type="submit" value="Submit" id="suggestSubmit"/>
                            </form>
                        </div>
                    </div>
                    {
                        this.state.error
                        &&
                        <div className='formError'>
                            {this.state.error}
                        </div>
                    }
                </div>
            </React.Fragment>
        );
    }
}

export default Suggest;
