// 引用公共css
require('../../assets/css/normalize.css')
require('../../assets/css/reset.css')
require('../../assets/css/property.css')
require('../../assets/css/basic.less')
// 引入自己的css
require('./badge.less')
require('../../assets/fonts/iconfont.css')



// 后端没有给我们数据  我们就自己模拟数据  使用这份数据渲染 和 完成功能 ( 将来后端给数据了,只要替换这份数据 别的代码都不用动 )
const mockData = [
    { id: 1, imgurl: require('../../assets/imgs/mybadge01.jpg'), name: '连续训练天数', desc: '连续训练3天所得', date: '2020.11.11' },
    { id: 2, imgurl: require('../../assets/imgs/mybadge02.jpg'), name: '累计训练天数', desc: '连续训练3天所得', date: '2020.11.11' },
    { id: 3, imgurl: require('../../assets/imgs/mybadge03.jpg'), name: '训练次数', desc: '连续训练3天所得', date: '2020.11.11' },
    { id: 4, imgurl: require('../../assets/imgs/mybadge04.jpg'), name: '跑步次数', desc: '连续训练3天所得', date: '2020.11.11' },
    { id: 5, imgurl: require('../../assets/imgs/mybadge05.jpg'), name: '骑行次数', desc: '连续训练3天所得', date: '2020.11.11' },
    { id: 6, imgurl: require('../../assets/imgs/mybadge06.jpg'), name: '明星圈友', desc: '连续训练3天所得', date: '2020.11.11' },
    { id: 7, imgurl: require('../../assets/imgs/mybadge07.jpg'), name: '评论达人', desc: '连续训练3天所得', date: '2020.11.11' },
    { id: 8, imgurl: require('../../assets/imgs/mybadge08.jpg'), name: '运动铁粉', desc: '连续训练3天所得', date: '2020.11.11' },
    { id: 9, imgurl: require('../../assets/imgs/mybadge09.jpg'), name: '', desc: '', date: '' },
];


/* 监听dom加载完毕 */
document.addEventListener('DOMContentLoaded', function () {


    const contentImg = document.querySelector('#contentImg')
    const mask = document.querySelector('#mask')
    const maskBackPre = document.querySelector('#maskBackPre')
    const backPre = document.querySelector('#backPre')




    let html = ''
    mockData.forEach(function (v) {
        html += `<div class="badge-item"><img data-id=${v.id} src=${v.imgurl} alt="">
            <p>${v.name}</p>
        </div>`
    })
    contentImg.innerHTML = html

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
        if (e.target.id == 'maskBackPre') {
            mask.style.display = 'none'
        }
    })

    backPre.addEventListener('click', function () {
        history.back()
    })


})