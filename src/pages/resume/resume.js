

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
    const signVal = document.querySelector('#signVal')
    const signLength = document.querySelector('#signLength')
    const birthdayVal = document.querySelector('#birthdayVal')
    const cityVal = document.querySelector('#cityVal')
    const sexVal = document.querySelector('#sexVal')
    const filePhoto = document.querySelector('#filePhoto')
    const imgurl = document.querySelector('#imgurl')
    const setBirthday = document.querySelector('#setBirthday')
    const setCity = document.querySelector('#setCity')



    const userId = localStorage.getItem('userID')

    function render(data) {
        imgurl.style.backgroundImage = data.imgurl ? `url(${data.imgurl})` : 0
        nickname.placeholder = data.nickname
        signVal.placeholder = data.sign ? data.sign : '给时间一点时间'
        signLength.innerHTML = data.gender ? data.gender.signLength : 0
        sexVal.innerHTML = data.gender ? data.gender : '未设置'
        cityVal.innerHTML = data.address ? data.address.replace(',', ' ') : '未设置'
        birthdayVal.innerHTML = data.birthday ? data.birthday : '未设置'



    }

    let imgUrl = ''

    function getData() {
        axios.get(`http://139.9.177.51:8099/users/accountinfo?userId=${userId}`).then(function (res) {
            if (res.data.status === 0) {
                /*  render(res) */
                render(res.data.data)
            }
        })
    }
    getData()

    function sendData() {
        axios.post('http://139.9.177.51:8099/users/userEdit', {
            userId: userId,
            nickname: nickname.value,
            sign: signVal.value,
            imgurl: imgUrl,
            address: ["四川省", "成都市"]
        }).then(function (res) {
            if (res.data.status == 1) {
                /* sendflag = true */
            }
        })
        return true

    }

    imgurl.addEventListener('click', function () {
        filePhoto.click()

    })
    filePhoto.addEventListener('change', function () {
        let fd = new FormData()//实例化一个FormData对象 ( 就是一个纸箱  文件需要放入这个箱子 才能通过ajax发送给后端 )
        fd.append('imgurl', this.files[0])
        axios.post('http://139.9.177.51:8099/users/upload', fd).then(function (res) {
            if (res.data.status === 0) {
                imgurl.style.backgroundImage = `url(http://139.9.177.51:8099/${res.data.data})`
                imgUrl = `http://139.9.177.51:8099/${res.data.data}`
            }
        })


    })
    signVal.addEventListener('keyup', function () {
        signLength.innerHTML = this.value.length
    })
    backPre.addEventListener('click', function () {
        location.href = 'my.html'
    })

    sumbitData.addEventListener('click', function () {
        if (sendData()) {
            location.href = 'my.html'
        }
    })
    setBirthday.addEventListener('click', function () {
        weui.datePicker()
    })
    setCity.addEventListener('click', function () {
    })

})