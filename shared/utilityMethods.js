const jwt = require('jsonwebtoken');
/**
 * An Object containing all utility functions
 */
const utilityMethods = {

    generateJwtToken : (payload,secret,options=null) =>jwt.sign( payload, secret, options)
  
};
module.exports = utilityMethods;
