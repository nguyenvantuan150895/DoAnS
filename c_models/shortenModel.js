
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mydata', { useNewUrlParser: true });
const shortenSchema = new mongoose.Schema({
    url: {type: String, unique: true},
    group: {type: String, default: null},
    resource: {type: String, default: null},
    totalClick: { type: Number, default: 0 }
})
const shorten = mongoose.model ('shorten', shortenSchema);

//save shortUrl
module.exports.save = (object) => {
    return new Promise((resolve, reject) => {
        shorten.create(object, (err, result) => {
            if(err) reject(err);
            else resolve(result);
        }) 
    })
}

//get id by short_url
module.exports.getId = (url) => {
    return new Promise((resolve, reject) => {
        shorten.findOne({url: url}, (err, result) => {
            if(err) reject(err);
            else  resolve(result);
        })
    })
}
//get object shortUrl by id
module.exports.getObUrlShorten = (id) => {
    return new Promise ((resolve, reject) => {
        shorten.findOne({_id: id}, (err, result) => {
            if(err) reject(err);
            else resolve (result);
        })
    })
}
//update
module.exports.update = (id, object) => {
    return new Promise((resolve, reject) => {
        shorten.updateOne({_id: id}, object, (err, result) => {
            if(err) reject(err);
            else resolve(result);
        })
    })  
}
//delete 
module.exports.delete = (id) => {
    return new Promise((resolve, reject) => {
        shorten.deleteOne({_id: id}, (err, result) => {
            if(err) reject(err);
            else resolve(result);
        })
    }) 
}
//check Exist url shorten
module.exports.checkExist = (newUrl) => {
            //console.log("url check Exist:", newUrl);
    return new Promise((resolve, reject) => {
        shorten.find({url : newUrl},(err, result) => {
                //console.log("Result checkExist model:", result);
            let len = result.length;
            if(len > 0) {
                resolve(true);
            } else {
                resolve(false);
            }
        })
    })
}
//get all shorten url
module.exports.getAllShortUrl = () => {
    return new Promise((resolve, reject) => {
        shorten.find((err, result)=> {
            if(err) reject(err);
            else resolve(result);
        })
    })
}
//get total click by id shorten
module.exports.getTotalClick = (id_shorten) => {
    return new Promise((resolve, reject) => {
        //console.log("IDshorten receive:", id_shorten);
        shorten.find({_id:id_shorten},(err, result) => {
            //console.log("result getTotalClick:", result);
            if(err) reject(err);
            else resolve(result[0].totalClick);
        })
    })
}

// get all ( for purpose test)
module.exports.getAll = () => {
    return new Promise((resolve, reject)=> {
        shorten.find({},(err, result) => {
            if(err)reject(err);
            else resolve(result);
        })
    })
}