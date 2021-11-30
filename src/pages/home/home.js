// 引用公共css
require('../../assets/css/normalize.css')
require('../../assets/css/reset.css')
require('../../assets/css/property.css')
require('../../assets/css/basic.css')


//引入直接的css
require('../../assets/fonts/iconfont.css')
require('./home.less')

// 引入swiper
require('../../lib/swiper/swiper-bundle.min.css')
const Swiper = require('../../lib/swiper/swiper-bundle.min.js')

const axios = require('axios')



document.addEventListener('DOMContentLoaded', function () {

    const ranknum = document.querySelector('#ranknum')
    const punchCardDay = document.querySelector('#punchCardDay')
    const playcar = document.querySelector('#playcar')
    const badgenum = document.querySelector('#badgenum')


    const userId = localStorage.getItem('userID')
    /* 初始化swiper */
    const swiper = new Swiper(document.querySelector('.mySwiper'), {
        loop: true, // 循环
        autoplay: {  // 自动播放
            disableOnInteraction: false   // 用户操作了swiper之后 是否禁用自动播放 false 不禁用.
        },
        pagination: {
            el: ".swiper-pagination",
        },
    })

    function render(data) {
        console.log(data);
        ranknum.innerHTML = data.rank
        punchCardDay.innerHTML = data.punchIn
        badgenum.innerHTML = data.insigniaNum
        if (data.isPunch == 'false') {
            playcar.innerHTML = '今日打卡'
        } else {
            playcar.innerHTML = '已打卡'
            flag = false
        }
    }

    function getData() {
        axios.get(`http://139.9.177.51:8099/headPageInfo?userId=${userId}`).then(function (res) {
            if (res.data.status == 0) {
                render(res.data.data)
            }
        })
    }
    getData()

    let flag = true
    playcar.addEventListener('click', function () {
        if (flag) {
            console.log(1);
            axios.get(`http://139.9.177.51:8099/clockIn?userId=${userId}`).then(function (res) {
                if (res.data.status == 0) {
                    getData()
                }
            })
        }
    })

})