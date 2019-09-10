const mongoose = require('./db')

var Schema = mongoose.Schema;

var blogSchema = Schema({
    title:String,
    author:String,
    content:String,
    comments:[{title:String,content:String,date:String}],
    date:String,
    hidden:Boolean,
    tags:String,
    time:String
})
var Article = mongoose.model('Article',blogSchema)
/*var small = new Article({title:'small',content:"hello world"})
small.save((err)=>{
    if(err){
        return err
    }
    //保存成功
    console.log("success")
})*/
module.exports = Article
