module.exports = {
    // 关闭eslint
    lintOnSave: false,
    // 打包不要map文件
    productionSourceMap: false, 
    // 代理跨域
    devServer: {
        proxy:{
            '/api':{
                target:'http://gmall-h5-api.atguigu.cn'
            }
        }
    }
}