import to from 'await-to-js';

import { BASE_URL } from './index.js'

export const GetList = async(id) => {
  let error, response;
  [error, response] = await to(fetch(`${BASE_URL}/list/${id}`, {
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
        let list = await response.json();
        return list;
      case 404:
        return {error: `List with id: ${id} not found`}
      default:
        return {error: `Unexpected server response code of ${response.status}`}
    }
  }
}

export const UpdateList = async(id,poilist) => {
  let body = {
    poilist: poilist,
  }
  let error, response;
  [error, response] = await to(fetch(`${BASE_URL}/list/${id}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
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
        let list = await response.json();
        return list;
      case 404:
        return {error: `List with id: ${id} not found`}
      default:
        return {error: `Unexpected server response code of ${response.status}`}
    }
  }
}

export const DeleteList = async(id) => {
  let error, response;
  [error, response] = await to(fetch(`${BASE_URL}/list/${id}`, {
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
        let list = await response.json();
        return list;
      case 404:
        return {error: `List with id: ${id} not found`}
      default:
        return {error: `Unexpected server response code of ${response.status}`}
    }
  }
}

export const CreateList = async(username, listname, poilist) => {
  let body = {
    listname: listname,
    poilist: poilist
  }
  let error, response;
  [error, response] = await to(fetch(`${BASE_URL}/people/${username}/lists`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
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
      case 200:
        let list = await response.json();
        return list;
      default:
        return {error: `Unexpected server response code of ${response.status}`}
    }
  }
}
