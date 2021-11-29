require('./ad.less')


const countDown = document.querySelector('#countDown')
const jumper = document.querySelector('#jumper')


let num = 4
let timer = setInterval(function () {
    num--
    if (num < 0) {
        location.href = 'login.html'
        return
    }
    countDown.textContent = num + 's'

}, 1000)

jumper.addEventListener('click', function () {
    location.href = 'login.html'
})