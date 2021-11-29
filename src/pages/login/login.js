// 引用公共css
require('../../assets/css/normalize.css')
require('../../assets/css/reset.css')
require('../../assets/css/property.css')
require('../../assets/css/basic.css')

//引入直接的css
require('./login.less')


//引入axios
const { default: axios } = require('axios')

/* 监听dom加载完毕 */
document.addEventListener('DOMContentLoaded', function () {

    //获取dom
    const phoneIpt = document.querySelector('#phoneIpt')
    const pswIpt = document.querySelector('#pswIpt')
    const loginBtn = document.querySelector('#loginBtn')
    const tips = document.querySelector('#tips')

    loginBtn.addEventListener('click', function () {
        let phoneVal = phoneIpt.value
        let verifyIptVal = verifyIpt.value.toUpperCase()
        let pswVal = pswIpt.value
        let pswAgainVal = pswAgainIpt.value

        clear()
        if (!/^[0-9]{11}$/.test(phoneVal)) {
            tips.innerHTML = '手机号格式错误'
            phoneIpt.style.border = '1px solid red'
            return
        } else if (verifyIptVal !== code) {
            verifyIpt.style.border = '1px solid red'
            tips.innerHTML = '验证码错误'
            return
        } else if (!/^\w{6,12}$/.test(pswVal)) {
            pswIpt.style.border = '1px solid red'
            tips.innerHTML = '字母或数字 6-12位的密码'
            return
        } else if (pswVal !== pswAgainVal) {
            pswAgainIpt.style.border = '1px solid red'
            tips.innerHTML = '两次密码不一致'
            return
        } else {
            tips.innerHTML = ''
            axios.post('http://139.9.177.51:8099/users/add', {
                account: phoneVal,
                password: pswVal
            }).then(function (res) {
                console.log(res.data);
                if (res.data.status == 0) {
                    alert('注册成功！')
                    location.href = './login.html'
                } else if (res.data.status == 1) {
                    tips.innerHTML = '该手机号已注册'
                } else {
                    alert('注册失败！')
                }
            })

        }

    })

    function clear() {
        phoneIpt.style.border = '1px solid rgba(255, 255, 255, 0.1)'
        pswIpt.style.border = '1px solid rgba(255, 255, 255, 0.1)'
    }

})