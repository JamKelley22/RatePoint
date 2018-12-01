import to from 'await-to-js';

import { BASE_URL } from './index.js'

/**
 * REST Query, Get List by id
 * @param {id} The id of the requested list
 * @return Error object or list object
 */
export const GetList = async(id) => {
  let error, response;
  [error, response] = await to(fetch(`${BASE_URL}/lists/${id}`, {
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

/**
 * REST Query, Update List
 * @param {id, listname, poilist}
 * @return Error object or list object
 */
export const UpdateList = async(id,listname,poilist) => {
  let body = {
    listname: listname,
    poilist: poilist,
  }
  let error, response;
  [error, response] = await to(fetch(`${BASE_URL}/lists/${id}`, {
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

/**
 * REST Query, Delete List by id
 * @param {id}
 * @return Error object or list object
 */
export const DeleteList = async(id) => {
  let error, response;
  [error, response] = await to(fetch(`${BASE_URL}/lists/${id}`, {
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
      case 201:
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

/**
 * REST Query, Create List
 * @param {id, listname, poilist}
 * @return Error object or list object
 */
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
