import to from 'await-to-js';

import { BASE_URL } from './index.js'

export const GetPOI = async(id) => {
  let error, response;
  [error, response] = await to(fetch(`${BASE_URL}/poi/${id}`, {
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
    let data = await response.json();
    return data;
  }
}

export const UpdatePOI = async(id,userID,name,pictures,description,coordinates) => {
  let error, response;
  [error, response] = await to(fetch(`${BASE_URL}/poi/${id}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: {
      name: name,
      pictures: pictures.split(','),
      description: description,
      coordinates: coordinates
    }
  }));
  if(error) {
    console.error(error);
    return {error: error}
  }
  else {
    let data = await response.json();
    return data;
  }
}

export const DeletePOI = async(id) => {
  let error, response;
  [error, response] = await to(fetch(`${BASE_URL}/poi${id}`, {
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
    let data = await response.json();
    return data;
  }
}

export const GetPOIs = async() => {
  let error, response;
  [error, response] = await to(fetch(`${BASE_URL}/poi`, {
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
    let data = await response.json();
    return data;
  }
}

export const SubmitPOI = async(userID,name,pictures,description,coordinates) => {
  let error, response;
  [error, response] = await to(fetch(`${BASE_URL}/poi`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: {
      userID: userID,
      name: name,
      pictures: pictures.split(','),
      description: description,
      coordinates: coordinates
    }
  }));
  if(error) {
    console.error(error);
    return {error: error}
  }
  else {
    let data = await response.json();
    return data;
  }
}
