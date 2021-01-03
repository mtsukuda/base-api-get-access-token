'use strict';

/**
 * packages
 */
const FormData = require('form-data');
const fetch = require('node-fetch');

/**
 * @param event
 * @returns {Promise<{body: string, statusCode: number}>}
 */
module.exports.getAccessToken = async event => {
  console.log(event);
  console.log(event.query);
  if (event.query === undefined) {
    console.error("Could not find query.");
    return {
      statusCode: 400,
      body: JSON.stringify('400 Bad Request'),
    };
  }
  if (event.query.code === undefined) {
    console.error("Could not find code.");
    return {
      statusCode: 400,
      body: JSON.stringify('400 Bad Request (1)'),
    };
  }
  let code = event.query.code;
  console.log(code);

  const params = new FormData();
  params.append('grant_type', 'authorization_code');
  params.append('client_id', '__your_client_id__');
  params.append('client_secret', '__your_client_secret__');
  params.append('code', code);
  params.append('redirect_uri', 'https://redirect.com/');

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
