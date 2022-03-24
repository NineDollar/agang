// 引用公共css
require('../../assets/css/normalize.css')
require('../../assets/css/reset.css')
require('../../assets/css/property.css')
require('../../assets/css/basic.less')
//引入直接的css
require('../../assets/fonts/iconfont.css')
require('./sport-run.less')
//引入渲染nav
const dom = require('../../utils/dom')
const axios = require('axios')
document.addEventListener('DOMContentLoaded', function () {
    const runKilometer = document.querySelector('#runKilometer');
    const goBtn = document.querySelector('#goBtn');
    const userId = localStorage.getItem('userID');
    const url = 'https://webapi.amap.com/maps?v=2.0&key=9f4e10bc05632fd68c5eed8c7a090b75&callback=onLoad';
    const jsapi = document.createElement('script');

    (function () {
        jsapi.charset = 'utf-8';
        jsapi.src = url;
        document.head.appendChild(jsapi);

        dom.renderNav('sport-run')
        goBtn.addEventListener('click', function () {
            console.log("addEventListener")
            if (userId != null) {
                goBtn.href = 'count-down.html?type=run'
            } else {
                weui.topTips('先登录吧')
            }
        })
    }());

    window.onLoad = function () {
        const map = new AMap.Map("container", {
            center: [104.63331, 28.782577],
            zoom: 13
        });
    };

    (function getData() {
        axios.get(`http://127.0.0.1:8080/agangApi/sports/exerciseData?userId=${userId}`).then(function (res) {
            console.log(res)
            if (res.data.status === 0) {
                runKilometer.innerHTML = res.data.data.run
            }
        })
    }());
})