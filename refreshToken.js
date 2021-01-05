'use strict';

/**
 * @type {{client_id: string, client_secret: string, default_redirect_uri: string}}
 */
const baseKeys = require('base-config.json');

/**
 * packages
 */
const FormData = require('form-data');
const fetch = require('node-fetch');

/**
 * @param event
 * @returns {Promise<{body: string, statusCode: number}>}
 */
module.exports.func = async event => {
  console.log(event);
  console.log(event.query);
  if (event.query === undefined) {
    console.error("Could not find query.");
    return {
      statusCode: 400,
      body: JSON.stringify('400 Bad Request'),
    };
  }
  if (event.query.token === undefined) {
    console.error("Could not find code.");
    return {
      statusCode: 400,
      body: JSON.stringify('400 Bad Request (1)'),
    };
  }
  let refreshToekn = event.query.token;
  console.log(refreshToekn);

  const params = new FormData();
  params.append('grant_type', 'refresh_token');
  params.append('client_id', baseKeys.client_id);
  params.append('client_secret', baseKeys.client_secret);
  params.append('refresh_token', refreshToekn);
  params.append('redirect_uri', baseKeys.default_redirect_uri);

  let statusCode = 500;
  let body = JSON.stringify('500 Internal Server Error');

  await fetch('https://api.thebase.in/1/oauth/token', {
    method: 'POST',
    headers: {
      // 'Content-Type': 'multipart/form-data'
    },
    body: params
  })
    .then((res) => res.json())
    .then(data => {
      console.log(data);
      if (data.error) throw data;
      statusCode = 200;
      body = data;
    })
    .catch(err => {
      console.error(err);
      statusCode = 400;
      body = JSON.stringify('400 Bad Request (2)');
    });

  return {
    statusCode: statusCode,
    body: body,
  };
};
