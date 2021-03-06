// 引用公共css
require('../../assets/css/normalize.css')
require('../../assets/css/reset.css')
require('../../assets/css/property.css')
require('../../assets/css/basic.less')
//引入直接的css
require('../../assets/fonts/iconfont.css')
require('./course-introduce.less')
const axios = require('axios')
//引入渲染nav
document.addEventListener('DOMContentLoaded', function () {
    const goVideo = document.querySelector('#goVideo')
    const videoImg = document.querySelector('#videoImg')
    const calorie = document.querySelector('#calorie')
    const time = document.querySelector('#time')
    const name = document.querySelector('#name')
    const desc = document.querySelector('#desc')
    const frequency = document.querySelector('#frequency')
    const instrument = document.querySelector('#instrument')

    goVideo.addEventListener('click', function () {
        console.log("click")
        location.href = `./video.html`
    })

    function render(data) {
        time.innerHTML = data[0].time
        name.innerHTML = data[0].name
        calorie.innerHTML = data[0].calorie
        videoImg.src = 'http://www.songyun.work:8080/agangApi/res/' + data[0].imgurl
        instrument.innerHTML = data[0].instrument
        frequency.innerHTML = data[0].frequency
        desc.innerHTML = data[0].desc
    }

    function getFragments() {
        let courseId = location.search.split('=')[1]
        axios.get(`http://www.songyun.work:8080/agangApi/sports/courseDetail?id=${courseId}`).then(function (res) {
            if (res.data.status === 0) {
                localStorage.setItem('fragments', JSON.stringify(res.data.data.fragments))
            } else {
                console.log("getFragments: error")
            }
        })
        axios.get(`http://www.songyun.work:8080/agangApi/sports/allcourse`).then(function (res) {
            console.log("allcourse")
            console.log(res)
            if (res.data.status === 0) {
                let r = res.data.data.filter(function (v) {
                    return v.courseId == courseId
                })
                render(r)
            }
        }).error(error => {
            console.log("error")
            console.log(error)
        });
    }

    getFragments()

})