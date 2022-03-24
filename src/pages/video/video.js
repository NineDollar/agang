// 引用公共css
require('../../assets/css/normalize.css')
require('../../assets/css/reset.css')
require('../../assets/css/property.css')
require('../../assets/css/basic.less')
//引入直接的css
require('../../assets/fonts/iconfont.css')
require('./video.less')
//引入渲染nav
const dom = require('../../utils/dom')
document.addEventListener('DOMContentLoaded', function () {
    const video = document.querySelector('#video')
    const videoSum = document.querySelector('#videoSum')
    const videoNum = document.querySelector('#videoNum')
    const videoName = document.querySelector('#videoName')
    const preBtn = document.querySelector('#preBtn')
    const stopBtn = document.querySelector('#stopBtn')
    const nextBtn = document.querySelector('#nextBtn')
    const maskLayer = document.querySelector('#maskLayer')
    const progreesBar = document.querySelector('#progreesBar')
    const videoImg = document.querySelector('#videoImg')
    const start = document.querySelector('#start')
    const over = document.querySelector('#over')
    const maskLayerVideoName = document.querySelector('#maskLayerVideoName')
    let fragments = JSON.parse(localStorage.getItem('fragments'))
    let fLen = fragments.length
    let index = 0

    function getWidth() {
        console.log(1);
        //进度条的宽度:   当前播放时间/总时间 = 当前宽度/总宽度
        let w = video.currentTime / video.duration * video.clientWidth
        progreesBar.style.width = w + 'px'
    }

    (function play() {
        index === 0 ? preBtn.style.opacity = 0 : preBtn.style.opacity = 1
        index === fLen - 1 ? nextBtn.style.opacity = 0 : nextBtn.style.opacity = 1
        video.src = 'http://www.songyun.work:8080/agangApi/res/' + fragments[index].videoUrl
        videoName.innerHTML = fragments[index].title
        videoNum.innerHTML = index + 1
        videoSum.innerHTML = fLen
        videoImg.src = 'http://www.songyun.work:8080/agangApi/res/' + fragments[index].imgUrl
        maskLayerVideoName.innerHTML = fragments[index].title
        setTimeout(function () {
            video.play()
        }, 100)
    }())

    video.addEventListener('play', function () {//监听视频播放事件 每30毫毛去更新进度条
        timer = setInterval(getWidth, 30)
    })
    video.addEventListener('pause', function () {//监听视频暂停事件  停止进度条刷新
        clearInterval(timer)
    })
    video.addEventListener('ended', function () {
        if (index < fLen - 1) {
            index++
            play()
        }
    })
    preBtn.addEventListener('click', function () {
        if (index > 0) {
            index--
            play()
            clearInterval(timer)
        }
    })
    stopBtn.addEventListener('click', function () {
        video.pause()
        maskLayer.style.display = 'flex'
    })
    nextBtn.addEventListener('click', function () {
        if (index < fLen - 1) {
            index++
            play()
            clearInterval(timer)
        }
    })
    start.addEventListener('click', function () {
        video.play()
        maskLayer.style.display = 'none'
    })
    over.addEventListener('click', function () {
        location.href = 'sport-course.html'
    })
})