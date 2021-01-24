const utilityMethods = require('../shared/utilityMethods');
const {config} = require('../loaders/config');
const {statusCodes,responseMessages} = require('../shared/constants');
const UserModel = require('../models/user.model');
const mongooseUtilities = require('../shared/mongooseUtilities');

const authMiddleware ={
    isAuthenticated : async (req,res,next)=>{
        try{
            
            const token = req.header('Authorization').replace('Bearer ', '');
            const {_id} = utilityMethods
                .generateDecodedJwtToken(token,config.jwtSecret); // extracted token payload

            const userData = await mongooseUtilities
                .findFirstRecord(UserModel,{_id} );

            if (!userData) {
                throw new Error();
            }
        
            req.token = token;
            req.user = userData;
            next();

        }catch(error){
            if(error.name=='JsonWebTokenError'){
                let invalidTokenError = new Error(responseMessages.invalidTokenMessage);
                invalidTokenError.statusCode = statusCodes.unauthorized;
                next(invalidTokenError);
            }else if(error.name=='TokenExpiredError'){
                let expiredTokenError = new Error(responseMessages.expiredTokenMessage);
                expiredTokenError.statusCode = statusCodes.badRequest;
                next(expiredTokenError);
            }
            else{
                let validateTokenError = new Error(responseMessages.validateTokenProblemMessage);
                validateTokenError.statusCode = statusCodes.badRequest;
                next(validateTokenError);
            }
        }
    }
};
module.exports = authMiddleware;
