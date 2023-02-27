import Vue from 'vue'
// vee-validate插件 表单验证区域
import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'
Vue.use(VeeValidate)

// 表单的验证
VeeValidate.Validator.localize('zh_CN', {
    messages:{
        ...zh_CN.messages,
        is: (field) => `${field}必须与密码相同` // 修改内置规则的 message 让确认密码和密码相同
    },
    // 这个就是对照 根据key找到key对应的翻译 用于内部报错信息的替换
    attributes:{
        phone: '手机号',
        code: '验证码',
        password: '密码',
        passwordSure: '确认密码',
        isCheck: '协议',
    }
});

// 自定义校验规则
VeeValidate.Validator.extend('agree',{
    validate: value => {
        return value
    },
    getMessage: field => field + '必须同意'
})