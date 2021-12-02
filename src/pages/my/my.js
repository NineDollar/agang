// 引用公共css
require('../../assets/css/normalize.css')
require('../../assets/css/reset.css')
require('../../assets/css/property.css')
require('../../assets/css/basic.less')


//引入直接的css
require('../../assets/fonts/iconfont.css')
require('./my.less')

//引入渲染 nav
const dom = require('../../utils/dom')
const axios = require('axios')


document.addEventListener('DOMContentLoaded', function () {
    dom.renderNav('my')

    const nickname = document.querySelector('#nickname')
    const sign = document.querySelector('#sign')
    const coursetims = document.querySelector('#coursetims')
    const calorie = document.querySelector('#calorie')
    const userOut = document.querySelector('#userOut')
    const headPhoto = document.querySelector('#headPhoto')
    const dynamicStateNum = document.querySelector('#dynamicStateNum')
    const imgurl = document.querySelector('#imgurl')


    const userId = localStorage.getItem('userID')

    function getData() {
        axios.get(`http://139.9.177.51:8099/users/mysportsBadge?userId=${userId}`).then(function (res) {
            if (res.data.status === 0) {
                render(res.data.data)
            }
        })
    }
    getData()

    let defaultData = {
        dynamicCount: 0,
        sports: {
            calorie: 0,
            coursetims: 0,
            insignianum: 0,
            miles: 0,
            punchin: 0,
            ridekm: 0,
            runkm: 0,
            sportsId: 0,
            times: 0,
            updateTime: "2021-12-02T11:39:12.000+00:00",
            userId: 13925,
        },
        user: {
            account: "",
            address: "",
            birthday: null,
            describe: null,
            gender: null,
            imgurl: "http://139.9.177.51:8099//f/user/0xdLXZxG-dog.jpg",
            nickname: "请登录账号",
            password: "JSj3l5qiq1gLYL4SBWUx+Q==",
            sign: "给时间一点时间",
            token: "f8e642e9-a713-4507-b4f2-d2ecde8dae20",
            userId: 13925,
        }

    }



    function render(data) {
        data = data ? data : defaultData
        imgurl.style.backgroundImage = data.user.imgurl ? `url(${data.user.imgurl})` : 0
        dynamicStateNum.innerHTML = data.dynamicCount ? data.dynamicCount : 0
        nickname.innerHTML = data.user.nickname
        sign.innerHTML = data.user.sign ? data.user.sign : '给时间一点时间'
        coursetims.innerHTML = data.sports.coursetims ? data.sports.coursetims : 0
        calorie.innerHTML = data.sports.calorie ? data.sports.calorie : 0
        if (localStorage.getItem('userID')) {
            userOut.innerHTML = '退出登录'
        } else {
            userOut.innerHTML = '登录'
        }
    }


    userOut.addEventListener('click', function () {
        if (localStorage.getItem('userID')) {
            localStorage.removeItem('userID')
            render()
        } else {
            location.href = 'login.html'
        }
    })

    headPhoto.addEventListener('click', function () {
        if (localStorage.getItem('userID')) {
            location.href = 'resume.html'
        } else {
            location.href = 'login.html'
        }
    })



})