// 对外暴漏必须是一个对象
let myPlugins = {};
myPlugins.install = function(Vue,options){
    console.log(Vue, options)
    Vue.directive(options.name, (element,params)=>{
        console.log(element, params)
        element.innerHTML = params.value.toUpperCase()
    })
}
export default myPlugins;