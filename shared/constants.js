/**
 * An object of possible status codes sent through this application 
 */
const statusCodes = {
    'success'       : 200,
    'badRequest'    : 400,
    'internalError' : 500,
    'unauthorized'  : 401,
    'notFound'      : 404
};
/**
 * An object for frequently used response messages sent through this application 
 */
const responseMessages = {
    updateSuccess                 : 'Updated Successfully',
    createdSuccess                : 'Created Successfully',
    parametersMissing             : 'Input parameters are missing',
    errorOccured                  : 'error Occured',
    serviceUpMessage              : 'service endpoint is up',
    serviceDownMessage            : 'service endpoint or server is down',
    validateTokenProblemMessage   : 'Problem in validating token provided . Please check the token',
    invalidTokenMessage           : 'Invalid authorization token provided',
    expiredTokenMessage           : 'Expired token provided',
    serviceConnectingErrorMessage : 'Error in connecting the service',
    generateTokenErrorMessage     : 'problem in generating token',
    serverUpMessage               : 'Blood donar backend server is up'

};


module.exports = {statusCodes,responseMessages};
