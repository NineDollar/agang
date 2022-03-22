// 引用公共css
require('../../assets/css/normalize.css')
require('../../assets/css/reset.css')
require('../../assets/css/property.css')
require('../../assets/css/basic.less')
// 引入自己的css
require('./badge.less')
require('../../assets/fonts/iconfont.css')
const {default: axios} = require("axios");
/* 监听dom加载完毕 */
document.addEventListener('DOMContentLoaded', function () {

    const contentImg = document.querySelector('#contentImg')
    const mask = document.querySelector('#mask')
    const maskBackPre = document.querySelector('#maskBackPre')
    const backPre = document.querySelector('#backPre')

    let html = '';

    function sportBadge() {
        axios.get('http://www.songyun.work:8080/agangApi/sport/badge').then(function (res) {
            console.log("sportBadge: ")
            console.log(res)
            if (res.data.status === 0) {
                console.log("res.data.data: ")
                console.log(res.data.data)
                res.data.data.forEach(function (v) {
                    html += `<div class="badge-item"><img data-id=${v.id} src=http://www.songyun.work:8080/agangApi/res/${v.imgurl} alt="">
                        <p>${v.name}</p>
                    </div>`
                })
                contentImg.innerHTML = html
            } else {
                console.log("error")
            }
        }).catch(error => {
            console.log(error)
        })
    }

    sportBadge()

    contentImg.addEventListener('click', function (e) {
        if (e.target.dataset.id) {
            let html = mockData.find(function (v) {
                return v.id == e.target.dataset.id
            })
            mask.innerHTML = `<div class="mask-head">
            <i class="iconfont icon-left mask-back-pre ml5" id="maskBackPre"></i>
        </div>
        <div class="mask-content">
            <img src=${html.imgurl} alt="">
            <div class="title">${html.name}</div>
            <div class="desc">${html.desc}</div>
            <div class="date">${html.date}获取</div>
        </div>`
            mask.style.display = 'block'
        }
    })

    mask.addEventListener('click', function (e) {
        if (e.target.id === 'maskBackPre') {
            mask.style.display = 'none'
        }
    })

    backPre.addEventListener('click', function () {
        history.back()
    })
})