

// 引用公共css
require('../../assets/css/normalize.css')
require('../../assets/css/reset.css')
require('../../assets/css/property.css')
require('../../assets/css/basic.less')


//引入直接的css
require('../../assets/fonts/iconfont.css')
require('./resume.less')



const axios = require('axios')


document.addEventListener('DOMContentLoaded', function () {


    const backPre = document.querySelector('#backPre')
    const sumbitData = document.querySelector('#sumbitData')
    const nickname = document.querySelector('#nickname')
    const sign = document.querySelector('#sign')


    const userId = localStorage.getItem('userID')


    function getData() {
        axios.post(`http://139.9.177.51:8099/users/userEdit`, {
            params: {
                nickname: nickname.value,
                userId: userId,
                sign: sign.value,
                gender: '男',
                birthday: '2000-1-1',
                imgurl: '',
                address: ['北京市', '朝阳区']
            }
        }).then(function (res) {
            /* if (res.data.status === 0) {
                render(res)
            } */
            console.log(res);
            console.log(res.config.data);
        })
    }
    getData()
    /*  function render(data = defaulData) {
         nickname.innerHTML = data.user.nickname
         if (data.user.sign) {
             sign.innerHTML = data.user.sign
         } else {
             sign.innerHTML = '给时间一点时间'
         }
         coursetims.innerHTML = data.sports.coursetims
         calorie.innerHTML = data.sports.calorie
         if (localStorage.getItem('userID')) {
             userOut.innerHTML = '退出登录'
         } else {
             userOut.innerHTML = '登录'
         }
     }
  */
    backPre.addEventListener('click', function () {
        location.href = 'my.html'
    })

    sumbitData.addEventListener('click', function () {

        getData()
    })


})