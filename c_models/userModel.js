
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost/mydata', { useNewUrlParser: true });
const userSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: true},
    password: {type : String, required: true},
    email: {type :String, unique: true,required: true},
    role: String,
    domain: {type: String, default: null}
})

let user = mongoose.model ('user', userSchema);

// add new account from sign up
module.exports.add  = (object) => {
    return new Promise((resolve, reject) => {
        user.create(object,(err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    })           
};

//authentication account user
module.exports.authentication = (username, password) => {
    return new Promise((resolve, reject) => {
        user.find({username:username, password: password}, (err, result) => {
            if(result.length == 1) resolve(result[0]);
            else reject(err);
        })
    })  
}

// get id by username
module.exports.getIdByUser = (username) => {
    return new Promise((resolve, reject) => {
        //resolve("haha");
        user.find({username:username}, (err, result) => {
            if(err) reject(err);
            else resolve(result[0].id);
        })
    }) 
}

// check exist domain
module.exports.existDomain = (domain) => {
    return new Promise((resolve, reject) => {
        user.find({domain:domain}, (err, result) =>{
            if(err) reject(err);
            else{
                if(result.length > 0) resolve(true)
                else resolve(false);
            }
        })
    })
}

//get domain
module.exports.getDomain = (username) => {
    return new Promise((resolve, reject) => {
        user.find({username:username}, (err, result) => {
            if(err) reject(err);
            else resolve(result[0].domain);
        })
    })
}