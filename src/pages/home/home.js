// 引用公共css
require('../../assets/css/normalize.css')
require('../../assets/css/reset.css')
require('../../assets/css/property.css')
require('../../assets/css/basic.less')
//引入直接的css
require('../../assets/fonts/iconfont.css')
require('./home.less')
//引入渲染nav
const dom = require('../../utils/dom.js')
// 引入swiper
require('../../lib/swiper/swiper-bundle.min.css')
const Swiper = require('../../lib/swiper/swiper-bundle.min.js')
const axios = require('axios')
document.addEventListener('DOMContentLoaded', function () {
    dom.renderNav('home')
    const ranknum = document.querySelector('#ranknum')
    const punchCardDay = document.querySelector('#punchCardDay')
    const playcar = document.querySelector('#playcar')
    const badgenum = document.querySelector('#badgenum')
    const linka = document.querySelectorAll('.main a')
    const userId = localStorage.getItem('userID')
    console.log("userId: "+userId)
    /* 初始化swiper */
    const swiper = new Swiper(document.querySelector('.mySwiper'), {
        loop: true, // 循环
        autoplay: {  // 自动播放
            disableOnInteraction: false   //
        },
        pagination: {
            el: ".swiper-pagination",
        },
    })
    //判断本地有没有ID 没有就无法跳转
    if (userId) {
        getData()
    } else {

    }
    function render(data) {
        console.log(data);
        ranknum.innerHTML = data.rank
        punchCardDay.innerHTML = data.punchIn
        badgenum.innerHTML = data.insigniaNum
        if (data.isPunch === 'false') {
            playcar.innerHTML = '今日打卡'
        } else {
            playcar.innerHTML = '已打卡'
            flag = false
        }
    }
    function getData() {
        axios.get(`http://www.songyun.work:8080/agangApi/headPageInfo?userId=${userId}`).then(function (res) {
            console.log(res);
            if (res.data.status === 0) {
                render(res.data.data)
            }
        })
    }
    let flag = true
    playcar.addEventListener('click', function () {
        if (userId) {
            if (flag) {
                axios.get('http://www.songyun.work:8080/agangApi/clockIn?userId=${userId}').then(function (res) {
                    if (res.data.status === 0) {
                        getData()
                    }
                })
            } else {
                console.log('已打卡');
            }
        } else {
            location.href = 'login.html'
        }
    })
})