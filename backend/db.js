const mongoose = require('mongoose');

mongoose.connect('xxx');

const userSchema = mongoose.Schema({
   username: String,
   firstname: String,
   lastname: String,
   password: String
   
   
 });
 

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
})

const Account = mongoose.model('Account', accountSchema);
const User = mongoose.model('User',userSchema);

module.exports = {
    Account,
    User
};

