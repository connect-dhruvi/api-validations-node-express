const mongoose = require('mongoose');

const UserSchema =  new mongoose.Schema({
    
    email:{
        type: String,
    },
    password:{
        type: String,
    },
    name:{
        type: String,
    },
},
  {
      collection: 'users'
  });


module.exports = mongoose.model('users',UserSchema);