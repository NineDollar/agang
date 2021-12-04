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
const dom = require('../../utils/dom')


document.addEventListener('DOMContentLoaded', function () {



    const goVideo = document.querySelector('#goVideo')

    function getFragments() {
        let courseId = location.search.split('=')[1]
        axios.get(`http://139.9.177.51:8099/sports/courseDetail?id=${courseId}`).then(function (res) {
            console.log(res);
            if (res.data.status === 0) {
                localStorage.setItem('fragments', JSON.stringify(res.data.data.fragments))

            }
        })
    }
    getFragments()

    goVideo.addEventListener('click', function () {
        location.href = './video.html'
    })


})