// 引用公共css
require('../../assets/css/normalize.css')
require('../../assets/css/reset.css')
require('../../assets/css/property.css')
require('../../assets/css/basic.less')

//引入直接的css
require('../../assets/fonts/iconfont.css')
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
        let pswVal = pswIpt.value
        clear()
        if (!/^[0-9]{11}$/.test(phoneVal)) {
            tips.innerHTML = '请输入正确的手机号'
            phoneIpt.style.border = '1px solid red'
        } else if (!/^\w{6,12}$/.test(pswVal)) {
            pswIpt.style.border = '1px solid red'
            tips.innerHTML = '请输入正确的密码'
        } else {
            tips.innerHTML = ''
            axios.post('http://www.songyun.work:8080/agangApi/users/login', {
                account: phoneVal,
                password: pswVal
            }).then(function (res) {
                console.log(res.data);
                if (res.data.status === 0) {
                    localStorage.setItem('userID', res.data.data.user.userId)
                    weui.toast('登录成功！')
                    setTimeout(function () {
                        location.href = './home.html'
                    }, 500)
                } else {
                    weui.topTips('用户名或密码错误')
                }
            })
        }
    })

    function clear() {
        phoneIpt.style.border = '1px solid rgba(255, 255, 255, 0.1)'
        pswIpt.style.border = '1px solid rgba(255, 255, 255, 0.1)'
    }
})