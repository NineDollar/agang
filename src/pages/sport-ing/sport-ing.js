// 引用公共css
require('../../assets/css/normalize.css')
require('../../assets/css/reset.css')
require('../../assets/css/property.css')
require('../../assets/css/basic.less')


//引入直接的css
require('../../assets/fonts/iconfont.css')
require('./sport-ing.less')

const axios = require('axios')

//引入渲染nav 
const dom = require('../../utils/dom')

document.addEventListener('DOMContentLoaded', function () {



    const stopBtn = document.querySelector('#stopBtn')
    const stopBtnPanel = document.querySelector('#stopBtnPanel')
    const startBtn = document.querySelector('#startBtn')


    stopBtn.addEventListener('click', function () {
        stopBtn.style.display = 'none'
        stopBtnPanel.style.display = 'flex'

    })
    startBtn.addEventListener('click', function () {
        stopBtn.style.display = 'block'
        stopBtnPanel.style.display = 'none'
    })

})