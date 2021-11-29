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
        let pswVal = pswIpt.value
        clear()
        if (!/^[0-9]{11}$/.test(phoneVal)) {
            tips.innerHTML = '请输入正确的手机号'
            phoneIpt.style.border = '1px solid red'
            return
        } else if (!/^\w{6,12}$/.test(pswVal)) {
            pswIpt.style.border = '1px solid red'
            tips.innerHTML = '请输入正确的密码'
            return
        } else {
            tips.innerHTML = ''
            axios.post('http://139.9.177.51:8099/users/login', {
                account: phoneVal,
                password: pswVal
            }).then(function (res) {
                console.log(res.data);
                if (res.data.status == 0) {
                    alert('登录成功！')
                    location.href = './login.html'
                } else {
                    tips.innerHTML = '用户名或密码错误'
                }
            })

        }

    })

    function clear() {
        phoneIpt.style.border = '1px solid rgba(255, 255, 255, 0.1)'
        pswIpt.style.border = '1px solid rgba(255, 255, 255, 0.1)'
    }

})