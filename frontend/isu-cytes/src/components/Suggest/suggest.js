import React from 'react'
import GoogleMapReact from 'google-map-react';
import {Navagation} from '../index.js'

import './suggest.scss'

class Suggest extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            center : {
                lat: 37.3596049,
                lng: -122.0665
            },
            zoom : 16,
            marker : '',
            error: null
        };
    }

    nameChange = (e) => {
        this.setState({name: e.target.value});
    };

    descriptionChange = (e) => {
        this.setState({description: e.target.value});
    };

    createRequest = async (e) => {
        e.preventDefault();
        let body = JSON.stringify({
            placeName: this.state.name,
            placeDescription: this.state.description,
        });
        /*let response = await fetch('http://proj309-tg-03.misc.iastate.edu:8080/people/new', {
         method: 'POST',
         headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
         },
         body: body
         });*/
        this.setState({name: '', description: ''});
    };

    render() {
        return (
            <React.Fragment>
                <Navagation/>
                <div id="containerSuggest">
                    <b id="suggestHeader">Suggest a Point of Interest</b>
                    <div id="suggestForm">
                        <form onSubmit={(e) => this.suggestRequest(e)} noValidate autoComplete="off">
                            <div id="row1">
                                <div id="suggestNotMaps">
                                    <b>Name of Place:</b>
                                    <input maxLength="32" autoComplete="off" value={this.state.name}
                                           onChange={this.nameChange} onBlur={this.checkError}/>
                                    <br/><br/>
                                    <b>Description:</b>
                                    <input maxLength="32" autoComplete="off" value={this.state.description}
                                           onChange={this.descriptionChange} onBlur={this.checkError}/>
                                    <br/><br/>
                                    <b>Image:</b>
                                    <input/>
                                </div>
                                <div id="suggestMaps">
                                    <b>Location:</b>
                                    <div id="actualMap">
                                        <GoogleMapReact
                                            bootstrapURLKeys={{key: 'AIzaSyC5q54v6n33maflm2zG1WjVrD43AOYa6YM'}}
                                            defaultCenter={this.state.center}
                                            defaultZoom={this.state.zoom}
                                        >
                                        </GoogleMapReact>
                                    </div>
                                </div>
                            </div>
                            <div id="row2">
                                <input type="submit" value="Submit" id="suggestSubmit"/>
                            </div>
                        </form>
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
