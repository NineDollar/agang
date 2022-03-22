
// 引用公共css
require('../../assets/css/normalize.css')
require('../../assets/css/reset.css')
require('../../assets/css/property.css')
require('../../assets/css/basic.less')


//引入直接的css
require('../../assets/fonts/iconfont.css')
require('./sport-riding.less')
//引入渲染nav 
const dom = require('../../utils/dom')


document.addEventListener('DOMContentLoaded', function () {

    dom.renderNav('sport-run')
    var map = new AMap.Map('container', {
        zoom: 17,//级别
        center: [116.397428, 39.90923],//中心点坐标
        viewMode: '3D'//使用3D视图
    });
})