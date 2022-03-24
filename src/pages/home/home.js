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
// 引入swiper 滑动插件
require('../../lib/swiper/swiper-bundle.min.css')
const Swiper = require('../../lib/swiper/swiper-bundle.min.js')
const axios = require('axios')
const weui = require('../../lib/tencent/weui.js')



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



//自启动函数
    (function ( __webpack_require__) {
        var _fastclick = __webpack_require__(1);
        var _fastclick2 = _interopRequireDefault(_fastclick);
        var _weui = __webpack_require__(2);
        var _weui2 = _interopRequireDefault(_weui);

        function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

        sportData.addEventListener('click', function () {
            console.log("addEventListener:")
            if (userId != null) {
                console.log("已登陆")
                sportData.href = 'sport-data.html'
            } else {
                console.log("先登录吧")
                weui.topTips('先登录吧')

                weui.confirm('自定义标题的confirm', function () {
                    console.log('yes');
                }, function () {
                    console.log('no');
                }, {
                    title: '自定义标题'
                });
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
    }());

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