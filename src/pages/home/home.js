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




})