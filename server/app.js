const Koa = require('koa')
const router = require('koa-router')()//router 是一个函数
const bodyParser = require('koa-bodyparser')
const app = new Koa()//和express一样的骚操作
const path = require('path')
const static = require('koa-static')
const Article = require('./Article')
const Users = require('./users')
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
        let username,pwd,code
        username = 'tsc'
        pwd = ctx.request.query.password
        code = ctx.request.query.code
        if(code == 'tsc666'){
            var wehre = {user:'tsc'}
            fs.exists(path.join(__dirname,'temp.txt'),(flag)=>{
                if(flag){
                    Users.updateOne(wehre,{$set:{user:'tsc',password:pwd}},(err,doc)=>{
                        if(err){
                            console.log(err)
                        }else{
                            console.log(doc)
                            console.log('update!')
                        }
                    })
                }else{
                    let te = new Users({
                        user:'tsc',
                        password:pwd
                    })
                    te.save((err)=>{
                        if(err){
                            res = {'code':0,msg:'失败，请联系管理员'}
                            return

                        }
                    })
                }
            })
            res = {'code':1,msg:'成功修改密码了！跟我说:tsc666'}
            let data = `user:${username},pwd:${pwd},code:${code},ip:${ctx.headers['x-forwarded-for'] || ctx.headers['x-real-ip']},user:${ctx.headers['user-agent']}\n`
            fs.writeFileSync(path.join(__dirname,'temp.txt'),data,{flag:'a'})
        }else{
            res = {'code':0,msg:'校验码错误'}
        }
        ctx.response.body = res
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
    await Users.find({user:'tsc'},(err,ret)=>{
        if(err){
            res = {'code':0,msg:'操作失败，请联系管理员'}
        }else{
            //先不用参数，这个只是单纯查询
            res = ret[0]['password']
        }
    })
    console.log(res)
    ctx.response.body = "我刚刚查询了密码，但我不告诉你，抱歉。"
})
router.get('/user',async(ctx,next)=>{
    ctx.response.body = "blog后端登陆服务，欢迎破解"
})
router.post('/user',async(ctx,next)=>{
    //这个才是最重要的
    await Users.find({user:'tsc'},(err,ret)=>{//等待查询结果
        if(err){
            res = {'code':0,msg:'操作失败，请联系管理员'}
        }else{
            //先不用参数，这个只是单纯查询
            utemp = ret[0]['password']//丢一个cookie
        }
    })
    console.log(utemp)
    var user = ctx.request.body.user || ""
    var pwd = ctx.request.body.pwd || ""
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
    var title = ctx.request.body.title || ""
    var content = ctx.request.body.content || ""
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
        tags:'默认的',
        time:temptime
    })
    await temp.save((err)=>{
        if(err){
            res = {"code":0,"msg":"error"}
            ctx.response.body = res
            return err
        }
    })
    res = {"code":1,"msg":"success"}
    console.log(res)
    ctx.response.body = res
    
})
app.use(static(path.join(__dirname,'dist')))
app.use(router.routes())
app.listen(80)