// 对外暴漏一个函数 存储Token
export const setToken = (token)=>{
    localStorage.setItem('TOKEN',token)
}
// 取出Token
export const getToken = ()=>{
    return localStorage.getItem('TOKEN')
}
// 删除Token
export const deleteToken = ()=>{
    localStorage.removeItem('TOKEN')
}