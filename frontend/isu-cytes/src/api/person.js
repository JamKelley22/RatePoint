import to from 'await-to-js';

import { BASE_URL } from './index.js'

export const GetPerson = async(username) => {
  let error, response;
  [error, response] = await to(fetch(`${BASE_URL}/people/${username}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }));
  if(error) {
    //console.error(error);
    return {error: error}
  }
  else {
    switch (response.status) {
      case 200:
        let data = await response.json();
        return data;
      case 401:
        return {error: 'Unauthorized'}
      case 404:
        return {error: 'Person not found'}
      default:
        return {error: `Unexpected server response code of ${response.status}`}
    }
  }
}

export const UpdatePerson = async(oldUsername, newUsername,email,name,biography,password) => {
  let body = {
    username: newUsername,
    email: email,
    name: name,
    biography: biography,
    password: password
  }
  let error, response;
  [error, response] = await to(fetch(`${BASE_URL}/people/${oldUsername}`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json"
    }
  }));
  if(error) {
    //console.error(error);
    return {error: error}
  }
  else {
    switch (response.status) {
      case 200:// TODO: Change with backend
      case 201:
        let person = await response.json();
        return person;
      case 401:
        return {error: 'Unauthorized'}
      case 404:
        return {error: 'Person not found'}
      default:
        return {error: `Unexpected server response code of ${response.status}`}
    }
  }
}

export const DeletePerson = async(id) => {
  let error, response;
  [error, response] = await to(fetch(`${BASE_URL}/people/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }));
  if(error) {
    //console.error(error);
    return error
  }
  else {
    switch (response.status) {
      case 200:
        let data = await response.json();
        return data;
      case 401:
        return {error: 'Unauthorized'}
      case 404:
        return {error: 'Person not found'}
      default:
        return {error: `Unexpected server response code of ${response.status}`}
    }
  }
}

export const GetAllPersons = async() => {
  let error, response;
  [error, response] = await to(fetch(`${BASE_URL}/people`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }));
  if(error) {
    //console.error(error);
    return {error: error}
  }
  else {
    switch (response.status) {
      case 200:
        let data = await response.json();
        return data;
      case 401:
        return {error: 'Unauthorized'}
      default:
        return {error: `Unexpected server response code of ${response.status}`}
    }
  }
}

export const SubmitPerson = async(username,email,name,biography,password) => {
  let body = {
    username: username,
    email: email,
    name: name,
    biography: biography,
    password: password,
    cookie: "cookie",//=======Needs to be optional
    role: "0"//=======Needs to be optional, User role for now
  }
  let error, response;
  [error, response] = await to(fetch(`${BASE_URL}/people`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }));

  if(error) {
    //console.error(error);
    return {error: error}
  }
  else {
    switch (response.status) {
      case 201:
      case 200:// TODO: Remove this when backend changes
        //Good Verify
        let person = await response.json();
        return person;
      case 401:
        //Incorrect password
        return {error: 'Incorrect password'}
      case 409:
        //Username not found
        return {error: 'Conflict'}
      default:
        return {error: `Unexpected server response code of ${response.status}`}
    }
  }
}

/*
Returns either a person or error
*/
export const VerifyPerson = async(username,password) => {
  let body = {
    username: username,
    password: password
  }
  let error, response;
  [error, response] = await to(fetch(`${BASE_URL}/verify`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json"
    }
  }))
  if(error) {
    //console.error(error);
    return {error: error}
  }
  else {
    switch (response.status) {
      case 200:
        //Good Verify
        let person = await response.json();
        return person;
      case 401:
        //Incorrect password
        return {error: 'Incorrect password'}
      case 404:
        //Username not found
        return {error: 'Username not found'}
      default:
        return {error: `Unexpected server response code of ${response.status}`}
    }
  }
}
