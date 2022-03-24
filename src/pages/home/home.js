// 引用公共css
require('../../assets/css/normalize.css')
require('../../assets/css/reset.css')
require('../../assets/css/property.css')
require('../../assets/css/basic.less')
//引入直接的css
require('../../assets/fonts/iconfont.css')
require('./home.less')
//引入渲染nav 导航栏
const dom = require('../../utils/dom.js')
// 引入swiper 滑动
require('../../lib/swiper/swiper-bundle.min.css')
const Swiper = require('../../lib/swiper/swiper-bundle.min.js')
const axios = require('axios')

document.addEventListener('DOMContentLoaded', function () {
    dom.renderNav('home')
    const ranknum = document.querySelector('#ranknum')
    const punchCardDay = document.querySelector('#punchCardDay')
    const playcar = document.querySelector('#playcar')
    const badgenum = document.querySelector('#badgenum')
    const sportData = document.querySelector('#sportData')
    const badge = document.querySelector('#badge')
    const sportCourse = document.querySelector('#sportCourse')
    const sportRun = document.querySelector('#sportRun')
    const userId = localStorage.getItem('userID')
    console.log("userId: " + userId);

    (function () {
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

        //初始化数据
        if (userId) {
            getData()
        }
    }());

    //自启动函数

    sportData.addEventListener('click', function () {
        console.log("addEventListener:")
        if (userId != null) {
            sportData.href = 'sport-data.html'
        } else {
            weui.topTips('请填写正确的字段');
        }
    })
    sportCourse.addEventListener('click', function () {
        console.log("addEventListener:")
        if (userId != null) {
            sportData.href = 'sport-course.html'
        } else {
            weui.topTips('先登录吧')
        }
    })
    sportRun.addEventListener('click', function () {
        console.log("addEventListener:")
        if (userId != null) {
            sportData.href = 'sport-run.html'
        } else {
            weui.topTips('先登录吧')
        }
    })
    badge.addEventListener('click', function () {
        console.log("addEventListener:")
        if (userId != null) {
            sportData.href = 'badge.html'
        } else {
            weui.topTips('先登录吧')
        }
    })

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