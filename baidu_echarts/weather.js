$(document).ready(function(){

	//获取天气数据
	var url = "https://api.caiyunapp.com/v2/qdtgU5C6Bhvmmxoa/121.6544,25.1552/forecast.jsonp?callback=?"
	$.getJSON( url, displayWeather);

	function displayWeather(data){
		var temperature = [];
		var date = [];
		var precipitation = [];
		var wind_speed = [];
		var wind_direction = [];
		var api_temperature = data.result.hourly.temperature;
		var api_precipitation = data.result.hourly.precipitation;
		var api_wind = data.result.hourly.wind;

		for( var i = 0 ; i < api_temperature.length; i++){
			temperature[i] = api_temperature[i].value;
			date[i] = api_temperature[i].datetime.substr(-5,5);
			precipitation[i] = api_precipitation[i].value;
			wind_speed[i] = api_wind[i].speed;
			wind_direction[i] = api_wind[i].direction;
		}
		// 基于准备好的dom，初始化echarts实例
        var myChart1 = echarts.init(document.getElementById('temp'));
		var myChart2 = echarts.init(document.getElementById('wind'));

        // 指定图表的配置项和数据
        var option1 = {
            title: {
                text: '未来24小时气象信息',
                subtext: data.result.hourly.description,
                x: 'center',
        		align: 'right'
            },
            tooltip: {
            	trigger: 'axis'
            },
            toolbox: {
		        feature: {
		            dataView: {show: true, readOnly: false},
		            magicType: {show: true, type: ['line', 'bar']},
		            restore: {show: true},
		            saveAsImage: {show: true}
		        }
		    },
            legend: {
                data:['气温','降雨强度'],
                x: 'left'
            },
            xAxis:  {
        		type: 'category',
        		boundaryGap: false,
        		data: date
    		},
            yAxis: [
       			 {
		            type: 'value',
		            name: '降雨强度',
		            min: 0,
		            max: 3,
		            interval: 0.6,
		            axisLabel: {
		                formatter: '{value}'
		            }
		        },
		        {
		            type: 'value',
		            name: '温度',
		            min: -10,
		            max: 40,
		            interval: 10,
		            axisLabel: {
		                formatter: '{value} °C'
		            }
		        }
    		],
            series: [
	            {
	                name: '气温',
	                type: 'line',
	                yAxisIndex: 1,
	                data: temperature,
	                markPoint: {
		                data: [
		                    {type: 'max', name: '最大值'},
		                    {type: 'min', name: '最小值'}
		                ]
            	}
	            },
	            {
	            	name: '降雨强度',
	            	type: 'bar',
	            	data: precipitation
	            }
            ]
        };

        var option2 = {
            title: {
                text: '未来24小时风向风速',
                subtext: data.result.hourly.description,
                x: 'center',
        		align: 'right'
            },
            tooltip: {
            	trigger: 'axis',
            	formatter: function (param) {
            		return param[0].name + '<br />'
            				+ '风向：' + param[0].data.symbolRotate + '<br />' 
            				+ '风速：' + param[0].data.value;
            	}
            },
            toolbox: {
		        feature: {
		            dataView: {show: true, readOnly: false},
		            magicType: {show: true, type: ['line', 'bar']},
		            restore: {show: true},
		            saveAsImage: {show: true}
		        }
		    },
            legend: {
                data:['风速'],
                x: 'left'
            },
            xAxis:  {
        		type: 'category',
        		boundaryGap: false,
        		data: date
    		},
            yAxis: [
       			 {
		            type: 'value',
		            name: '风度/公里每小时',
		            axisLabel: {
		                formatter: '{value}'
		            }
		        }
    		],
            series: [
	            {
	                name: '风速',
	                type: 'line',
	                data: api_wind.map(function(item){
	                	return{
	                		value: item.speed,
	                		symbolRotate: item.direction
	                	}
	                }),
	                markPoint: {
		                data: [
		                    {type: 'max', name: '最大值'},
		                    {type: 'min', name: '最小值'}
		                ]
            		},
            		symbol:'arrow',
            		symbolSize: 14
	            },
	            
            ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart1.setOption(option1);
        myChart2.setOption(option2);
	}
})