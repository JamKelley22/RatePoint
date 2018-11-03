import React from 'react';
import GoogleMap from 'google-maps-react';
import {Navagation} from '../index.js';
import { POIAPI } from '../../api/';
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
            file: undefined,
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
        let response = await POIAPI.submitPOI(" ",this.state.name,this.state.file,this.state.description,this.state.markerLat+","+this.state.markerLng);
        this.setState({name: '', description: '',markerLat: 0, markerLng: 0, file: undefined});
    };

    setMarker = ({lat, lng}) => {
        this.setState({markerLat:lat, markerLng:lng});
    };

    fileChange = (event) => {
        event.preventDefault();
        this.setState({file: URL.createObjectURL(event.target.files[0])});
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
                                    <textarea type="text" value={this.state.body} cols="100" rows="5" id="discriptBox"
                                              onChange={this.descriptionChange} autoComplete="off" maxLength="500"/>
                                    <br/><br/>
                                    <b>Image:</b>
                                    <br/>
                                    <input type="file" onChange={(e)=>this.fileChange(e)}/>
                                    <br/>
                                    <img src={this.state.file}/>
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
