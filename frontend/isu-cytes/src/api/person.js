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

export const SubmitPerson = async(id,username,email,name,biography,password) => {
  let error, response;
  [error, response] = await to(fetch(`${BASE_URL}/people/${id}`, {
    method: 'POST',
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
