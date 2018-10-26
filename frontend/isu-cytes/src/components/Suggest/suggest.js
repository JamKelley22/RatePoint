import React from 'react'
import GoogleMap from 'google-map-react';
import {Navagation} from '../index.js'

import './suggest.scss'

class Suggest extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            center: {
                lat: 42.02622525183353,
                lng: -93.64745560839157
            },
            zoom: 15,
            markerLat: 0,
            markerLng: 0,
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
            placeLat: this.state.markerLat,
            placeLng: this.state.markerLng
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

    setMarker = ({lat, lng}) => {
        this.setState({markerLat:lat, markerLng:lng});
        console.log(lat,lng);
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
                                    <br/>
                                    <input maxLength="32" autoComplete="off" value={this.state.name}
                                           onChange={this.nameChange} onBlur={this.checkError}/>
                                    <br/><br/>
                                    <b>Description:</b>
                                    <br/>
                                    <input maxLength="32" autoComplete="off" value={this.state.description}
                                           onChange={this.descriptionChange} onBlur={this.checkError}/>
                                    <br/><br/>
                                    <b>Image:</b>
                                    <br/>
                                    <input/>
                                </div>
                                <div id="suggestMaps">
                                    <b>Location:</b>
                                    <div id="actualMap">
                                        <GoogleMap
                                            bootstrapURLKeys={{key: 'AIzaSyC5q54v6n33maflm2zG1WjVrD43AOYa6YM'}}
                                            defaultCenter={this.state.center}
                                            defaultZoom={this.state.zoom}
                                            onClick={this.setMarker}
                                        >
                                            <i id="icon" className="fas fa-kiwi-bird"
                                               lat={this.state.markerLat} lng={this.state.markerLng}
                                            />
                                        </GoogleMap>
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
