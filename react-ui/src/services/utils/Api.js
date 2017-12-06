/**
 * fetchJSON use to communicate with the server
 * 
 */

import fetch from 'isomorphic-fetch';
// import Auth from './Auth';

function checkStatus(response) {
  if(response.ok) {
    return response;
  } else {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

function parseJSON(response) {
  return response.json();
}

export default function enhancedFetch(url, options) {
  options.headers = Object.assign({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
//    'Authorization': `Bearer ${Auth.getToken()}`
  }, options.headers);
  if(typeof options.body !== 'string') {
    options.body = JSON.stringify(options.body);
  }
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON);
}