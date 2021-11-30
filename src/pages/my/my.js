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



    const userId = localStorage.getItem('userID')

    function getData() {
        axios.get(`http://139.9.177.51:8099/users/mysportsBadge?userId=${userId}`).then(function (res) {
            render(res.data.data)
        })
    }
    getData()
    function render(data) {
        console.log(data);
        nickname.innerHTML = data.user.nickname
        if (data.user.sign) {
            sign.innerHTML = data.user.sign
        } else {
            sign.innerHTML = '给时间一点时间'
        }
        coursetims.innerHTML = data.sports.coursetims
        calorie.innerHTML = data.sports.calorie
    }


})