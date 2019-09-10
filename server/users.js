const mongoose = require('./db')

var Schema = mongoose.Schema;

var blogSchema = Schema({
    user:String,
    password:String
})
var Users = mongoose.model('Users',blogSchema)
/*var small = new Article({title:'small',content:"hello world"})
small.save((err)=>{
    if(err){
        return err
    }
    //保存成功
    console.log("success")
})*/
module.exports = Users