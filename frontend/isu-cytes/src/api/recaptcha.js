import to from 'await-to-js';

import { RECAPTCHA_WEBTASK_SERVER_URL } from './index.js'

export const DoVerifyRecaptcha = async(token) => {
  let body = {
    captcha: token
  }
  let error, response;
  [error, response] = await to(fetch(`${RECAPTCHA_WEBTASK_SERVER_URL}/recaptcha`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: "same-origin"
  }));
  if(error) {
    console.error(error);
    return {success: false, error: error }
  }
  else {
    switch (response.status) {
      case 200:
        let data = await response.json();
        return data;
      default:
        return {error: `Unexpected server response code of ${response.status}`}
    }
  }
}
