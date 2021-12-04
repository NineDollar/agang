
// 引用公共css
require('../../assets/css/normalize.css')
require('../../assets/css/reset.css')
require('../../assets/css/property.css')
require('../../assets/css/basic.less')


//引入直接的css
require('../../assets/fonts/iconfont.css')
require('./sport-course.less')

const axios = require('axios')

//引入渲染nav 
const dom = require('../../utils/dom')


document.addEventListener('DOMContentLoaded', function () {

    dom.renderNav('sport-run')

    const newCourse = document.querySelector('#newCourse')
    const Course = document.querySelector('#Course')

    let userId = localStorage.getItem('userID')


    function getcourseData() {
        axios.get(`http://139.9.177.51:8099/sports/courseList?id=${userId}`).then(function (res) {
            if (res.data.status === 0) {
                console.log(res.data.data);
                render(res.data.data)
            }
        })

    }
    getcourseData()

    function render(data) {
        newCourse.innerHTML = `<a href="./course-introduce.html?courseId=${data[0].courseId}&imgurl=${data[0].imgurl}" class="newCourse  ml5 w90">
             <div class="content">
                 <div class="photo">
                     <img src=http://139.9.177.51:8099${data[0].imgurl}  alt="">
                 </div>
                 <div class="courseName pl10">${data[0].name}</div>
                 <div class="letter pl10">${data[0].desc}</div>
             </div>
         </a>`
        let CourseText = ''

        for (let i = 1; i < data.length; i++) {
            CourseText += `<a href="./course-introduce.html?courseId=${data[i].courseId}&imgurl=${data[i].imgurl}" class="Course  ml5 w90 mb10">
            <div class="content">
                <div class="photo">
                 <img src=http://139.9.177.51:8099${data[i].imgurl}  alt="">
                </div>
                <div class="courseName pl10">${data[i].name}</div>
                <div class="letter pl10">${data[i].desc}</div>
            </div>
        </a>`
        }

        Course.innerHTML = CourseText

    }

})