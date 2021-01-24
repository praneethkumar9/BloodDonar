const UserModel = require('../models/user.model');
const mongooseUtilities = require('../shared/mongooseUtilities');
const {statusCodes,responseMessages} = require('../shared/constants');
const utilityMethods = require('../shared/utilityMethods');
const {config} = require('../loaders/config');

const userServices ={
    register : async (params)=>{
        const {
            username,
            phoneNumber,
            bloodGroup,
            password
        } =  params;

        //mandatory fields missing
        if(!username||!phoneNumber||!bloodGroup||!password){
            let error = new 
            Error(responseMessages.parametersMissing+' : username/phoneNumber/bloodGroup/password');
            error.statusCode =statusCodes.badRequest;
            throw error;
        }
        // length validation
        if(username.length<4){
            let error = new 
            Error('username should have 4 characters atleast');
            error.statusCode =statusCodes.badRequest;
            throw error;
        }
        if(phoneNumber.length<10){
            let error = new 
            Error('Phone number should have atleast 10 digits');
            error.statusCode =statusCodes.badRequest;
            throw error;
        }
     
        // user document data
        let userData = {
            username,
            phoneNumber,
            bloodGroup,
            password,
            donar        : (params.donar!=undefined) ?params.donar: true,
            notification : (params.notification!=undefined) ?params.notification: true
        };
        //assigning optional data if provided
        if(params.email){
            userData.email = params.email;
        }
        if(params.address){
            userData = {
                ...userData,
                address : params.address,
                zip     : params.zip,
                city    : params.city
            };
        }
        await mongooseUtilities.create(UserModel,userData);
        return [{message: 'User is successfully registered'},statusCodes.success];
    },
    login : async (params)=>{
        const {
            username,
            phoneNumber,
            password
        } =  params;

        //mandatory fields missing
        if((!username && !phoneNumber)||!password){
            let error = new 
            Error(responseMessages.parametersMissing+' : username/phoneNumber/password');
            error.statusCode =statusCodes.badRequest;
            throw error;
        }
        const condition = {};
        username&&(condition.username=username);
        phoneNumber&&(condition.phoneNumber=phoneNumber);
        const userData = await mongooseUtilities
            .findFirstRecord(UserModel,condition ,null ,{lean: false});

        // Validating encrypted password   
        if(!userData.authenticate(password)){
            let error = new 
            Error('Invalid credentials');
            error.statusCode =statusCodes.unauthorized;
            throw error;
        }
        const jwtPayLoad = { _id: userData._id.toString() };
        const jwtOptions ={
            expiresIn : 60*60*1000 // 1 hour in milliiseconds 
        };
        const response = {
            message : 'User is successfully logged in',
            user    : {
                ...userData._doc,
                salt          : undefined,
                encryPassword : undefined,
                createdAt     : undefined,
                updatedAt     : undefined,
                __v           : undefined

            },
            token     : utilityMethods.generateJwtToken(jwtPayLoad,config.jwtSecret,jwtOptions),
            expiresIn : jwtOptions.expiresIn + (2*60*1000) // adding 2 mins grace time to expires in
        };
        return [response,statusCodes.success];
    }
};
module.exports = userServices;
