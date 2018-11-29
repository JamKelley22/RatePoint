import React from 'react';
import GoogleMap from 'google-map-react';
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withAuthentication, withNav } from '../../hoc'
import {Navagation} from '../index.js';
import { POIAPI, ImgurAPI } from '../../api/';
import * as Actions from '../../actions/actions.js'

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
            displayFile: null,
            uploadImageURI: null,
            error: null
        };
    }

    nameChange = (e) => {
        this.setState({name: e.target.value});
    };

    descriptionChange = (e) => {
        this.setState({description: e.target.value});
    };

    suggestRequest = async (e) => {
        e.preventDefault();
        if(this.state.markerLat === 0 && this.state.markerLng === 0) {
          alert("Please select a Location on the map");
          return;
        }
        if(this.state.file === null) {
          alert("Please choose an image");
          return;
        }
        if(this.state.uploadImageURI === null) {
          alert("Please upload your image");
          return;
        }
        //let response = await POIAPI.submitPOI(" ",this.state.name,this.state.file,this.state.description,this.state.markerLat+","+this.state.markerLng);
        this.props.Actions.submitPOI(this.props.user.id,this.state.name,this.state.uploadImageURI,this.state.description,`${this.state.markerLat},${this.state.markerLng}`)
        .then(res => {
          console.log("success");
          this.setState({name: '', description: '',markerLat: 0, markerLng: 0, file: undefined, displayFile: null, uploadImageURI: null});
        })
        .catch(err => {
          console.error(err);
        })
    };

    setMarker = ({lat, lng}) => {
        this.setState({markerLat:lat, markerLng:lng});
    };

    fileChange = (event) => {
        event.preventDefault();

        const imageFile = event.target.files[0];
        this.setState({
          file: imageFile,
          displayFile: URL.createObjectURL(event.target.files[0])
        });
    };

    uploadImage = async(event) => {
      event.preventDefault();
      if(this.state.file === null) {
        console.error("Must select a file");
        return;
      }
      console.log("===Uploading===");
      let res = await ImgurAPI.PostImage(this.state.file);
      if(res.error) {
        console.error(res.error);
      }
      else {
        let linkArr = res.data.link.split('/');
        let uniqueLinkPart = linkArr[linkArr.length - 1]
        console.log(uniqueLinkPart);
        this.setState({
          uploadImageURI: uniqueLinkPart
        })
      }
    };

    render() {
        return (
            <div id="containerSuggest">
                <h1 id="suggestHeader">Suggest a Point of Interest</h1>
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
                                <textarea type="text" value={this.state.description} cols="100" rows="5" id="discriptBox"
                                          onChange={this.descriptionChange} autoComplete="off" maxLength="500"/>
                                <br/><br/>
                                <b>Image:</b>
                                <br/>
                                <input type="file" onChange={(e)=>this.fileChange(e)}/>
                                <br/>
                                <img src={this.state.displayFile} id="suggestImage"/>
                                {
                                  this.state.file
                                  &&
                                  <button id='uploadImageBtn' onClick={this.uploadImage}>Upload Image</button>
                                }
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
                                        <FontAwesomeIcon icon="map-marker" id="mapMarker"
                                                         lat={this.state.markerLat} lng={this.state.markerLng}/>
                                    </GoogleMap>
                                </div>
                            </div>
                        </div>
                        <div id="row2">
                            <input type="submit" value="Submit" id="suggestSubmit"/>
                        </div>
                    </form>
                    <div id='reqirements'>
                        <input type="checkbox" checked={this.state.name.length > 0}/> Name<br/>
                        <input type="checkbox" checked={this.state.description.length > 0}/> Descritpion<br/>
                        <input type="checkbox" checked={this.state.uploadImageURI !== null}/> Image Upload<br/>
                        <input type="checkbox" checked={this.state.markerLat !== 0 && this.state.markerLng !== 0}/> Map Location<br/>
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
        );
    }
}

function mapStateToProps(state) {
  return {
    user: state.user.currUser
  };
}

function mapDispatchToProps(dispatch) {
  return {
    Actions: bindActionCreators(Actions, dispatch)
  };
}

export default compose(
  withAuthentication,
  withNav,
  connect(mapStateToProps,mapDispatchToProps)
)(Suggest);
