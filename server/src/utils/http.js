//封装请求，暂时不用，规范暂时没统一
import qs from 'qs'
import axios from 'axios'

export const post = (url,data={})=>{
    return new Promise((reslove,reject)=>{
        axios.post(url,qs.stringify(data,{
            indices:false
        }),{
            headers:{
                'Content-Type':'application/x-www-form-urlencode'
            }
        }).then(response=>{
            reslove(response.data)
        },err=>{
            reject(err)
        })
    })
}

export const get = (url,params={})=>{
    return new Promise((reslove,reject)=>{
        axios.get(url,{
            params:params
        }).then(response=>{
            reslove(response)
        },err=>{
            reject(err)
        })
    })
}