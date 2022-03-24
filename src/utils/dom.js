function renderNav(page) {

    const nav = document.querySelector('#nav')

    nav.innerHTML = `<a href="./home.html" class="home ${page === 'home' ? 'active' : ''}" > <i class="iconfont icon-home "></i> 首页</a>
        <a href="./sport-run.html" class="sport ${page === 'sport-run' ? 'active' : ''}"> <i class="iconfont icon-sport"></i>运动</a>
<!--        <a class="circle"> <i class="iconfont icon-circle"></i>圈子</a>-->
        <a href="./my.html" class="my ${page === 'my' ? 'active' : ''}"><i class="iconfont icon-my"></i>我的</a>`
}

module.exports = {
    renderNav: renderNav
}