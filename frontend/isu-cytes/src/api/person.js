import to from 'await-to-js';

import { BASE_URL } from './index.js'

/**
 * REST Query, Get Person by username
 * @param {username} The username of the user (string)
 * @return Error object or person object
 */
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

/**
 * REST Query, Update Person
 * @param {oldUsername, newUsername,email,name,biography,password}
 * @return Error object or person object
 */
export const UpdatePerson = async(oldUsername, newUsername,email,name,biography,password,role) => {
  let body = {
    username: newUsername,
    email: email,
    name: name,
    biography: biography,
    password: password,
    role: role
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

/**
 * REST Query, Delete Person
 * @param {id}
 * @return Error object or person object
 */
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

/**
 * REST Query, GET All Persons
 * @param {}
 * @return Error object or list person arr
 */
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

/**
 * REST Query, Submit Person
 * @param {username,email,name,biography,password}
 * @return Error object or person object
 */
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

/**
 * REST Query, Verify Person, Checks to see if person is created
 * @param {username,password}
 * @return Error object or person object
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
        return {error: 'Incorrect password', status: 401}
      case 404:
        //Username not found
        return {error: 'Username not found', status: 404}
      default:
        return {error: `Unexpected server response code of ${response.status}`}
    }
  }
}
