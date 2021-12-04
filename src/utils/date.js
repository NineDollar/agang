/**
 * 日期相关操作封装
 */
/* 补零 */
function padZero(n) {
    return n < 10 ? '0' + n : n;
}

/* 获取年月日 */
function getYMD(separator = '/', t = Date.now()) {
    const date = new Date(typeof separator == 'number' ? separator : t)

    let y = date.getFullYear()
    let m = date.getMonth() + 1
    let d = date.getDate()

    // return y + s + padZero(m) + s + padZero(d)
    return [y, m, d].map(function (v) {
        return padZero(v)  // [2021, 07, 08]
    }).join(typeof separator == 'number' ? '/' : separator)
}

/* 获取时分秒 */
function getHMS(separator = ':', t = Date.now()) {
    const date = new Date(typeof separator == 'number' ? separator : t)

    let h = date.getHours()
    let m = date.getMinutes()
    let s = date.getSeconds()

    return [h, m, s].map(function (v) {
        return padZero(v)  // [2021, 07, 08]
    }).join(typeof separator == 'number' ? ':' : separator)
}

/* 获取年月日 时分秒 */
function getYMDHMS(s1, s2, t) {
    return getYMD(s1, t) + ' ' + getHMS(s2, t)
}

/* 获取星期 */
function getWeek(t = Date.now()) {
    return '星期' + ['天', '一', '二', '三', '四', '五', '六'][new Date(t).getDay()]
}

/* 秒转时分秒 */
function secondesToHMS(t) {
    /* 
              时  分   秒
       1s     00  00   01
       59s    00  00   59
       78s    00  01   18
       137s   00  02   17
       3500s  00  58   20 
       3601s  01  00   01
       5000s  01  23   20
  
          00:00:00
    
    */
    let h = Math.floor(t / 3600);
    let m = Math.floor(t / 60) % 60;
    let s = t % 60;

    return [h, m, s].map(function (v) {
        return padZero(v)
    }).join(":")
}

// 暴露出去
module.exports = {
    "padZero": padZero,
    "getYMD": getYMD,
    "getHMS": getHMS,
    "getYMDHMS": getYMDHMS,
    "getWeek": getWeek,
    "secondesToHMS": secondesToHMS,
}