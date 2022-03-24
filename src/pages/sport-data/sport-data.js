// 引用公共css
require('../../assets/css/normalize.css')
require('../../assets/css/reset.css')
require('../../assets/css/property.css')
require('../../assets/css/basic.less')
// 引入自己的css
require('./sport-data.less')
require('../../assets/fonts/iconfont.css')

const axios = require('axios')

document.addEventListener('DOMContentLoaded', function () {

    const preBtn = document.querySelector('#preBtn')
    const coursetims = document.querySelector('#coursetims')
    const calorie = document.querySelector('#calorie')
    const photo = document.querySelector('#photo')

    const userId = localStorage.getItem('userID');

    (function getData() {
        axios.get(`http://www.songyun.work:8080/agangApi/users/mysportsBadge?userId=${userId}`).then(function (res) {
            console.log("getData: ")
            console.log(res.data.data)
            if (res.data.status === 0) {
                render(res.data.data)
            }
        })
    }());

    function render(data) {
        photo.src = data.user.imgurl ? `http://www.songyun.work:8080/agangApi/images/head/${data.user.imgurl}` : 0
        coursetims.innerHTML = data.sports.coursetims ? data.sports.coursetims : 0
        calorie.innerHTML = data.sports.calorie ? data.sports.calorie : 0
    }

    preBtn.addEventListener('click', function () {
        history.back()
    });

    // 画柱状图
    (function drawBar() {
        // 1. 基于准备好的dom，初始化echarts实例
        const myChart = echarts.init(document.getElementById('bar'));

        // 2. 写配置
        const option = {
            // 标题
            title: {
                text: '近7天运动时长',
                textStyle: {
                    fontSize: 16,
                    color: "#000"
                },
                left: 10,
                top: 10
            },
            //  提示框组件
            tooltip: {
                // trigger: 'axis'
            },

            // 图例组件
            // legend: {
            //     data: ['销量']
            // },

            // x轴
            xAxis: {
                // x轴的数据
                data: ['12-06', '12-07', '12-08', '12-09', '12-10', '12-11']
            },

            // y轴 当y轴没有data数据 从 series中的data获取
            yAxis: {},

            // 核心系列数据
            series: [
                {
                    showBackground: true,
                    backgroundStyle: {
                        color: '#E3E3E3'
                    },
                    itemStyle: {
                        color: '#4294FF',
                    },
                    name: '时长',
                    type: 'bar',
                    data: [10, 20, 20, 10, 18, 20]  // y轴的数据
                }
            ]
        };

        // 3. 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }());

    // 画饼图
    (function drawPie() {
        // 1. 基于准备好的dom，初始化echarts实例
        const myChart = echarts.init(document.getElementById('pie'));

        // 2. 写配置
        const option = {
            // 标题
            title: {
                text: '运动分类',
                link: 'https://www.itsource.cn',
                textStyle: {
                    fontSize: 16,
                    color: "#000"
                },
                left: 10,
                top: 10
            },

            // 提示框
            tooltip: {
                trigger: 'item',

            },

            // 图例
            legend: {
                orient: 'vertical',
                left: 10,
                top: 'middle',
                itemWidth: 14,
                textStyle: {
                    fontSize: 14
                }
            },

            // 核心系列数据
            series: [
                {
                    name: '分类',
                    type: 'pie',
                    radius: '70%',
                    label: {
                        position: 'inside',
                        formatter: '{d}%',
                        color: 'white',
                        fontSize: 15
                    },
                    data: [
                        {value: 1048, name: '跑步', itemStyle: {color: '#736171'}},
                        {value: 735, name: '骑行', itemStyle: {color: '#EE5C43'}},
                        {value: 580, name: '训练', itemStyle: {color: '#58BB92'}},
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };

        // 3. 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }());

    (function drawLine() {
        const myChart = echarts.init(document.getElementById('line'));
        const option = {
            // 标题
            title: {
                text: '近7日训练次数',
                textStyle: {
                    fontSize: 16,
                    color: "#000"
                },
                left: 10,
                top: 10
            },
            xAxis: {
                type: 'category',
                data: ['11-5', '11-6', '11-7', '11-8', '11-9', '11-10', '11-11']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [2, 4, 8, 6, 10, 6, 8],
                    type: 'line'
                }
            ]
        }
        // 3. 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }());


    (function drawPopulation() {
        const myChart = echarts.init(document.getElementById('Population'));
        option = {
            title: {
                text: '近7日运动分类',
                top: 10,
                left: 10
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                top: 10,
                right: 10,
                itemWidth: 16,
                textStyle: {
                    fontSize: 12
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
            },
            yAxis: {
                type: 'category',
                data: ['11-5', '11-6', '11-7', '11-8', '11-9', '11-10']
            },
            series: [
                {
                    name: '跑步',
                    type: 'bar',
                    data: [80, 90, 40, 60, 50, 70, 30]
                },
                {
                    name: '骑行',
                    type: 'bar',
                    data: [30, 40, 80, 60, 20, 70, 90],
                },
                {
                    name: '训练',
                    type: 'bar',
                    data: [40, 30, 60, 80, 30, 90, 80],
                },
            ]
        };
        // 3. 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }());
})

