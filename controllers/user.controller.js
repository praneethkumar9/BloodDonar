const userServices = require('../services/user.services');
const responseUtils = require('../shared/responseUtil');
const userController ={
    register : async (req,res,next)=>{
        try{
            const params = req.body;
            const [response,statusCode] = await userServices.register(params);
            return responseUtils.sendSuccess(response,statusCode,res);
        }catch(error){
            next(error);
        }
    },
    login : async (req,res,next)=>{
        try{
            const params = req.body;
            const [response,statusCode] = await userServices.login(params);
            return responseUtils.sendSuccess(response,statusCode,res);
        }catch(error){
            next(error);
        }
    }
};
module.exports = userController;
