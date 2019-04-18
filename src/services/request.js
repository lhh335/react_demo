import fetch from "dva/fetch";

function setParams(data) {
  var params = { method: "POST" };
  var headers = {
    "Access-Control-Allow-Origin": "http://localhost:9000",
    "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS",
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
  const params = setParams(body);
  return fetch(url, params)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => {
      return data;
    })
    .catch(err => ({ err }));
}
