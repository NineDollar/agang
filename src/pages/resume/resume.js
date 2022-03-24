// 引用公共css
require('../../assets/css/normalize.css')
require('../../assets/css/reset.css')
require('../../assets/css/property.css')
require('../../assets/css/basic.less')
//引入直接的css
require('../../assets/fonts/iconfont.css')
require('./resume.less')
const axios = require('axios')
const date = require('../../utils/date')
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
    const ProvinceVal = document.querySelector('#ProvinceVal')
    const setProvince = document.querySelector('#setProvince')
    const setSex = document.querySelector('#setSex')
    const userId = localStorage.getItem('userID')
    let imgUrl = '';
    let provinceOptions
    let getCityData

    function render(data) {
        imgurl.style.backgroundImage = data.imgurl ? `url(http://www.songyun.work:8080/agangApi/images/head/${data.imgurl})` : 0
        nickname.value = data.nickname ? data.nickname : "设置一个昵称吧"
        signVal.value = data.sign ? data.sign : '一厘米阳光'
        sexVal.innerHTML = data.gender ? data.gender : '未设置'
        ProvinceVal.innerHTML = data.address ? data.address.split(',')[0] : '未设置'
        cityVal.innerHTML = data.address ? data.address.split(',')[1] : '未设置'
        birthdayVal.innerHTML = data.birthday ? date.getYMD('-', data.birthday) : '未设置'
    }

    (function getData() {
        axios.get(`http://www.songyun.work:8080/agangApi/users/accountinfo?userId=${userId}`).then(function (res) {
            if (res.data.status === 0) {
                /*  render(res) */
                render(res.data.data)
            }
        })
    }());

    // 进入页面就调用
    (function getProvince() {
        axios.get('http://www.songyun.work:8080/agangApi/address/province').then(function (res) {
            if (res.data.status == 0) {
                let r = res.data.data.map(function (v) {
                    return {
                        label: v.name,
                        addressId: v.addressId
                    }
                })
                provinceOptions = r.filter(function (v) {
                    return v.label != '中国'
                })
            }// 赋值渲染
        })
    }())

    /* 显示省份选择器 */
    setProvince.addEventListener('click', function () {
        //判断 如果省份的数组 不是空 才弹出省份选择器
        if (provinceOptions.length) {
            // 弹出选择器
            weui.picker(provinceOptions, {
                // 当点击确认 触发
                onConfirm: function (result) {
                    // 渲染省份
                    ProvinceVal.textContent = result[0].label
                    cityVal.textContent = '未选择'
                    axios.get(`http://www.songyun.work:8080/agangApi/address/city/${result[0].addressId}`).then(function (res) {
                        if (res.data.status === 0) {
                            getCityData = res.data.data.map(function (v) {
                                return {
                                    label: v.name,
                                    addressId: v.addressId
                                }
                            })
                        }
                    })
                },
            });
        }
    })
    //把当前省份获取到  去找到他的id 在发送给后台
    setCity.addEventListener('click', function () {
        let cProvince = ProvinceVal.textContent
        let cProvinceId = provinceOptions.find(function (v) {
            return v.label === cProvince
        }).addressId
        axios.get(`http://www.songyun.work:8080/agangApi/address/city/${cProvinceId}`).then(function (res) {
            if (res.data.status === 0) {
                getCityData = res.data.data.map(function (v) {
                    return {
                        label: v.name,
                        addressId: v.addressId
                    }
                })
                if (getCityData.length) {
                    // 弹出选择器
                    weui.picker(getCityData, {
                        // 当点击确认 触发
                        onConfirm: function (result) {
                            // 渲染城市
                            cityVal.textContent = result[0].label
                        },
                    });
                }
            }
        })
    })
    imgurl.addEventListener('click', function () {
        filePhoto.click()
    })
    filePhoto.addEventListener('change', function () {
        let fd = new FormData()//实例化一个FormData对象 ( 就是一个纸箱  文件需要放入这个箱子 才能通过ajax发送给后端 )
        fd.append('imgurl', this.files[0])
        fd.append('userId', userId)
        axios.all()
        axios.post('http://www.songyun.work:8080/agangApi/users/upload', fd).then(function (res) {
                console.log("addEventListener: ")
                console.log(res)
                if (res.data.status === 0) {
                    imgurl.style.backgroundImage = `url(http://www.songyun.work:8080/agangApi/images/head/${res.data.data})`
                    imgUrl = res.data.data
                    weui.toast("成功")
                    setTimeout(function () {
                        location.reload();
                    },1000)
                } else {
                    console.log("status!=0")
                }
            }
        ).catch(error => {
            weui.topTips(error)
            console.error("erro" + error)
        })
    })
    signVal.addEventListener('input', function () {
        signLength.innerHTML = this.value.length
    })
    backPre.addEventListener('click', function () {
        location.href = 'my.html'
    })

    function sendData(params) {
        axios.post('http://www.songyun.work:8080/agangApi/users/userEdit', params).then(function (res) {
            console.log("sendData: ")
            console.log(res)
            if (res.data.status == 0) {
                weui.toast('修改成功')
                setTimeout(function () {
                    location.href = './my.html'
                }, 1200)
            } else {
                weui.topTips('未修改信息')
            }
        }).catch(error => {
            console.log("error: ")
            console.log(error)
        })
    }

    sumbitData.addEventListener('click', function () {
        let params = {
            userId: userId,
            gender: sexVal.textContent,
            birthday: birthdayVal.textContent,
            nickname: nickname.value,
            sign: signVal.value,
            imgurl: imgUrl,
            address: [ProvinceVal.textContent, cityVal.textContent]
        }
        sendData(params)
    })
    setBirthday.addEventListener('click', function () {
        weui.datePicker({
            start: new Date().getFullYear() - 80,
            end: new Date().getFullYear(),
            onConfirm: function (result) {
                let r = result.map(function (v) {
                    return v.value < 10 ? '0' + v.value : v.value
                }).join('-')
                // 渲染生日
                birthdayVal.textContent = r;
            },
            title: '请选择生日'
        });
    })
    setSex.addEventListener('click', function () {
        // 弹出选择器
        weui.picker([{
            label: '男',
        }, {
            label: '女',
        }], {
            // 当点击确认 触发
            onConfirm: function (result) {
                // 渲染性别
                sexVal.textContent = result[0].label
            },
            title: '请选择性别'
        });
    })
})