require('../../assets/css/normalize.css')
require('../../assets/css/reset.css')
require('../../assets/css/property.css')
require('../../assets/css/basic.less')
require('./ad.less')
document.addEventListener('DOMContentLoaded', function () {
    const countDown = document.querySelector('#countDown')
    const jumper = document.querySelector('#jumper')
    let num = 3
    let timer = setInterval(function () {
        num--
        if (num < 0) {
            location.href = 'home.html'
            return
        }
        countDown.textContent = num + 's'

    }, 1000)

    jumper.addEventListener('click', function () {
        location.href = 'home.html'
    })
})