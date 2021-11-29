require('./reg.less')


// 引入验证码插件
const CaptchaMini = require("captcha-mini") // 必须要下载 captcha-mini 才能引入

/* 监听dom加载完毕 */
document.addEventListener('DOMContentLoaded', function () {

    let code

    // 实例化 引入的插件
    let captcha = new CaptchaMini();
    captcha.draw(document.querySelector('#captcha1'), function (r) {
        // r就是画出来的结果
        code = r.toUpperCase();
    });
    console.log(code);
})