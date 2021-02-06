
const {statusCodes,responseMessages} = require('../shared/constants');

/**
    * A sendError function to handle errors of an API
    * @author  Esari Praneeth kumar
    * @ModifiedBy Esari Praneeth Kumar
    * @param {object} err - Error object
    * @param {object} res - Express response object
    * @param {object} req - Express request object
    * @returns error message with error code 
    */
const sendError =  ( err,res,req ) =>  {
    // Checking whether any custom status code or assign 500 error code
    let statusCode =err.statusCode||500;
    // Error response object
    let errorMessage = { errorMessage: err.message , success: false };
    //checking mongoose schema errors
    if(err.errors && err._message){
        errorMessage = {
            ...errorMessage,
            errorMessage : err.message.split(err._message+':')[1],
            mongoSchema  : err._message.split(' validation failed')[0],
            mongoError   : true
        };
    }
    if(err.driver && err.code){
        errorMessage.mongoError = true;
    }
    // Error response object modification if API is not found
    if(statusCode == statusCodes.notFound){
        errorMessage.errorMessage = req.path.slice(1)+ ' '+ responseMessages.serviceDownMessage;
    }
    return res.status(statusCode).json(errorMessage);

};

/**
    * A sendSuccess function to handle success response of an API
    * @author  Esari Praneeth kumar
    * @ModifiedBy Esari Praneeth Kumar
    * @param {object} responseData - response data of an API
    * @param {Number} statusCode - status code of an API
    * @param {object} res - Express response object
    * @returns Status code 2XX series with success message
    */
const  sendSuccess = (responseData,statusCode,res) => {
    // success response object
    const successMessage = { successData: responseData , success: true };
    return res.status(statusCode).json(successMessage);
};
  
module.exports = { 
    sendError,
    sendSuccess
};
