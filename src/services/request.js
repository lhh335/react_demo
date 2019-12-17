import fetch from "dva/fetch";

function setParams(data, method) {
  let params = { method };
  let headers = {
    "Content-Type": "application/json"
  };

  params = Object.assign(params, { headers: headers });
  params = Object.assign(params, data);
  return params;
}

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [body] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export function requestPost(url, body) {
  const params = setParams(body, 'POST');
  return fetch(url, params)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => {
      return data;
    })
    .catch(err => ({ err }));
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [body] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export function requestDelete(url, body) {
  const params = setParams(body, 'DELETE');
  return fetch(url, params)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => {
      return data;
    })
    .catch(err => ({ err }));
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [body] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export function requestPut(url, body) {
  const params = setParams(body, 'PUT');
  return fetch(url, params)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => {
      return data;
    })
    .catch(err => ({ err }));
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [body] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export function requestGet(url, body) {
  // const params = setParams(body);
  return fetch(url)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => {
      return data;
    })
    .catch(err => ({ err }));
}
