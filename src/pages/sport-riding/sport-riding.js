// 引用公共css
require('../../assets/css/normalize.css')
require('../../assets/css/reset.css')
require('../../assets/css/property.css')
require('../../assets/css/basic.less')

//引入直接的css
require('../../assets/fonts/iconfont.css')
require('./sport-riding.less')
//引入渲染nav ZZ
const dom = require('../../utils/dom')
const axios = require("axios");

document.addEventListener('DOMContentLoaded', function () {
    const ridingKilometer = document.querySelector('#ridingKilometer');
    const goBtn = document.querySelector('#goBtn');
    const userId = localStorage.getItem('userID');
    //渲染导航Z

    (function () {
        dom.renderNav('sport-run')
        goBtn.addEventListener('click',function () {
            console.log("addEventListener")
            if (userId != null) {
                goBtn.href = 'count-down.html?type=riding'
            } else {
                weui.topTips('先登录吧')
            }
        })
    }())

    window.onLoad = function () {
        var map = new AMap.Map('container', {
            center: [104.63331, 28.782577],
            zoom: 13
        })
        console.log()
    }
    var url = 'https://webapi.amap.com/maps?v=2.0&key=9f4e10bc05632fd68c5eed8c7a090b75&callback=onLoad';
    var jsapi = document.createElement('script');
    jsapi.charset = 'utf-8';
    jsapi.src = url;
    document.head.appendChild(jsapi);

    function getData() {
        axios.get(`http://127.0.0.1:8080/agangApi/sports/exerciseData?userId=${userId}`).then(function (res) {
            console.log(res)
            if (res.data.status === 0) {
                console.log("res.data.data.riding: " + res.data.data.riding)
                ridingKilometer.innerHTML = res.data.data.riding
            }
        })
    }

    getData()
})