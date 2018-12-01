import to from 'await-to-js';
import { IMGUR_URL } from './index.js'

/**
 * REST Query Imgur to Post New Image
 * @param {image} The imgur url (excluding https://i.imgur.com/)
 * @return Error object or imgur response object
 */
export const PostImage = async(image) => {// TODO:
  const formData = new FormData();
  formData.append('image', image);

  let error, response;
  [error, response] = await to(fetch(`${IMGUR_URL}/image`, {
    method: 'POST',
    headers: {
      Authorization: 'Client-ID d5c4d07a5386dfe',
    },
    body: formData
  }));

  if(error) {
    console.error(error);
    return {error: error}
  }
  else {
    switch (response.status) {
      case 200:
      case 201:
        let data = await response.json();
        return data;
      default:
        return {error: `Unexpected server response code of ${response.status}`}
    }
  }
}
