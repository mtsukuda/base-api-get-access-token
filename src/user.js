'use strict';

/**
 * packages
 */
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
  if (event.query.at === undefined) {
    console.error("Could not find access token.");
    return {
      statusCode: 400,
      body: JSON.stringify('400 Bad Request (1)'),
    };
  }
  let accessToken = event.query.at;
  console.log(accessToken);

  let statusCode = 500;
  let body = JSON.stringify('500 Internal Server Error');

  await fetch('https://api.thebase.in/1/users/me', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + accessToken
    }
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
