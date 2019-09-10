const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/blog',{ useNewUrlParser: true ,useCreateIndex: true,useFindAndModify:false})
  .then(function(){
    console.log('blog数据库连接成功');
  })
  .catch(function(error){
    console.log('连接blog数据库失败，原因:' + error);
  });

module.exports = mongoose;