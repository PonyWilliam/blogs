const Koa = require('koa')
const router = require('koa-router')()//router 是一个函数
const bodyParser = require('koa-bodyparser')
const app = new Koa()//和express一样的骚操作
const path = require('path')
const static = require('koa-static')
const Article = require('./Article')
const User = require('./User')
const fs = require('fs')
require('./db')
app.use(bodyParser());
var res,utemp
router.get('/',async(ctx,next)=>{
    ctx.response.body = "blog后端服务，欢迎破解"
})
router.get('/setting',async(ctx,next)=>{
    if(ctx.request.query.password&&ctx.request.query.code){
        //code 是校验码
        var username,pwd,code
        username = 'tsc'
        pwd = ctx.request.query.password
        code = ctx.request.query.code
        if(code == 'tsc666'){
            var wehre = {user:'tsc'}
            fs.exists(path.join(__dirname,'temp.txt'),(flag)=>{
                if(flag){
                    User.updateOne(wehre,{$set:{user:'tsc',password:pwd}},(err,doc)=>{
                        if(err){
                            console.log(err)
                        }else{
                            console.log(doc)
                            console.log('update!')
                        }
                      res = {'code':1,'msg':'修改密码成功'}
                    })
                }else{
                      var temp = new User({
                          user:'tsc',
                          password:pwd
                      })
                      temp.save((err)=>{
                          if(err){
                              res = {"code":0,"msg":"error"}
                              ctx.response.body = res
                              return err
                          }
                      })
                }
            })
            var data = `user:${username},pwd:${pwd},code:${code},ip:${ctx.headers['x-forwarded-for'] || ctx.headers['x-real-ip']},user:${ctx.headers['user-agent']}\n`
        }else{
            res = {'code':0,'msg':'校验码错误'}
        }
        ctx.response.body = res
    	fs.writeFileSync(path.join(__dirname,'temp.txt'),data,{flag:'a'})
        return
    }
    ctx.response.body = "参数不正确"
})
router.get('/get',async(ctx,next)=>{
    await Article.find({},(err,doc)=>{
        if(err){
            res = {code:0,msg:'数据库连接错误'}
        }else{
            res = {code:1,msg:doc}
        }
    })
    ctx.response.body = res;
})
router.get('/login',async(ctx,next)=>{
    //这个才是最重要的
    var user = ctx.request.query.user || ""
    var pwd = ctx.request.query.pwd || ""
    await User.find({user:'tsc'},(err,ret)=>{//等待查询结果
        if(err){
            res = {'code':0,msg:'操作失败，请联系管理员'}
        }else{
            //先不用参数，这个只是单纯查询
            utemp = ret[0]['password']//丢一个cookie
        }
    })
    if(user == 'tsc' && pwd == utemp){
        res = {"code":1,"msg":"登陆成功"}
        //丢个cookie 验证用
    }
    else if(user !== 'tsc' || pwd !== utemp){
        res = {"code":0,"msg":"账号或密码错误"}
    }else{
        res = {"code":0,"msg":"未知错误"}
    }
    ctx.response.body = res
})
router.post('/article',async(ctx,next)=>{
    var title = ctx.request.body.title || "没有标题"
    var content = ctx.request.body.content || "没有内容"
    let tags = ctx.request.body.tags || "默认的"
    console.log(title,content)
    var mydate = new Date()
    let year = mydate.getFullYear()
    let month = mydate.getMonth() + 1
    let day = mydate.getDate()
    let hour = mydate.getHours()
    let min = mydate.getMinutes()
    let second = mydate.getSeconds()
    if(hour<10){
        hour = '0' + hour
    }
    if(min<10){
        min = '0' + min
    }
    if(second<10){
        second = '0' + second
    }
    let temptime = `${year}年${month}月${day}日 ${hour}:${min}:${second}`
    var temp = new Article({
        title:title,
        content:content,
        tags:tags,
        time:temptime
    })
    await temp.save((err)=>{
        if(err){
            res = {"code":0,"msg":"error"}
            ctx.response.body = res
            return err
        }
    })
    res = {"code":1,"msg":"保存成功，留在本页继续发表文章，还是前往主页查看文章？"}
    console.log(res)
    ctx.response.body = res
    
})
app.use(static(path.join(__dirname,'dist')))
app.use(router.routes())
app.listen(80)