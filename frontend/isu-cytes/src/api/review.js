import to from 'await-to-js';

import { BASE_URL } from './index.js'


export const GetReview = async(id) => {
  let error, response;
  [error, response] = await to(fetch(`${BASE_URL}/review/${id}`, {
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

export const UpdateReview = async(id,rating,title,body) => {
  let error, response;
  [error, response] = await to(fetch(`${BASE_URL}/review/${id}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: {
      rating: rating,
      title: title,
      body: body
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

export const DeleteReview = async(id) => {
  let error, response;
  [error, response] = await to(fetch(`${BASE_URL}/review/${id}`, {
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

export const GetAllReviews = async() => {
  let error, response;
  [error, response] = await to(fetch(`${BASE_URL}/review`, {
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

export const SubmitReview = async(poiID,rating,title,body) => {
  let error, response;
  [error, response] = await to(fetch(`${BASE_URL}/review`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: {
      poi: poiID,
      rating: rating,
      title: title,
      body: body
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

export const GetReviewsByPOI = async(poiID) => {
  let error, response;
  [error, response] = await to(fetch(`${BASE_URL}/reviews/poi/${poiID}`, {
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
