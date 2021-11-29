require('./ad.less')


const countDown = document.querySelector('#countDown')
const jump = document.querySelector('#jump')


let num = 4
let timer = setInterval(function () {
    num--
    countDown.textContent = num + 's'
    if (num <= 0) {
        location.href = 'login.html'
    }
}, 1000)

jump.addEventListener('click', function () {
    location.href = 'login.html'
})