'use strict';

/**
 * @param event
 * @returns {Promise<{body: string, statusCode: number}>}
 */
module.exports.func = async event => {
  return {
    statusCode: 200,
    body: "Hello, world!"
  };
};
