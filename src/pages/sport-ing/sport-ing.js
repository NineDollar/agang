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
const date = require('../../utils/date')

document.addEventListener('DOMContentLoaded', function () {



    const stopBtn = document.querySelector('#stopBtn')
    const startBtn = document.querySelector('#startBtn')
    const stopBtnPanel = document.querySelector('#stopBtnPanel')
    const overBtnPanel = document.querySelector('#overBtnPanel')
    const timeConsuming = document.querySelector('#timeConsuming')

    stopBtn.addEventListener('click', function () {
        stopBtn.style.display = 'none'
        stopBtnPanel.style.display = 'flex'
        clearInterval(timer)

    })
    startBtn.addEventListener('click', function () {
        stopBtn.style.display = 'block'
        stopBtn.style.animation = 'move 0.3s linear';
        stopBtnPanel.style.display = 'none'
        timer = setInterval(timeFn, 1000)
    })
    overBtnPanel.addEventListener('click', function () {

        console.log('结束');
    })

    let time = 0
    let timer = setInterval(timeFn, 1000)

    function timeFn() {
        time += 1
        timeConsuming.innerHTML = date.secondesToHMS(time)
    }

})