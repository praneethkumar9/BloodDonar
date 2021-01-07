const ObjectId = require( 'mongoose' ).Types.ObjectId;
const validator = require('validator');


/**
 * An Object containing all mongoose utility functions
 */
const mongooseUtilities = {
    /**
    * A utility function for checking provided id is mongo objectId or not
    * @author Esari Praneeth kumar
    * @ModifiedBy Esari Praneeth kumar
    * @method
    * @memberof mongooseUtilities
    * @param {String | Number | ObjectId} id- A input strinf id for ObjectId check
    * @requires ObjectId A ObjectId method of mongoose
    * @returns true if valid and false if invalid
    */
    IsMongoObjectId : (id)=>{ 
        if ( id  && ObjectId.isValid( id ) ) {
            return true;
        }
        return false;
    },
    /**
    * A utility function for getting the count of all record matched with conditions object
    * @author Esari Praneeth kumar
    * @ModifiedBy Esari Praneeth kumar
    * @method
    * @memberof mongooseUtilities
    * @param { Model } model- mongoose model on which query opertion should be performed
    * @param { Object } [conditions={}] - An object containing all conditions to be applied on model ( optional field 
    * and if not provided it gives the total count of all records of the model
    * @returns count value
    */
    totalRecordsCount : async (model,conditions={})=>{ 
        return await model.countDocuments(conditions); 
    },
    /**
    * A utility function for getting the max value of all records for a specified field
    * @author Esari Praneeth kumar
    * @ModifiedBy Esari Praneeth kumar
    * @method
    * @memberof mongooseUtilities
    * @param { Model } model- mongoose model on which query opertion should be performed
    * @param { String } fieldName- A String representing the field name for which max value is needed
    * @param { Object } [conditions={}] - An object containing all conditions to be applied on model ( optional field 
    * and if not provided it gives max value without conditions
    * @returns document
    */
    getMaxOfField : async (model,fieldName,conditions={})=>{ 
        return await model
            .findOne(conditions)
            .sort('-'+fieldName); // max value of this field
    },
    /**
    * A utility function for getting the min value of all records for a specified field
    * @author Esari Praneeth kumar
    * @ModifiedBy Esari Praneeth kumar
    * @method
    * @memberof mongooseUtilities
    * @param { Model } model- mongoose model on which query opertion should be performed
    * @param { String } fieldName- A String representing the field name for which min value is needed
    * @param { Object } [conditions={}] - An object containing all conditions to be applied on model ( optional field 
    * and if not provided it gives min value without conditions
    * @returns document
    */
    getMinOfField : async (model,fieldName,conditions={})=>{ 
        return await model
            .findOne(conditions)
            .sort(fieldName); // min value of this field
    },
    /**
    * A utility function for getting the distinct values of the provided fields out of all records 
    * @author Esari Praneeth kumar
    * @ModifiedBy Esari Praneeth kumar
    * @method
    * @memberof mongooseUtilities
    * @param { Model } model- mongoose model on which query opertion should be performed
    * @param { String } fieldName- A String representing the field name for which distinct values are needed
    * @param { Object } [conditions={}] - An object containing all conditions to be applied on model ( optional field 
    * and if not provided it gives distinct value without conditions
    * @returns array with distinct values
    */
    getDistinctRecords : async (model,fieldName,conditions={})=>{ 
        return await model
            .distinct(fieldName,conditions);
    },
    /**
    * A utility function for creating a new record or records into the collection 
    * @author Esari Praneeth kumar
    * @ModifiedBy Esari Praneeth kumar
    * @method
    * @memberof mongooseUtilities
    * @param { Model } model- mongoose model on which query opertion should be performed
    * @param { Array | Object } documents- An object for inserting record or Array of records to be inserted into collection
    * @returns documents
    */
    create : async (model,documents)=>{ 
        return await model
            .create(documents);
    },
    /**
    * A utility function for creating a new record or records into the collection 
    * @author Esari Praneeth kumar
    * @ModifiedBy Esari Praneeth kumar
    * @method
    * @memberof mongooseUtilities
    * @param { Model } model- mongoose model on which query opertion should be performed
    * @param { Array | Object } documents- An object for inserting record or Array of records to be inserted into collection
    * @param { Object } [options={}] - An object containing all options to be applied for insertMany ( optional field )
    * @returns documents
    */
    insertManyRecords : async (model,documents,options={})=>{ 
        return await model
            .insertMany(documents,options);
    },
    /**
    * A utility function for getting a records of the collection 
    * @author Esari Praneeth kumar
    * @ModifiedBy Esari Praneeth kumar
    * @method
    * @memberof mongooseUtilities
    * @param { Model } model- mongoose model on which query opertion should be performed
    * @param { Object } [conditions={}] - An object containing all conditions to be applied on model ( optional field )
    * @param { String } [projection=null] - A String containing all fields to return separated by space and default value is null
    * @param { Object } [options={}] - An object containing all options to be applied on query ( optional field )
    * @returns documents
    */
    findRecords : async (model,conditions={},projection=null ,options={})=>{ 
        //Making lean explicity true if lean option is not provided without false
        if(!(options.lean==false)){
            options ={
                ...options,
                lean : true
            };
        }
        return await model
            .find(conditions,
                projection,
                options
            );
    },
    /**
    * A utility function for getting a first found record of the collection on query execution
    * @author Esari Praneeth kumar
    * @ModifiedBy Esari Praneeth kumar
    * @method
    * @memberof mongooseUtilities
    * @param { Model } model- mongoose model on which query opertion should be performed
    * @param { Object } [conditions={}] - An object containing all conditions to be applied on model ( optional field )
    * @param { Object } [options={}] - An object containing all options to be applied on query ( optional field )
    * @returns documents
    */
    findFirstRecord : async (model,conditions={},projection=null,options={})=>{ 
        //Making lean explicity true if lean option is not provided without false
        if(!(options.lean==false)){
            options ={
                ...options,
                lean : true
            };
        }
        return await model
            .findOne(conditions,
                projection,
                options
            );
    },
    /**
    * A utility function for getting records of the collection by objectId
    * @author Esari Praneeth kumar
    * @ModifiedBy Esari Praneeth kumar
    * @method
    * @memberof mongooseUtilities
    * @param { Model } model- mongoose model on which query opertion should be performed
    * @param { ObjectId | |Number | String } id - id of the document record 
    * @param { String } [projection=null] - A String containing all fields to return separated by space and default value is null
    * @param { Object } [options={}] - An object containing all options to be applied on query ( optional field )
    * @returns documents
    */
    findRecordsById : async (model,id,projection=null ,options={})=>{ 
        //Making lean explicity true if lean option is not provided without false
        if(!(options.lean==false)){
            options ={
                ...options,
                lean : true
            };
        }
        return await model
            .findById(id,
                projection,
                options
            );
    },
    /**
    * A utility function for updating the first found record of the collection which matches the conditions
    * @author Esari Praneeth kumar
    * @ModifiedBy Esari Praneeth kumar
    * @method
    * @memberof mongooseUtilities
    * @param { Model } model- mongoose model on which query opertion should be performed
    * @param { Object } [conditions={}] - An object containing all conditions to be applied on model ( optional field )
    * and if not provided it will update first found record in the collection without match of any conditions
    * @param { Object } updateObject - An object containing all field with values which are to be applied
    * @param { Object } [options={ lean: true }] - An object containing all options to be applied on query ( optional field )
    * and default value is {  lean: true }
    * @returns Object with no of records matched as n , no of records modified nModified , ok if successfull
    */
    updateFirstRecord : async (model,conditions={},updateObject ,options={ lean: true })=>{ 
        return await model
            .updateOne(conditions,
                updateObject,
                {...options}
            );
    },
    /**
    * A utility function for updating all the records of the collection which matches the conditions
    * @author Esari Praneeth kumar
    * @ModifiedBy Esari Praneeth kumar
    * @method
    * @memberof mongooseUtilities
    * @param { Model } model- mongoose model on which query opertion should be performed
    * @param { Object } [conditions={}] - An object containing all conditions to be applied on model ( optional field )
    * and if not provided it will update all records in the collection without match of any conditions
    * @param { Object } updateObject - An object containing all field with values which are to be applied
    * @param { Object } [options={ lean: true }] - An object containing all options to be applied on query ( optional field )
    * and default value is {  lean: true }
    * @returns  Object with no of records matched as n , no of records modified nModified , ok if successfull 
    */
    updateManyRecords : async (model,conditions={},updateObject ,options={ lean: true })=>{ 
        return await model
            .updateMany(conditions,
                updateObject,
                {...options,lean: true}
            );
    },
    /**
    * A utility function for updating first found records of the collection which matches the find conditions
    * @author Esari Praneeth kumar
    * @ModifiedBy Esari Praneeth kumar
    * @method
    * @memberof mongooseUtilities
    * @param { Model } model- mongoose model on which query opertion should be performed
    * @param { Object } [conditions={}] - An object containing all conditions to be applied on model ( optional field )
    * and if not provided it will update all records in the collection without match of any conditions
    * @param { Object } updateObject - An object containing all field with values which are to be applied
    * @param { Object } [options= { new: true }] - An object containing all options to be applied on query ( optional field )
    * and default value is { new: true }
    * @returns new updated document
    */
    findOneAndUpdateRecord : async (model,conditions={},
        updateObject ,options= { lean: true , new: true })=>{ 
        //Making lean explicity true if lean option is not provided without false
        if(!(options.lean==false)){
            options ={
                ...options,
                lean : true
            };
        }
        return await model
            .findOneAndUpdate(conditions,
                updateObject,
                {...options , new: true}
            );
    },
    /**
    * A utility function for updating record of the collection by record id
    * @author Esari Praneeth kumar
    * @ModifiedBy Esari Praneeth kumar
    * @method
    * @memberof mongooseUtilities
    * @param { Model } model- mongoose model on which query opertion should be performed
    * @param { ObjectId | |Number | String } id - id of the document record 
    * @param { Object } updateObject - An object containing all field with values which are to be applied
    * @param { Object } [options= { new: true }] - An object containing all options to be applied on query ( optional field )
    * and default value is {  new: true }
    * @returns new updated document
    */
    findByIdAndUpdateRecord : async (model,id,
        updateObject ,options= {  new: true })=>{ 
        //Making lean explicity true if lean option is not provided without false
        if(!(options.lean==false)){
            options ={
                ...options,
                lean : true
            };
        }
        return await model
            .findByIdAndUpdate(id,
                updateObject,
                {...options , new: true}
            );
    },
    /**
    * A utility function for deleting first record of the collection which matches conditions
    * @author Esari Praneeth kumar
    * @ModifiedBy Esari Praneeth kumar
    * @method
    * @memberof mongooseUtilities
    * @param { Model } model- mongoose model on which query opertion should be performed
    * @param { Object } [conditions={}] - An object containing all conditions to be applied on model ( optional field 
    * and if not provided it will delete all records of the model without conditions
    * @param { Object } [options= {}] - An object containing all options to be applied on query ( optional field )
    * and default value is {}
    * @returns Object with no of records matched as n , no of records deleted deleteCount , ok if successfull 
    */
    deleteFirstRecord : async (model,conditions,options= {})=>{ 
        return await model
            .deleteOne(conditions,
                options
            );
    },
    /**
    * A utility function for deleting all records of the collection which matches conditions
    * @author Esari Praneeth kumar
    * @ModifiedBy Esari Praneeth kumar
    * @method
    * @memberof mongooseUtilities
    * @param { Model } model- mongoose model on which query opertion should be performed
    * @param { Object } [conditions={}] - An object containing all conditions to be applied on model ( optional field 
    * and if not provided it will delete all records of the model without conditions
    * @param { Object } [options= {}] - An object containing all options to be applied on query ( optional field )
    * and default value is {}
    * @returns Object with no of records matched as n , no of records deleted deleteCount , ok if successfull 
    */
    deleteManyRecords : async (model,conditions,options= {})=>{ 
        return await model
            .deleteMany(conditions,
                options
            );
    },
    /**
    * A utility function for deleting the record of the collection by its id
    * @author Esari Praneeth kumar
    * @ModifiedBy Esari Praneeth kumar
    * @method
    * @memberof mongooseUtilities
    * @param { Model } model- mongoose model on which query opertion should be performed
    * @param { ObjectId | |Number | String } id - id of the document record 
    * @param { Object } [options= {}] - An object containing all options to be applied on query ( optional field )
    * and default value is {}
    * @returns deleted document
    */
    findByIdAndDeleteRecords : async (model,id,options= {})=>{ 
        return await model
            .findByIdAndDelete(id,
                options
            );
    },
    /**
    * A utility function for deleting the first found record of the collection which matches conditions 
    * @author Esari Praneeth kumar
    * @ModifiedBy Esari Praneeth kumar
    * @method
    * @memberof mongooseUtilities
    * @param { Model } model- mongoose model on which query opertion should be performed
    * @param { Object } [conditions={}] - An object containing all conditions to be applied on model ( optional field 
    * and if not provided it will delete first found records of the model without conditions
    * @param { Object } [options= {}] - An object containing all options to be applied on query ( optional field )
    * and default value is {}
    * @returns deleted document
    */
    findOneAndDeleteRecords : async (model,conditions,options= {})=>{ 
        return await model
            .findOneAndDelete(conditions,
                options
            );
    },
    /**
    * A utility function for validating email address
    * @author Esari Praneeth kumar
    * @ModifiedBy Esari Praneeth kumar
    * @method
    * @memberof mongooseUtilities
    * @param { String } value- A string representing the email address
    * @returns true/false based on validation
    */
    isEmailValidator : ()=>{ 
        return {
            validator : function(value){
                return validator.isEmail(value);
            },
            message : props => `${props.value} is not a valid email address!`
        };
    }
};
module.exports = mongooseUtilities;
