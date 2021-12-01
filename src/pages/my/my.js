// 引用公共css
require('../../assets/css/normalize.css')
require('../../assets/css/reset.css')
require('../../assets/css/property.css')
require('../../assets/css/basic.css')


//引入直接的css
require('../../assets/fonts/iconfont.css')
require('./my.less')


const axios = require('axios')


document.addEventListener('DOMContentLoaded', function () {


    const nickname = document.querySelector('#nickname')
    const sign = document.querySelector('#sign')
    const coursetims = document.querySelector('#coursetims')
    const calorie = document.querySelector('#calorie')
    const userOut = document.querySelector('#userOut')
    const headPhoto = document.querySelector('#headPhoto')


    const userId = localStorage.getItem('userID')

    function getData() {
        axios.get(`http://139.9.177.51:8099/users/mysportsBadge?userId=${userId}`).then(function (res) {
            if (res.data.status === 0) {
                render(res.data.data)
            }
        })
    }
    getData()
    function render(data = defaulData) {
        nickname.innerHTML = data.user.nickname
        if (data.user.sign) {
            sign.innerHTML = data.user.sign
        } else {
            sign.innerHTML = '给时间一点时间'
        }
        coursetims.innerHTML = data.sports.coursetims
        calorie.innerHTML = data.sports.calorie
        if (localStorage.getItem('userID')) {
            userOut.innerHTML = '退出登录'
        } else {
            userOut.innerHTML = '登录'
        }
    }

    let defaulData = {
        user: {
            nickname: '请登录账号',
            sign: '给时间一点时间'
        },
        sports: {
            coursetims: 0,
            calorie: 0
        }
    }


    userOut.addEventListener('click', function () {
        if (localStorage.getItem('userID')) {
            localStorage.removeItem('userID')
            render()
        } else {
            location.href = 'login.html'
        }
    })

    headPhoto.addEventListener('click', function () {
        if (localStorage.getItem('userID')) {
            console.log('个人简介');
        } else {
            location.href = 'login.html'
        }
    })



})