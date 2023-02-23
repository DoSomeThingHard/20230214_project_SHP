// 对于axios进行二次封装
import axios from 'axios'
import nprogress from 'nprogress'
// start：进度条开始    done：进度条结束
// 引入进度条的样式
import 'nprogress/nprogress.css'

// 在当前模块中 引入 store
import store from '@/store'

// 1：利用axios对象的方法create 去创建一个axios实例
const requests = axios.create({
    // 配置对象  request就是axios，只不过扫尾配置一下
    // 基础路径, 发送请求的时候，路径当中会出现api
    baseURL:'/api',
    // 代表的事请求超时的时间 5s
    timeout: 5000
});

// 请求拦截器：就是在请求发送之前，请求拦截器可以检测到，可以在请求发出之前做一些事情
requests.interceptors.request.use((config)=>{
    // coinfig: 配置对象，对象里面有一个属性很重要 ：headers请求头
    // 传入 token
    let uuidToken = store.state.detail.uuid_token
    if(uuidToken){
        // 给请求头添加字段  userTempId是后台给的
        config.headers.userTempId = uuidToken;
    }
    // 进度条开始动
    nprogress.start()
    return config;
})

// 响应拦截器
requests.interceptors.response.use((res)=>{
    // 请求成功的回调：服务器响应数据回来以后，响应拦截器可以检测到，可以做一些事情
    nprogress.done()    // 进度条结束
    return res.data;
},(error)=>{
    nprogress.done()    // 进度条结束
    // 请求失败的回调函数
    return Promise.reject(new Error('faile'))
})

// 对外暴漏
export default requests