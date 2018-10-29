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
    let data = await response.json();
    return data;
  }
}

export const UpdateList = async(id,listname,poilist,listuser) => {
  let error, response;
  [error, response] = await to(fetch(`${BASE_URL}/list/${id}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: {
      id: id,
      listname: listname,
      poilist: poilist,
      listuser: listuser
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
    let data = await response.json();
    return data;
  }
}

export const CreateList = async(listname, poilist) => {
  let error, response;
  [error, response] = await to(fetch(`${BASE_URL}/people/username/lists`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: {
      listname: listname,
      poilist: poilist
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
