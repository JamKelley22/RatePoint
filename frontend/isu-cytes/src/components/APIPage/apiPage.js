import React from 'react'
import { compose } from 'redux';

import { withNav } from '../../hoc'

import { POIAPI, ReviewAPI, PersonAPI } from '../../api'

const STATE_MACHINE = {
  initial: 'GetPOI',

  //POI
  GetPOI: 'GetPOI',
  UpdatePOI: 'UpdatePOI',
  DeletePOI: 'DeletePOI',
  //POI Collection
  GetPOIs: 'GetPOIs',
  SubmitPOI: 'SubmitPOI',

  //Person
  GetPerson: 'GetPerson',
  UpdatePerson: 'UpdatePerson',
  DeletePerson: 'DeletePerson',
  //Person Collection
  GetAllPersons: 'GetAllPersons',
  SubmitPerson: 'SubmitPerson',

  //Review
  GetReview: 'GetReview',
  UpdateReview: 'UpdateReview',
  DeleteReview: 'DeleteReview',
  //Review Collection
  GetAllReviews: 'GetAllReviews',
  SubmitReview: 'SubmitReview'
};

class APIPage extends React.Component {
  state = {
    curState: STATE_MACHINE.initial,

    poiID: null,
    poiName: '',
    poiPictures: [],
    poiDescription: '',
    poiCoordinates: '',
    poiApproved: false,

    userID: null,//Current signed in userID
    personID: null,//Person you are trying to access
    cookie: '',
    username: '',
    email: '',
    userName: '',
    biography: '',
    password: '',

    reviewID: null,
    rating: null,
    title: '',
    body: ''
  }

  handleInputChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    switch (this.state.curState) {
      case STATE_MACHINE.GetPOI:
        this.getPOI();
        break;
      case STATE_MACHINE.UpdatePOI:
        this.updatePOI();
        break;
      case STATE_MACHINE.DeletePOI:
        this.deletePOI();
        break;
      case STATE_MACHINE.GetPOIs:
        this.getPOIs();
        break;
      case STATE_MACHINE.SubmitPOI:
        this.submitPOI();
        break;

      //==========================

      case STATE_MACHINE.GetPerson:
        this.getPerson();
        break;
      case STATE_MACHINE.UpdatePerson:
        this.updatePerson();
        break;
      case STATE_MACHINE.DeletePerson:
        this.deletePerson();
        break;
      case STATE_MACHINE.GetAllPersons:
        this.getAllPersons();
        break;
      case STATE_MACHINE.SubmitPerson:
        this.submitPerson();
        break;

      //==========================

      case STATE_MACHINE.GetReview:
        this.getReview();
        break;
      case STATE_MACHINE.UpdateReview:
        this.updateReview();
        break;
      case STATE_MACHINE.DeleteReview:
        this.deleteReview();
        break;
      case STATE_MACHINE.GetAllReviews:
        this.getAllReviews();
        break;
      case STATE_MACHINE.SubmitReview:
        this.submitReview();
        break;
      default:
    }
  }

  getPOI = async() => {
    let res = await POIAPI.GetPOI(this.state.poiID);
    console.log(res);
  }
  updatePOI = async() => {
    let res = await POIAPI.UpdatePOI(this.state.poiID,this.state.poiName,this.state.poiPictures,this.state.poiDescription,this.state.poiCoordinates);
    console.log(res);
  }
  deletePOI = async() => {
    let res = await POIAPI.DeletePOI(this.state.poiID);
    console.log(res);
  }
  getPOIs = async() => {
    let res = await POIAPI.GetPOIs();
    console.log(res);
  }
  submitPOI = async() => {
    let res = await POIAPI.SubmitPOI(this.state.userID,this.state.poiName,this.state.poiPictures,this.state.poiDescription,this.state.poiCoordinates)
    console.log(res);
  }
  //==========================================================
  getPerson = async() => {
    let res = await PersonAPI.GetPerson(this.state.personID);
    console.log(res);
  }
  updatePerson = async() => {
    let res = await PersonAPI.UpdatePerson(this.state.personID,this.state.username,this.state.email,this.state.userName,this.state.biography,this.state.password);
    console.log(res);
  }
  deletePerson = async() => {
    let res = await PersonAPI.DeletePerson(this.state.personID);
    console.log(res);
  }
  getAllPersons = async() => {
    let res = await PersonAPI.GetAllPersons();
    console.log(res);
  }
  submitPerson = async() => {
    let res = await PersonAPI.SubmitPerson(this.state.username,this.state.email,this.state.userName,this.state.biography,this.state.password);
    console.log(res);
  }
  //======================================================
  getReview = async() => {
    let res = await ReviewAPI.GetReview(this.state.reviewID);
    console.log(res);
  }
  updateReview = async() => {
    let res = await ReviewAPI.UpdateReview(this.state.reviewID,this.state.rating,this.state.title,this.state.body);
    console.log(res);
  }
  deleteReview = async() => {
    let res = await ReviewAPI.DeleteReview(this.state.reviewID);
    console.log(res);
  }
  getAllReviews = async() => {
    let res = await ReviewAPI.GetAllReviews();
    console.log(res);
  }
  submitReview = async() => {
    let res = await ReviewAPI.SubmitReview(this.state.poiID,this.state.rating,this.state.title,this.state.body);
    console.log(res);
  }

  render () {
    let poiBtns = [STATE_MACHINE.GetPOI,STATE_MACHINE.UpdatePOI,STATE_MACHINE.DeletePOI,STATE_MACHINE.GetPOIs,STATE_MACHINE.SubmitPOI].map((name,i) => {
      return (
        <button key={i} onClick={() => this.setState({curState: name})}>{name}</button>
      )
    })

    let personBtns = [STATE_MACHINE.GetPerson,STATE_MACHINE.UpdatePerson,STATE_MACHINE.DeletePerson,STATE_MACHINE.GetAllPersons,STATE_MACHINE.SubmitPerson].map((name,i) => {
      return (
        <button key={i} onClick={() => this.setState({curState: name})}>{name}</button>
      )
    })

    let reviewBtns = [STATE_MACHINE.GetReview,STATE_MACHINE.UpdateReview,STATE_MACHINE.DeleteReview,STATE_MACHINE.DeleteReview,STATE_MACHINE.SubmitReview].map((name,i) => {
      return (
        <button key={i} onClick={() => this.setState({curState: name})}>{name}</button>
      )
    })

    let _POIID = (
      <React.Fragment>
        <label>POI ID</label>
        <input type='text' value={this.state.poiID} name='poiID' onChange={this.handleInputChange}/>
      </React.Fragment>
    )
    let _POIName = (
      <React.Fragment>
        <label>POI Name</label>
        <input type='text' value={this.state.poiName} name='poiName' onChange={this.handleInputChange}/>
      </React.Fragment>
    )
    let _POIPictures = (
      <React.Fragment>
        <label>POI Pictures</label>
        <input type='text' value={this.state.poiPictures} name='poiPictures' onChange={this.handleInputChange}/>
      </React.Fragment>
    )
    let _POIDescription = (
      <React.Fragment>
        <label>POI Description</label>
        <input type='text' value={this.state.poiDescription} name='poiDescription' onChange={this.handleInputChange}/>
      </React.Fragment>
    )
    let _POICoordinates = (
      <React.Fragment>
        <label>POI Coordinates</label>
        <input type='text' value={this.state.poiCoordinates} name='poiCoordinates' onChange={this.handleInputChange}/>
      </React.Fragment>
    )
    let _POIApproved = (
      <React.Fragment>
        <label>POI Approved</label>
        <input type='text' value={this.state.poiApproved} name='poiApproved' onChange={this.handleInputChange}/>
      </React.Fragment>
    )
    //==================================================================================================================
    let _UserID = (
      <React.Fragment>
        <label>POI Approved</label>
        <input type='text' value={this.state.userID} name='userID' onChange={this.handleInputChange}/>
      </React.Fragment>
    )
    let _PersonID = (
      <React.Fragment>
        <label>Person ID</label>
        <input type='text' value={this.state.personID} name='personID' onChange={this.handleInputChange}/>
      </React.Fragment>
    )
    let _Cookie = (
      <React.Fragment>
        <label>Cookie</label>
        <input type='text' value={this.state.cookie} name='cookie' onChange={this.handleInputChange}/>
      </React.Fragment>
    )
    let _Username = (
      <React.Fragment>
        <label>Username</label>
        <input type='text' value={this.state.username} name='username' onChange={this.handleInputChange}/>
      </React.Fragment>
    )
    let _Email = (
      <React.Fragment>
        <label>Email</label>
        <input type='text' value={this.state.email} name='email' onChange={this.handleInputChange}/>
      </React.Fragment>
    )
    let _UserName = (
      <React.Fragment>
        <label>UserName</label>
        <input type='text' value={this.state.userName} name='userName' onChange={this.handleInputChange}/>
      </React.Fragment>
    )
    let _Biography = (
      <React.Fragment>
        <label>Biography</label>
        <input type='text' value={this.state.biography} name='biography' onChange={this.handleInputChange}/>
      </React.Fragment>
    )
    let _Password = (
      <React.Fragment>
        <label>Password</label>
        <input type='password' value={this.state.password} name='password' onChange={this.handleInputChange}/>
      </React.Fragment>
    )
    //=======================================================================================================
    let _Rating = (
      <React.Fragment>
        <label>Rating</label>
        <input type='text' value={this.state.rating} name='rating' onChange={this.handleInputChange}/>
      </React.Fragment>
    )
    let _Title = (
      <React.Fragment>
        <label>Title</label>
        <input type='text' value={this.state.title} name='title' onChange={this.handleInputChange}/>
      </React.Fragment>
    )
    let _Body = (
      <React.Fragment>
        <label>Body</label>
        <input type='text' value={this.state.body} name='body' onChange={this.handleInputChange}/>
      </React.Fragment>
    )
    let _ReviewID = (
      <React.Fragment>
        <label>Review ID</label>
        <input type='text' value={this.state.reviewID} name='reviewID' onChange={this.handleInputChange}/>
      </React.Fragment>
    )

    let VisibleInputs;

    switch (this.state.curState) {
      case STATE_MACHINE.GetPOI:
        VisibleInputs = (
          <React.Fragment>
            {_POIID}
          </React.Fragment>
        )
        break;
      case STATE_MACHINE.UpdatePOI://Needs Auth (_UserID, _Cookie)
        VisibleInputs = (
          <React.Fragment>
            {_POIID}
            {_POIName}
            {_POIPictures}
            {_POIDescription}
            {_POICoordinates}
            {_POIApproved}
          </React.Fragment>
        )
        break;
      case STATE_MACHINE.DeletePOI://Needs Auth (_UserID, _Cookie)
        VisibleInputs = (
          <React.Fragment>
            {_POIID}
          </React.Fragment>
        )
        break;
      case STATE_MACHINE.GetPOIs:
        VisibleInputs = (
          <React.Fragment>

          </React.Fragment>
        )
        break;
      case STATE_MACHINE.SubmitPOI://Needs Auth (_UserID, _Cookie)
        VisibleInputs = (
          <React.Fragment>
            {_UserID}
            {_POIName}
            {_POIPictures}
            {_POIDescription}
            {_POICoordinates}
          </React.Fragment>
        )
        break;
      //==========================
      case STATE_MACHINE.GetPerson:
        VisibleInputs = (
          <React.Fragment>
            {_PersonID}
          </React.Fragment>
        )
        break;
      case STATE_MACHINE.UpdatePerson://Needs Auth (_UserID, _Cookie)
        VisibleInputs = (
          <React.Fragment>
            {_Username}
            {_Email}
            {_UserName}
            {_Biography}
            {_Password}
          </React.Fragment>
        )
        break;
      case STATE_MACHINE.DeletePerson://Needs Auth (_UserID, _Cookie)
        VisibleInputs = (
          <React.Fragment>
            {_PersonID}
          </React.Fragment>
        )
        break;
      case STATE_MACHINE.GetAllPersons:
        VisibleInputs = (
          <React.Fragment>
          </React.Fragment>
        )
        break;
      case STATE_MACHINE.SubmitPerson:
        VisibleInputs = (
          <React.Fragment>
            {_PersonID}
            {_Username}
            {_Email}
            {_UserName}
            {_Biography}
            {_Password}
          </React.Fragment>
        )
        break;
      //=============================
      case STATE_MACHINE.GetReview:
        VisibleInputs = (
          <React.Fragment>
            {_ReviewID}
          </React.Fragment>
        )
        break;
      case STATE_MACHINE.UpdateReview://Needs Auth (_UserID, _Cookie)
        VisibleInputs = (
          <React.Fragment>
            {_ReviewID}
            {_Rating}
            {_Title}
            {_Body}
          </React.Fragment>
        )
        break;
      case STATE_MACHINE.DeleteReview://Needs Auth (_UserID, _Cookie)
        VisibleInputs = (
          <React.Fragment>
            {_ReviewID}
          </React.Fragment>
        )
        break;
      case STATE_MACHINE.GetAllReviews:
        VisibleInputs = (
          <React.Fragment>

          </React.Fragment>
        )
        break;
      case STATE_MACHINE.SubmitReview://Needs Auth (_UserID, _Cookie)
        VisibleInputs = (
          <React.Fragment>
            {_POIID}
            {_Rating}
            {_Title}
            {_Body}
          </React.Fragment>
        )
        break;
      default:
        VisibleInputs = (
          <React.Fragment>
          </React.Fragment>
        )
    }

    return (
      <div>
        <div>
          {poiBtns}
        </div>

        <div>
          {personBtns}
        </div>

        <div>
          {reviewBtns}
        </div>

        <h3>{this.state.curState}</h3>

        <form onSubmit={(e) => this.handleSubmit(e)}>
          {VisibleInputs}
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default compose(
    withNav
)(APIPage);
