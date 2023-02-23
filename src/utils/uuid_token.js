import {v4 as uuidv4} from 'uuid'
// 要生成一个随机的字符串 且每次执行不能发生变化，游客身份持有存储
export const getUUID = ()=>{
    // 先从本地存储获取uuid 看看有没有
    let uuid_token = localStorage.getItem('UUIDTOKEN');
    // 如果没有 我就去生成
    if(!uuid_token){
        // 我们生成
        uuid_token = uuidv4();
        // 然后本地存储起来
        localStorage.setItem('UUIDTOKEN', uuid_token)
    }
    return uuid_token;
}