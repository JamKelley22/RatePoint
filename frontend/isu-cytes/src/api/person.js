import to from 'await-to-js';

import { BASE_URL } from './index.js'

export const GetPerson = async(id) => {
  let error, response;
  [error, response] = await to(fetch(`${BASE_URL}/people/${id}`, {
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

export const UpdatePerson = async(id,username,email,name,biography,password) => {
  let error, response;
  [error, response] = await to(fetch(`${BASE_URL}/people/${id}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: {
      username: username,
      email: email,
      name: name,
      biography: biography,
      password: password
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
    console.error(error);
    return {error: error}
  }
  else {
    let data = await response.json();
    return data;
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
    console.error(error);
    return {error: error}
  }
  else {
    let data = await response.json();
    return data;
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
  //console.log(JSON.stringify(body));
  let error, response;
  [error, response] = await to(fetch(`${BASE_URL}/people`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: "same-origin"
  }));

  //console.log(response);
  if(error) {
    console.error(error);
    return {error: error}
  }
  else if(response.status === 201 || response.status === 200) {// TODO: Remove 200 when backend changes
    //Good Verify
    let person = await response.json();
    return person;
  }
  else if(response.status === 401) {
    //Incorrect password
    return {error: 'Unauthorized'}
  }
  else if(response.status === 409) {
    //Username not found
    return {error: 'Conflict'}
  }
  else {
    return {error: `Unexpected server response code of ${response.status}`}
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
      "Content-Type": "application/json"
    },
    credentials: "same-origin"
  }))
  if(error) {
    console.error(error);
    return {error: error}
  }
  else if(response.status === 200) {
    //Good Verify
    let person = await response.json();
    return person;
  }
  else if(response.status === 401) {
    //Incorrect password
    return {error: 'Incorrect password'}
  }
  else if(response.status === 404) {
    //Username not found
    return {error: 'Username not found'}
  }
  else {
    return {error: `Unexpected server response code of ${response.status}`}
  }
}
