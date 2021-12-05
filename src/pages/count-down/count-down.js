// 引用公共css
require('../../assets/css/normalize.css')
require('../../assets/css/reset.css')
require('../../assets/css/property.css')
require('../../assets/css/basic.less')


//引入直接的css
require('../../assets/fonts/iconfont.css')
require('./count-down.less')

const axios = require('axios')

//引入渲染nav 
const dom = require('../../utils/dom')

document.addEventListener('DOMContentLoaded', function () {
    const time = document.querySelector('#time')

    let text = [2, 1, 'GO']
    let num = 0
    setInterval(function () {
        if (num >= 3) {
            location.href = './sport-ing.html'
        } else {
            time.innerHTML = text[num]
            num++
        }

    }, 1000)
})