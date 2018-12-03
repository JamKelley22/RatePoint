import to from 'await-to-js';

import { BASE_URL } from './index.js'

export const GetReview = async(id) => {
  let error, response;
  [error, response] = await to(fetch(`${BASE_URL}/reviews/${id}`, {
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
        let review = await response.json();
        return review;
      case 401:
        return {error: 'Unauthorized'}
      case 404:
        return {error: 'Review not found'}
      default:
        return {error: `Unexpected server response code of ${response.status}`}
    }
  }
}

export const UpdateReview = async(id,rating,title,reviewBody,flagged) => {
  let body = {
    rating: rating,
    title: title,
    body: reviewBody,
    flagged: flagged
  }
  let error, response;
  [error, response] = await to(fetch(`${BASE_URL}/reviews/${id}`, {
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
        let review = await response.json();
        return review;
      case 404:
        return {error: 'Review not found'}
      default:
        return {error: `Unexpected server response code of ${response.status}`}
    }
  }
}

export const DeleteReview = async(id) => {
  let error, response;
  [error, response] = await to(fetch(`${BASE_URL}/reviews/${id}`, {
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
        let review = await response.json();
        return review;
      case 404:
        return {error: 'Review not found'}
      default:
        return {error: `Unexpected server response code of ${response.status}`}
    }
  }
}

export const GetAllReviews = async() => {
  let error, response;
  [error, response] = await to(fetch(`${BASE_URL}/reviews`, {
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
        let reviews = await response.json();
        return reviews;
      default:
        return {error: `Unexpected server response code of ${response.status}`}
    }
  }
}

export const SubmitReview = async(poiID,rating,title,reviewBody) => {
  let body = {
    poi: poiID,
    rating: rating,
    title: title,
    body: reviewBody,
    flagged: false
  }
  let error, response;
  [error, response] = await to(fetch(`${BASE_URL}/reviews`, {
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
        let review = await response.json();
        return review;
      case 401:
        return {error: 'Unauthorized'}
      case 409:
        return {error: 'Review Conflict'}
      default:
        return {error: `Unexpected server response code of ${response.status}`}
    }
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
    switch (response.status) {
      case 200:
        let review = await response.json();
        return review;
      case 401:
        return {error: 'Unauthorized'}
      case 404:
        return {error: `POI with id: ${poiID} not found`}
      default:
        return {error: `Unexpected server response code of ${response.status}`}
    }
  }
}
