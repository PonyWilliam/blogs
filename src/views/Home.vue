<template>
    <div @show="funcA" class="home">
        <div class="header">
            <h3 class="title">
                tsc的个人博客
            </h3>

        </div>
        <div class="content">
            <div class="content_block" v-for="msg in msgs" :key="msg.id">
                <div class="content_tags">
                    <h2>

                    </h2>
                </div>
                <div class="content_title">
                    <h3>
                        {{msg.title}}
                    </h3>
                </div>
                <div class="content_content">
                    <p>
                        {{msg.content}}
                    </p>
                </div>
                <div class="content_footer">
                    <span>
                         {{msg.time}}
                    </span>
                </div>
            </div>
                <div class="content_block">
                <div class="content_tags">
                    <h2>

                    </h2>
                </div>
                <div class="content_title">
                    <h3>
                        专属博客
                    </h3>
                </div>
                <div class="content_content">
                    <p>
                        这是你的专属博客
                    </p>
                </div>
                <div class="content_footer">
                    <span>
                         2019年9月10日 22:50:00
                    </span>
                </div>
            </div>
        </div>
        <div class="footer">
            <span>本网站版权及所有权归tsc所有©️2019</span>
        </div>
    </div>
</template>
<style>
    body{
        background-size:cover;
        background:no-repeat fixed center;
    }
    .home{
        display: flex;
        flex-direction: row;/*横向flex布局*/ 
        flex-wrap: wrap;/*宽度不够还是老老实实的换行吧 */
    }
    .header{
        margin-left:10%;
        padding:20px 0;
        width:80%;
    }
    .header .title{
        text-align: center;
        display: inline;
        font-size:24px;
        line-height:48px;
        box-shadow:1px 1px 15px rgba(247,25,62,0.25);
        color:rgb(253, 207, 122);
    }
    .content{
        border-radius:8px;
        text-align: center;
        width:80%;
        margin-left:10%;
        background:rgba(0, 0, 0, .02);
        padding:20px 5px;
    }
    .content .content_block{
        width:calc(100% - 34px);
        padding:15px 12px;
        border-radius: 10px;
        background:rgba(255, 255, 255, .75);
        margin-bottom:20px;
    }
    .content .content_block .content_title{
        width:100%;
    }
    .content .content_block .content_content{
        width:100%;
    }
    .content .content_block .content_title h3{
        text-align: left;
        font-size:18px;
        line-height:36px;
        display: block;
        width:calc(100% -10px);
        padding:2px 5px;
        margin-bottom: 5px;
    }
    .content .content_block .content_content p{
        font-size:14px;
        text-align: left;
        text-indent: 28px;/**防止爆炸 */
        line-height:28px;
    }
    .content .content_block .content_footer{
        width:calc(100% - 12px);
        padding:2px 6px;
        margin-bottom: 3px;
        border-top:1px solid #ccc;
    }
    .content .content_block .content_footer span{
        text-align: right;
        display: block;
        color:#777;
        font-size:10px;
    }
    .footer{
        width:100%;
        position: fixed;
        padding:20px 0;
        background:rgba(255, 255, 255, .65);
        bottom:0;

    }
    .footer span{
        text-align: center;
        display: block;
        font-size:14px;
        color:#444;
    }
/*
        color:#222;
        font-size:18px;
 */
</style>
<script>
/*
假设数据:


{"code":1,"msg":[{"_id":"5d779a529151d94a0cae0b4f","title":"12312","content":"12313","tags":"默认的","time":"2019年9月10日 20:42:58","comments":[],"__v":0},{"_id":"5d779c379c1b0d4b8f9f3e66","title":"123","content":"123","tags":"默认的","time":"2019年9月10日 20:51:3","comments":[],"__v":0}]}
*/
var data = `{"code":1,"msg":[{"_id":"5d779a529151d94a0cae0b4f","title":"12312","content":"12313","tags":"默认的","time":"2019年9月10日 20:42:58","comments":[],"__v":0},{"_id":"5d779c379c1b0d4b8f9f3e66","title":"123","content":"123","tags":"默认的","time":"2019年9月10日 20:51:3","comments":[],"__v":0},{"_id":"5d77a349cf6bfa4fee691d27","title":"大家好","content":"大家好","tags":"默认的","time":"2019年9月10日 21:21:13","comments":[],"__v":0}]}`
import imgUrl from '../assets/background.jpg'
import $ from 'jquery'
import axios from 'axios'
import { parse } from 'path';
$('body').css('background-image','url('+imgUrl+')')
axios.get('/get').then((res)=>{
    console.log(res.data.msg)
})
export default {
    name:'Home',
    data(){
        return{
            msgs:[]
        }
    },
    methods:{
        funcA(){
            axios.get('/get').then((res)=>{
                this.msgs = res.data.msg
                this.msgs = this.msgs.reverse()
            })
        }
    },
    created (){
        this.funcA()//让页面可以重新渲染
    }
}
</script>