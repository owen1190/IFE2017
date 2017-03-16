$(function(){
    function splitData(rawData) {
        var categoryData = [];
        var values = [];
        var volumns = [];
        for (var i = 0; i < rawData.length; i++) {
            var dateString = rawData[i].Date;
            var pattern = /(\d{4})(\d{2})(\d{2})/;
            var r1 = dateString.replace(pattern, '$1-$2-$3');
            categoryData.push(r1);
            values.push([rawData[i].Open,rawData[i].Close,rawData[i].Low,rawData[i].High]);
            volumns.push(rawData[i].Volume);
        }
        return {
            categoryData: categoryData,
            values: values,
            volumns: volumns
        };
    };

    function calculateMA(dayCount, data) {
			var result = [];
			for (var i = 0, len = data.values.length; i < len; i++) {
				if (i < dayCount) {
					result.push('-');
					continue;
				}
				var sum = 0;
				for (var j = 0; j < dayCount; j++) {
					sum += parseFloat(data.values[i - j][1]);
					console.log(typeof sum);
				}
				result.push(+(sum / dayCount).toFixed(3));
			}
			return result;
		}

    var myChart = echarts.init(document.getElementById('chart'));
    myChart.showLoading();
    function set(rawData) {

        var data = splitData(rawData);
        myChart.hideLoading();
        myChart.setOption(option = {
            backgroundColor: '#eee',
            animation: false,
            title:{
                text:"A公司09-10年股票数据"
            },

            legend: {
                bottom: 10,
                left: 'center',
                data: ['日K','MA5', 'MA10', 'MA20', 'MA30']
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'line'
                }
            },
            toolbox: {
                feature: {
                    dataZoom: {
                        yAxisIndex: false
                    },
                    brush: {
                        type: ['lineX', 'clear']
                    }
                }
            },
            brush: {
                xAxisIndex: 'all',
                brushLink: 'all',
                outOfBrush: {
                    colorAlpha: 0.1
                }
            },
            grid: [
                {
                    left: '10%',
                    right: '8%',
                    height: '50%'
                },
                {
                    left: '10%',
                    right: '8%',
                    top: '63%',
                    height: '16%'
                }
            ],
            xAxis: [
                {
                    type: 'category',
                    data: data.categoryData,
                    scale: true,
                    boundaryGap : false,
                    axisLine: {onZero: false},
                    splitLine: {show: false},
                    splitNumber: 20,
                    min: '2009-08-21',
                    max: '2010-08-20'
                },
                {
                    type: 'category',
                    gridIndex: 1,
                    data: data.categoryData,
                    scale: true,
                    boundaryGap : false,
                    axisLine: {onZero: false},
                    axisTick: {show: false},
                    splitLine: {show: false},
                    axisLabel: {show: false},
                    splitNumber: 20,
                    min: '2009-08-21',
                    max: '2010-08-20'
                }
            ],
            yAxis: [
                {
                    scale: true,
                    splitArea: {
                        show: true
                    }
                },
                {
                    scale: true,
                    gridIndex: 1,
                    splitNumber: 2,
                    axisLabel: {show: false},
                    axisLine: {show: false},
                    axisTick: {show: false},
                    splitLine: {show: false}
                }
            ],
            dataZoom: [
                {
                    type: 'inside',
                    xAxisIndex: [0, 1],
                    start: 90,
                    end: 100
                },
                {
                    show: true,
                    xAxisIndex: [0, 1],
                    type: 'slider',
                    top: '85%',
                    start: 90,
                    end: 100
                }
            ],
            series: [
            {
                name: '日K',
                type: 'candlestick',
                data: data.values,
                itemStyle: {
                    normal: {
                        borderColor: null,
                        borderColor0: null
                    }
                },
                tooltip: {
                    formatter: function (param) {
                        var param = param[0];
                        return [
                            'Date: ' + param.name + '<hr size=1 style="margin: 3px 0">',
                            'Open: ' + param.data[0] + '<br/>',
                            'Close: ' + param.data[1] + '<br/>',
                            'Lowest: ' + param.data[2] + '<br/>',
                            'Highest: ' + param.data[3] + '<br/>'
                        ].join('');
                    }
                }
            },
       		{
			name: 'MA5',
			type: 'line',
			data: calculateMA(5, data),
			smooth: true,
				lineStyle: {
					normal: {opacity: 0.5}
				}
			},
			{
			name: 'MA10',
			type: 'line',
			data: calculateMA(10, data),
			smooth: true,
				lineStyle: {
					normal: {opacity: 0.5}
				}
			},
			{
			name: 'MA20',
			type: 'line',
			data: calculateMA(20, data),
			smooth: true,
				lineStyle: {
					normal: {opacity: 0.5}
				}
			},
			{
			name: 'MA30',
			type: 'line',
			data: calculateMA(30, data),
			smooth: true,
				lineStyle: {
					normal: {opacity: 0.5}
				}
			},
            {
                name: 'Volumn',
                type: 'bar',
                xAxisIndex: 1,
                yAxisIndex: 1,
                data: data.volumns
            }
        ]
    }, true);


        myChart.dispatchAction({
        type: 'brush',
        areas: [
            {
                brushType: 'lineX',
                coordRange: ['2010-08-11', '2010-08-20'],
                xAxisIndex: 0
            }
        ]
        });
    };

    set(data0);
});
