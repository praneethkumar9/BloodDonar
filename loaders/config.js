
const envVariables =  process.env;
const  config =  {
    mongoDbUrl : envVariables.MONGO_DB_URL,
    database   : envVariables.DATABASE,
    env        : envVariables.ENVIRONMENT,
    jwtSecret  : envVariables.JWT_SECRET
};

/**
 * A printAllConfigurations utility method to console all configuration
 * @author Esari praneeth kumar
 * @modifiedBy Esari praneeth kumar
 */
const printAllConfigurations=()=>{
    console.log('configurations:- \n'); 
    console.log('mongo ');
    console.log('\t connection string : '+config.mongoDbUrl);
    console.log('\t database name : '+config.database);
    console.log('environment :'+config.env);
   
};
module.exports = {
    printAllConfigurations ,
    config
};
