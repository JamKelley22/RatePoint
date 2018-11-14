import to from 'await-to-js';

import { BASE_URL } from './index.js'

export const GetPOI = async(id) => {
  let error, response;
  [error, response] = await to(fetch(`${BASE_URL}/pois/${id}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: "same-origin"
  }));

  if(error) {
    console.error(error);
    return {error: error}
  }
  else {
    switch (response.status) {
      case 200:
        let poi = await response.json();
        return poi;
      case 404:
        return {error: `POI with ID ${id} not found on server`}
      default:
        return {error: `Unexpected server response code of ${response.status}`}
    }
  }
}

export const UpdatePOI = async(id,name,pictures,description,coordinates) => {
  let body = {
    name: name,
    pictures: (pictures && pictures.length > 0) ? pictures.split(',') : [],
    description: description,
    coordinates: coordinates
  }
  let error, response;
  [error, response] = await to(fetch(`${BASE_URL}/pois/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }));

  if(error) {
    console.error(error);
    return {error: error}
  }
  else {
    switch (response.status) {
      case 201:
      case 200:
        let poi = await response.json();
        return poi;
      case 404:
        return {error: `POI with ID ${id} not found on server`}
      default:
        return {error: `Unexpected server response code of ${response.status}`}
    }
  }
}

export const DeletePOI = async(id) => {
  let error, response;
  [error, response] = await to(fetch(`${BASE_URL}/pois/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }));

  if(error) {
    console.error(error);
    return {error: error}
  }
  else {
    switch (response.status) {
      case 200:
        let poi = await response.json();
        return poi;
      case 404:
        return {error: `POI with ID ${id} not found on server`}
      default:
        return {error: `Unexpected server response code of ${response.status}`}
    }
  }
}

export const GetPOIs = async() => {
  let error, response;
  [error, response] = await to(fetch(`${BASE_URL}/pois`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }));

  if(error) {
    console.error(error);
    return {error: error}
  }
  else {
    switch (response.status) {
      case 200:
        let pois = await response.json();
        return pois;
      default:
        return {error: `Unexpected server response code of ${response.status}`}
    }
  }
}

export const SubmitPOI = async(userID,name,pictures,description,coordinates) => {
  let body = {
    userID: userID,
    name: name,
    /*pictures: (pictures && pictures.length > 0) ? pictures.split(',') : [],*/
    description: description,
    coordinates: coordinates,
    approved: false
  }
  console.log(body);
  let error, response;
  [error, response] = await to(fetch(`${BASE_URL}/pois`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'origin': 'same-origin'
    },
    body: JSON.stringify(body)
  }));

  if(error) {
    console.error(error);
    return {error: error}
  }
  else {
    switch (response.status) {
      case 201:
        let pois = await response.json();
        return pois;
      case 401:
        return {error: 'Unauthorized'}
      case 409:
        return {error: 'Conflict'}
      default:
        return {error: `Unexpected server response code of ${response.status}`, res: response}
    }
  }
}

export const GetPOIRating = async(poiID) => {
  let error, response;
  [error, response] = await to(fetch(`${BASE_URL}/pois/${poiID}/average`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }));

  if(error) {
    console.error(error);
    return {error: error}
  }
  else {
    switch (response.status) {
      case 201:// TODO: Check this return status
        let pois = await response.json();
        return pois;
      default:
        return {error: `Unexpected server response code of ${response.status}`}
    }
  }
}
