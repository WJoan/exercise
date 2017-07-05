/**
 * 构建图表函数
 * @param {string} id     DOM节点的id
 * @param {Object} option 图表参数
 */ 
function Chart(id, option){
    this.option = option;
    this.myChart = echarts.init(document.getElementById(id));
    this.myChart.setOption(option);
}

const gaugeOption = {
    backgroundColor: '#000',
    tooltip : {
        formatter: "{a} <br/>{c} {b}"
    },
    series : [
   		{
            name:'时',
            type:'gauge',
            min:0,
            max:12,
            center : ['50%', '50%'],
            startAngle: 90,
            endAngle: -269.9999,
            splitNumber:12,
            radius: '60%',
            animation: 0,
            itemStyle: { //仪表盘指针样式
	            normal: {
	                color: '#109A39',
	                shadowColor: 'rgba(0, 0, 0, 0.5)',
	                shadowBlur: 10,
	                shadowOffsetX: 2,
	                shadowOffsetY: 2
	            }
	        },
            axisLine: {            // 坐标轴线
            	show: 0,
            	lineStyle: {
	                color: [
	                    [1, '#337ab7']
	                ],
	                width: 10,
	                shadowColor: 'rgba(0, 0, 0, 0.8)',
	                shadowBlur: 12,
	                shadowOffsetX: 3,
	                shadowOffsetY: 3
	            }
            },
            axisLabel: {            // 坐标轴小标记
                show: 0,
            },
            axisTick: {            // 坐标轴小标记
                length :5,        // 属性length控制线长
                splitNumber: 5,
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: 'auto',
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 10
                }
            },
            splitLine: {           // 分隔线
               show: 0,
                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                    width:2,
                }
            },
            pointer: {           // 仪表盘指针
                shadowColor : '#fff', //默认透明
                shadowBlur: 5,
                width: 9,
                length: '60%'
            },
            title : {
                show: 0
            },
            detail : {
               show: 0,
            },
            data:[{value: '', name: ''}]
        },
    	{
            name:'分',
            type:'gauge',
            min:0,
            max:60,
            center : ['50%', '50%'],
            startAngle: 90,
            endAngle: -269.9999,
            splitNumber:12,
            radius: '60%',
            animation: 0,
            itemStyle: { //仪表盘指针样式
	            normal: {
	                color: '#ca8622',
	                shadowColor: 'rgba(0, 0, 0, 0.5)',
	                shadowBlur: 10,
	                shadowOffsetX: 2,
	                shadowOffsetY: 2
	            }
	        },
            axisLine: {            // 坐标轴线
            	show: 0,
                lineStyle: {       // 属性lineStyle控制线条样式
                	width: 0
                }
            },
            axisLabel: {            // 坐标轴小标记
                show: 0,
            },
            axisTick: {            // 坐标轴小标记
                length :5,        // 属性length控制线长
                splitNumber: 5,
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: 'auto',
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 10
                }
            },
            splitLine: {           // 分隔线
               show: 0,
                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                    width:2,
                }
            },
            pointer: {           // 仪表盘指针
                shadowColor : '#fff', //默认透明
                shadowBlur: 5,
                width: 7,
                length: '75%'
            },
            title : {
                show: 0
            },
            detail : {
               show: 0,
            },
            data:[{value: '', name: ''}]
        },
        {
            name:'秒',
            type:'gauge',
            min:0,
            max:60,
            center : ['50%', '50%'],
            startAngle: 90,
            endAngle: -269.9999,
            splitNumber:12,
            radius: '60%',
            animation: 0,
            axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: [[1, '#1e90ff']],
                    width: 3,
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 10
                }
            },
            axisLabel: {            // 坐标轴小标记
                textStyle: {       // 属性lineStyle控制线条样式
                    fontWeight: 'bolder',
                    color: '#fff',
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 10
                },
	            formatter: function(t) {
	                switch (t + '') {
	                    case '0':
	                        return '';
	                    case '5':
	                        return '1';
	                    case '10':
	                        return '2';
	                    case '15':
	                        return '3';
	                    case '20':
	                        return '4';
	                    case '25':
	                        return '5';
	                    case '30':
	                        return '6';
	                    case '35':
	                        return '7';
	                    case '40':
	                        return '8';
	                    case '45':
	                        return '9';
	                    case '50':
	                        return '10';
	                    case '55':
	                        return '11';
	                    case '60':
	                        return '12';
	                }
	            }
            },
            axisTick: {            // 坐标轴小标记
                length :12,        // 属性length控制线长
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: 'auto',
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 10
                }
            },
            splitLine: {           // 分隔线
                length :15,         // 属性length控制线长
                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                    width:3,
                    color: '#fff',
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 10
                }
            },
            pointer: {           // 仪表盘指针
                shadowColor : '#fff', //默认透明
                shadowBlur: 5,
                width: 5,
                length: '85%'
            },
            title : {
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    fontWeight: 'bolder',
                    fontSize: 20,
                    fontStyle: 'italic',
                    color: '#fff',
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 10
                }
            },
            detail : {		//数据显示
                width: 120,
                height: 40,
                backgroundColor: 'rgba(30,144,255,0.8)',
                borderWidth: 0,
                borderColor: '#fff',
                shadowColor : '#fff', //默认透明
                shadowBlur: 5,
                offsetCenter: [0, '50%'],       // x, y，单位px
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    fontWeight: 'bolder',
                    fontSize : 20,
                    color: '#fff'
                },
                formatter: function (value) {
                	let d = new Date();
                	let m = d.getMinutes();
                	let s = d.getSeconds();
                	if(m<10) m = '0'+m;
                	if(s<10) s = '0'+s;
 					return d.getHours() + ':' + m + ':' + s;
				}
            },
            data:[{value: '', name: 'CLOCK'}]
        },
        
    ]
};


const chart = new Chart('clock', gaugeOption);

clearInterval(timeTicket);
var timeTicket = setInterval(function() {
    datetime = new Date();
    date = datetime.getDate();
    h = datetime.getHours();
    m = datetime.getMinutes();
    s = datetime.getSeconds();
    ms = datetime.getMilliseconds();
    minutes = m + s / 60;
    hours_24 = h + m / 60;
    if (hours_24 > 12)
        hours_12 = hours_24 - 12;
    else
        hours_12 = hours_24;
    seconds = s + ms / 1000;

    //option.series[0].data[0].value = (hours_24).toFixed(2);
    gaugeOption.series[0].data[0].value = (hours_12).toFixed(2);
    gaugeOption.series[1].data[0].value = (minutes / 5).toFixed(2);
    gaugeOption.series[2].data[0].value = (seconds).toFixed(2);
    chart.myChart.setOption(gaugeOption, true);
}, 1000);
