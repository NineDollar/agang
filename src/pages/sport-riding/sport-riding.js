
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

    /* const tabItems = document.querySelectorAll('.tab-items')

    let index = 0
    tabItems.forEach(function (v, i) {
        v.addEventListener('click', function () {
            tabItems[index].classList.remove('active')
            tabItems[i].classList.add('active')
            index = i
        })
    }) */
})