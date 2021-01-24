const {Schema,model} = require('mongoose');
const { isEmailValidator} = require('../shared/mongooseUtilities');
const uuidv1 = require('uuid/v1');
const crypto = require('crypto');

const userSchema = new Schema({
    username : {
        type      : String,
        required  : [true,'Username is required'],
        trim      : true,
        minlength : 4 
    },
    phoneNumber : {
        type      : Number,
        required  : [true,'Phonenumber is required'],
        trim      : true,
        minlength : 10,
        unique    : true
    },
    bloodGroup : {
        type     : String,
        required : [true,'Blood group is required'],
        trim     : true
    },
    donar : {
        type    : Boolean,
        default : true
    },
    notification : {
        type    : Boolean,
        default : true
    },
    encryPassword : {
        type     : Boolean,
        required : [true,'Password is required']
    },
    salt  : String,
    email : {
        type      : String,
        trim      : true,
        lowercase : true,
        validate  : isEmailValidator()
    },
    address : {
        type : String,
        trim : true
    },
    zip : {
        type : String,
        trim : true
    },
    city : {
        type : String,
        trim : true
    }
},
{ timestamps: true });

userSchema.virtual('password')
    .set((password)=>{
        this._password = password;
        this.salt = uuidv1();
        this.encryPassword = this.securePassword(password);
    })
    .get(()=>{
        return this._password ;
    });

userSchema.methods={
    authenticate   : (password)=>this.securePassword(password)===this.encryPassword,
    securePassword : (password)=>{
        if(!password){
            return '';
        }
        try{
            return crypto.createHmac('sha256',this.salt)
                .update(password)
                .digest('hex');
        }catch(err){
            return '';
        }
    }
};

const UserModel = model('User',userSchema);

module.exports = UserModel;
