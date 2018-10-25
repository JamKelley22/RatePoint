import React from 'react'

import { Navagation } from '../index.js'

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
        this.setState({ name: e.target.value });
    };

    discriptionChange = (e) => {
        this.setState({ discription: e.target.value });
    };

  render(){
    return(
        <React.Fragment>
            <Navagation/>
            <div id="containerSuggest">
                <div id="formSuggest">
                    <b id="suggestHeader">Suggest a Point of Interest</b>
                    <div id="suggestForm">
                        <form onSubmit={(e) => this.createRequest(e)} noValidate autoComplete="off">
                            <br/>
                            <b>Name of Place:</b>
                            <input maxLength="32" autoComplete="off" value={this.state.name}
                                   onChange={this.nameChange} onBlur={this.checkError}/>
                            <br/><br/>
                            <b>Discription:</b>
                            <input maxLength="20" autoComplete="off" value={this.state.discription}
                                   onChange={this.discriptionChange} onBlur={this.checkError}/>
                            <br/><br/>
                            <b>Image:</b>
                            <input/>
                            <br/><br/>
                            <div id="suggestMaps">
                                <b>Location:</b>
                                <input/>
                            </div>
                            <input type="submit" value="Submit" id="createSubmit"/>
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
