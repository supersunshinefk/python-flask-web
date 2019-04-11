/**
 * Copyright (c) 2014-2018 Mixlinker Networks Inc. <mixiot@mixlinker.com>
 * All rights reserved.
 */

/**
 * Created by Administrator on 2018/4/9 0009.
 */
//初始化echarts图表
function echarts_init(component, option){
    var myCharts = echarts.init(component,'dark');
    myCharts.setOption(option);
}






//第一个页面
function createoption_index_map(data){
	 var option_index_map = {
        //容器背景
        backgroundColor: '#2E3439',
        tooltip: {
            trigger: 'axis'
        },
        radar: [
            {
                indicator: function(){
                    var indicator = [];
					/*
					var max=data.Map.map_transform_data[0];
					for(var i=0;i<data.Map.map_transform_data.length;i++){
						if(data.Map.map_transform_data[i]>max){
							max=data.Map.map_transform_data[i];
						} 
					} 
					*/
                    for(var i=0;i<data.Parm_CN.length;i++){
                        var item = {
                            text: data.Parm_CN[i],
							max: 100 
                        };
                        indicator.push(item);
                    }
                    return indicator;
                }(),
                center: ['50%', '54%'],     //  雷达图相对位置
                // radius: 136,        //雷达图大小
                radius: 120,        //雷达图大小
				shape: 'circle',
                //轴线颜色
                axisLine: {
                    lineStyle: {
                        type : 'dashed',
                        color: '#383D42'
                    }
                },
                // 雷达图背景网格线的颜色
                splitLine: {
                    show: true,
                    lineStyle: {
                        width: 1,
                        color: '#393F43'
                    }
                },
                //雷达图背景色分隔
                splitArea: {
                    show: true,
                    areaStyle: {
                        color: ['#2E3439','#23272B']
                    }
                },

                //雷达图文本
                name: {
                    textStyle: {
                        fontSize: 12,
                        color: '#8e8e9a'
                    }
                }
            }
        ],
        series: [
            {
                type: 'radar',
                tooltip: {
                    trigger: 'item',
					formatter : function (params) {
						var param_cn = data.Parm_CN;
						var original = data.Original;
						var str='设备状态映像指数<br/>';
						for(var i in param_cn){
							str+=param_cn[i]+':'+original[i]+'<br/>';
						}
						return str;
					}
                },
                symbol: "none",         //去除雷达图填充圆点
                label: {
                    show: true

                },
                itemStyle: {            //雷达图样式
                    color: '#3F5FE3',
                    normal: {
                        areaStyle: {type: 'default'},
                        color: "#3A4F97"        //雷达图填充背景色

                    }
                },

                data: [
                    {
                        value: data.Map.map_transform_data,
                        name: '设备状态映像指数'
                    }
                ]
            }
        ]
    };
    return option_index_map;
}

function createoption_index_curve(data, curve_time){
    var y=data[data.length-1];
    var x=curve_time[curve_time.length-1];
    var option_index_curve={
        backgroundColor: '#2E3439',
        tooltip: {
            showContent: true,
            //borderColor: '#4261E2',
            backgroundColor: 'rgba(35,39,43,0.9)',
            borderWidth :1,
            padding: [10, 10],
            textStyle: {
                fontFamily: 'DIN_Medium',
                fontSize: 16,
                textBorderColor: '#F5F5F5'
            },
            axisPointer: {
                lineStyle: {
                    color: 'rgba(53,58,63,1)'
                }
            },
            trigger: 'axis'
        },

        grid: {
            top: 50,
            left: 21,
            right: '3%',
            bottom: 18,
            containLabel: true
        },
        xAxis: [{
            type: 'category',
			data: curve_time,
            boundaryGap: false,
            minInterval: 1,  //坐标轴最小间隔大小
            axisLine: {
                lineStyle: {
                    type :'dashed',
                    color: 'rgba(53,58,63,1)'
                }
            },
            //x轴刻度
            axisTick: {
                show: false
            },
            axisLabel: {
                margin: 20,
                textStyle: {
                    color:'#8E8E9A',
                    fontSize: 14
                }
            }
        }, {
            axisPointer: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    type :'dashed',
                    color: 'rgba(53,58,63,1)'
                }
            },
            axisTick: {
                show: false
            }

        }],
        yAxis: [{
            type: 'value',
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    width : 0,
                    color: 'rgba(53,58,63,1)'
                }
            },
            axisLabel: {
                margin: 20,
                textStyle: {
                    color:'#8E8E9A',
                    fontSize: 14
                }
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(53,58,63,1)'
                }
            }
        }],
        series: [
            {
                name: '',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 8,
                showAllSymbol:true,
                lineStyle: {
                    normal: {
                        width: 3,
                        color: '#4261E2'
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(66,97,226, 0.3)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(66,97,226, 0)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowBlur: 10
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#4261E2',
                        borderColor: '#4261E2',
                        borderWidth: 2

                    }
                },
                data: data,
                markPoint: {
                    symbolOffset: [0, '-10%'],
                    symbolSize: [70,70],
                    symbol: 'pin',
                    label: {
                        show: true,
                        normal : {
                            textStyle : {
                                fontWeight : 'normal',
                                fontSize : 16,
                                color: '#F5F5F5',
                                padding: [4,10]
                            }
                        }
                    },
                    data: [
                        {
                            value: y,
                            coord:[x,y],
                            itemStyle: {
                                normal: {
                                    color: '#4261E2',
                                    borderColor: '#4261E2'
                                }
                            }
                        }
                    ]
                }
            }]
    };
    return option_index_curve;
}

function createoption_index_gradirent_map(data){
    var option_index_gradirent_map = {
        //容器背景
        backgroundColor: '#2E3439',
        //填充中心区域数据
        title: {
            text: data.Indx.Grad,
            x: 'center',
            top: '50%',
            textStyle: {
                color: '#fff',
                fontWeight: 'normal',
                fontSize: 28
            }
        },
        radar: [
            {
                indicator: function(){
                    var indicator = [];
					// var max=data.Indx.Grad_Elem[0];
					// for(var i=0;i<data.Indx.Grad_Elem.length;i++){
						// if(data.Indx.Grad_Elem[i]>max){
							// max=data.Indx.Grad_Elem[i];
						// }
					// }
                    for(var i=0;i<data.Parm_CN.length;i++){
                        var item = {
                            text: data.Parm_CN[i],
							max: 100,
							min: 0
                        };
                        indicator.push(item);
                    }
                    return indicator;
                }(),
                center: ['50%', '56%'],     //  雷达图相对位置
                // radius: 100,        //雷达图大小
                radius: 90,        //雷达图大小
                shape: 'circle',    //圆角

                //轴线颜色
                axisLine: {
                    lineStyle: {
                        type : 'dashed',
                        color: '#383D42'
                    }
                },
                // 雷达图背景网格线的颜色
                splitLine: {
                    show: true,
                    lineStyle: {
                        width: 1,
                        color: '#393F43'
                    }
                },
                //雷达图背景色分隔
                splitArea: {
                    show: true,
                    areaStyle: {
                        color: ['#2E3439','#23272B']
                    }
                },

                //雷达图文本
                name: {
                    textStyle: {
                        fontSize: 12,
                        color: '#8e8e9a'
                    }
                }
            }
        ],
        series: [
            {
                type: 'radar',
                symbol: "none",         //去除雷达图填充圆点
                label: {
                    show: true
                },
                itemStyle: {            //雷达图样式
                    color: '#3F5FE3',
                    normal: {
                        areaStyle: {type: 'default'},
                        color: "#C02E36"        //雷达图填充背景色

                    }
                },

                data: [
                    {
                        value: data.Indx.Grad_Elem,
                        name: 'INDEX-DASHEBOARD'

                    }
                ]
            }
        ]
    };
    return option_index_gradirent_map;
}

function createoption_index_cumulating_map(data){
    var option_index_cumulating_map = {
        //容器背景
        backgroundColor: '#2E3439',
        //填充中心区域数据
        title: {
            text: data.Indx.Cumu,
            x: 'center',
            top: '50%',
            textStyle: {
                color: '#fff',
                fontWeight: 'normal',
                fontSize: 28
            }
        },
        radar: [
            {
                 indicator: function(){
                    var indicator = [];
					// var max=data.Indx.Cumu_Elem[0];
					// for(var i=0;i<data.Indx.Cumu_Elem.length;i++){
						// if(data.Indx.Cumu_Elem[i]>max){
							// max=data.Indx.Cumu_Elem[i];
						// }
					// }
                    for(var i=0;i<data.Parm_CN.length;i++){
                        var item = {
                            text: data.Parm_CN[i],
							max: 100,
							min: 0
                        };
                        indicator.push(item);
                    }
                    return indicator;
                }(),
                center: ['50%', '56%'],     //  雷达图相对位置
                // radius: 100,        //雷达图大小
                radius: 90,        //雷达图大小
                shape: 'circle',    //圆角

                //轴线颜色
                axisLine: {
                    lineStyle: {
                        type : 'dashed',
                        color: '#383D42'
                    }
                },
                // 雷达图背景网格线的颜色
                splitLine: {
                    show: true,
                    lineStyle: {
                        width: 1,
                        color: '#393F43'
                    }
                },
                //雷达图背景色分隔
                splitArea: {
                    show: true,
                    areaStyle: {
                        color: ['#2E3439','#23272B']
                    }
                },


                //雷达图文本
                name: {
                    textStyle: {
                        fontSize: 12,
                        color: '#8e8e9a'
                    }
                }
            }
        ],
        series: [
            {
                type: 'radar',
                symbol: "none",         //去除雷达图填充圆点
                label: {
                    show: true

                },
                itemStyle: {            //雷达图样式
                    color: '#3F5FE3',
                    normal: {
                        areaStyle: {type: 'default'},
                        color: "#c1b525"        //雷达图填充背景色

                    }
                },

                data: [
                    {
                        value: data.Indx.Cumu_Elem,
                        name: 'INDEX-DASHEBOARD'

                    }
                ]
            }
        ]
    };
    return option_index_cumulating_map;
}

function createoption_index_gradirent_curve(data, curve_time){
    var y=data[data.length-1];
    var x=curve_time[curve_time.length-1];
    var option_index_gradirent_curve={
        backgroundColor: '#2E3439',
        tooltip: {
            trigger: 'axis',
            showDelay : 0,
            axisPointer: {
                lineStyle: {
                    color: 'rgba(53,58,63,1)'
                }
            }
        },
        grid: {
            top: '30%',
            left: 21,
            right: 30,
            bottom: '11%',
            containLabel: true
        },

        xAxis: [{
            type: 'category',
			data: curve_time,
            boundaryGap: false,
            axisLine: {
                lineStyle: {
                    type :'dashed',
                    color: 'rgba(53,58,63,1)'
                }
            },
            //x轴刻度
            axisTick: {
                show: false
            },
            axisLabel: {
                margin: 20,
                textStyle: {
                    color:'#8E8E9A',
                    fontSize: 14
                }
            }
        }, {
            axisPointer: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    type :'dashed',
                    color: 'rgba(53,58,63,1)'
                }
            },
            axisTick: {
                show: false
            }

        }],
        yAxis: {
            type: 'value',
            splitNumber: 2,
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    width : 0,
                    color: 'rgba(53,58,63,1)'
                }
            },
            axisLabel: {
                margin: 20,
                textStyle: {
                    color:'#8E8E9A',
                    fontSize: 14
                }
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(53,58,63,1)'
                }
            }
        },
        series: [
            {
                name:'',
                type:'line',
                smooth: false,
                symbol: 'circle',
                symbolSize: 8,
                showAllSymbol:true,
                lineStyle: {
                    normal: {
                        width: 3,
                        color :"#CD2E36"
                    }
                },
               // areaStyle: {
               //     normal: {
               //         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
               //             offset: 0,
               //             color: 'rgba(205,46,54, 0.3)'
               //         }, {
               //             offset: 0.8,
               //             color: 'rgba(205,46,54, 0)'
               //         }], false),
               //         shadowColor: 'rgba(0, 0, 0, 0.1)',
               //         shadowBlur: 10
               //     }
               // },
                itemStyle: {
                    normal: {
                        color: '#CD2E36',
                        borderColor: '#CD2E36',
                        borderWidth: 2
                    }
                },
                data: data,
                markPoint: {
                    symbolOffset: [0, '-10%'],
                    symbolSize: [70,70],
                    symbol: 'pin',
                    label: {
                        show: true,
                        normal : {
                            textStyle : {
                                fontWeight : 'normal',
                                fontSize : 16,
                                color: '#F5F5F5',
                                padding: [4,10]
                            }
                        }
                    },
                    data: [
                        {
                            value: y,
                            coord:[x,y],
                            itemStyle: {
                                normal: {
                                    color: '#CD2E36',
                                    borderColor: '#CD2E36'
                                }
                            }
                        }
                    ]
                }
            }
        ]
    };
    return option_index_gradirent_curve;
}

function createoption_index_cumulating_curve(data, curve_time){
    var y=data[data.length-1];
    var x=curve_time[curve_time.length-1];
    var option_index_cumulating_curve={
        backgroundColor: '#2E3439',
        tooltip: {
            trigger: 'axis',
            showDelay : 0,
            axisPointer: {
                lineStyle: {
                    color: 'rgba(53,58,63,1)'
                }
            }
        },
        grid: {
            top: '30%',
            left: 21,
            right: 30,
            bottom: '11%',
            containLabel: true
        },

        xAxis: [{
            type: 'category',
			data: curve_time,
            boundaryGap: false,
            axisLine: {
                lineStyle: {
                    type :'dashed',
                    color: 'rgba(53,58,63,1)'
                }
            },
            //x轴刻度
            axisTick: {
                show: false
            },
            axisLabel: {
                margin: 20,
                textStyle: {
                    color:'#8E8E9A',
                    fontSize: 14
                }
            }
        }, {
            axisPointer: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    type :'dashed',
                    color: 'rgba(53,58,63,1)'
                }
            },
            axisTick: {
                show: false
            }

        }],
        yAxis: {
            type: 'value',
            splitNumber: 2,
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    width : 0,
                    color: 'rgba(53,58,63,1)'
                }
            },
            axisLabel: {
                margin: 20,
                textStyle: {
                    color:'#8E8E9A',
                    fontSize: 14
                }
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(53,58,63,1)'
                }
            }
        },
        series: [
            {
                name:'',
                type:'line',
                smooth: false,
                symbol: 'circle',
                symbolSize: 8,
                showAllSymbol:true,
                lineStyle: {
                    normal: {
                        width: 3,
                        color:'#C1B525'
                    }
                },
               // areaStyle: {
               //     normal: {
               //         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
               //             offset: 0,
               //             color: 'rgba(193,181,37, 0.3)'
               //         }, {
               //             offset: 0.8,
               //             color: 'rgba(193,181,37, 0)'
               //         }], false),
               //         shadowColor: 'rgba(0, 0, 0, 0.1)',
               //         shadowBlur: 10
               //     }
               // },
                itemStyle: {
                    normal: {
                        color: '#C1B525',
                        borderColor: '#C1B525',
                        borderWidth: 2
                    }
                },
                data:data,
                markPoint: {
                    symbolOffset: [0, '-10%'],
                    symbolSize: [70,70],
                    symbol: 'pin',
                    label: {
                        show: true,
                        normal : {
                            textStyle : {
                                fontWeight : 'normal',
                                fontSize : 16,
                                color: '#F5F5F5',
                                padding: [4,10]
                            }
                        }
                    },
                    data: [
                        {
                            value: y,
                            coord:[x,y],
                            itemStyle: {
                                normal: {
                                    color: '#C1B525',
                                    borderColor: '#C1B525'
                                }
                            }
                        }
                    ]
                }
            }
        ]
    };
    return option_index_cumulating_curve;
}


//第二个页面
function createoption_second_gradirent_map(data){
    var option_second_gradirent_map = {
        backgroundColor: '#2E3439',
        // tooltip: {
            // trigger: 'axis'
        // },
        radar: [{
             indicator: function(){
                    var indicator = [];
					// var max=data.Stab.Vari_Grad_Elem[0];
					// for(var i=0;i<data.Stab.Vari_Grad_Elem.length;i++){
						// if(data.Stab.Vari_Grad_Elem[i]>max){
							// max=data.Stab.Vari_Grad_Elem[i];
						// }
					// }
                    for(var i=0;i<data.Parm_CN.length;i++){
                        var item = {
                            text: data.Parm_CN[i],
							max: 100,
							min: 0
                        };
                        indicator.push(item);
                    }
                    return indicator;
                }(),
            center: ['50%', '50%'],
            radius: 100,
            shape: 'circle',
            name: {
                textStyle: {
                    fontSize: 12,
                    color: '#8e8e9a'
                }
            },
            //轴线颜色
            axisLine: {
                lineStyle: {
                    type : 'dashed',
                    color: '#383D42'
                }
            },
            // 雷达图背景网格线的颜色
            splitLine: {
                show: true,
                lineStyle: {
                    width: 1,
                    color: '#393F43'
                }
            },
            //雷达图背景色分隔
            splitArea: {
                show: true,
                areaStyle: {
                    color: ['#2E3439','#23272B']
                }
            }
        }],
        series: [
            {
                type: 'radar',
                // tooltip: {
                    // trigger: 'item'
                // },
                symbol: "none",         //去除雷达图填充圆点
                label: {
                    show: true

                },
                itemStyle: {            //雷达图样式
                    color: '#3F5FE3',
                    normal: {
                        areaStyle: {type: 'default'},
                        color: "#C02E36"        //雷达图填充背景色

                    }
                },
				 data: [
                    {
                        value: data.Stab.Vari_Grad_Elem,
                        name: '稳定性变化梯度'
                    }
                ]
            }
        ]
    };
    return option_second_gradirent_map;
}

function createoption_second_cumulating_map(data){

    var option_second_cumulating_map = {
        backgroundColor: '#2E3439',
        // tooltip: {
            // trigger: 'axis'
        // },
        radar: [{
            indicator: function(){
                    var indicator = [];
					// var max=data.Stab.Vari_Cumn_Elem[0];
					// for(var i=0;i<data.Stab.Vari_Cumn_Elem.length;i++){
						// if(data.Stab.Vari_Cumn_Elem[i]>max){
							// max=data.Stab.Vari_Cumn_Elem[i];
						// }
					// }
                    for(var i=0;i<data.Parm_CN.length;i++){
                        var item = {
                            text: data.Parm_CN[i],
							max: 100,
							min: 0
                        };
                        indicator.push(item);
                    }
                    return indicator;
                }(),
            center: ['50%', '50%'],
            radius: 100,
            // startAngle: 90,
            // splitNumber: 4,
            shape: 'circle',
            name: {
                textStyle: {
                    fontSize: 12,
                    color: '#8e8e9a'
                }
            },
            //轴线颜色
            axisLine: {
                lineStyle: {
                    type : 'dashed',
                    color: '#383D42'
                }
            },
            // 雷达图背景网格线的颜色
            splitLine: {
                show: true,
                lineStyle: {
                    width: 1,
                    color: '#393F43'
                }
            },
            //雷达图背景色分隔
            splitArea: {
                show: true,
                areaStyle: {
                    color: ['#2E3439','#23272B']
                }
            }
        }],
        series: [
            {
                type: 'radar',
                // tooltip: {
                    // trigger: 'item'
                // },
                symbol: "none",         //去除雷达图填充圆点
                label: {
                    show: true

                },
                itemStyle: {            //雷达图样式
                    color: '#3F5FE3',
                    normal: {
                        areaStyle: {type: 'default'},
                        color: "#c1b525"        //雷达图填充背景色

                    }
                },

                data: [
                    {
                        value: data.Stab.Vari_Cumn_Elem,
                        name: '稳定性变化累积效应'
                    }
                ]
            }
        ]


    };
    return option_second_cumulating_map;
}

function createoption_second_discreteness_curve(data, discreteness_time){
    var y=data[data.length-1];
    var x=discreteness_time[discreteness_time.length-1];
    var option_second_discreteness_curve={
        backgroundColor: '#2E3439',
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                lineStyle: {
                    color: 'rgba(53,58,63,1)'
                }
            }
        },
        grid: {
            top: 50,
            left: 21,
            right: '3%',
            bottom: 18,
            containLabel: true
        },
        xAxis: [{
            type: 'category',
			data: discreteness_time,
            boundaryGap: false,
            minInterval: 1,  //坐标轴最小间隔大小
            axisLine: {
                lineStyle: {
                    type :'dashed',
                    color: 'rgba(53,58,63,1)'
                }
            },
            //x轴刻度
            axisTick: {
                show: false
            },
            axisLabel: {
                margin: 20,
                textStyle: {
                    color:'#8E8E9A',
                    fontSize: 14
                }
            }
        }, {
            axisPointer: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    type :'dashed',
                    color: 'rgba(53,58,63,1)'
                }
            },
            axisTick: {
                show: false
            }

        }],
        yAxis: [{
            type: 'value',
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    width : 0,
                    color: 'rgba(53,58,63,1)'
                }
            },
            axisLabel: {
                margin: 20,
                textStyle: {
                    color:'#8E8E9A',
                    fontSize: 14
                }
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(53,58,63,1)'
                }
            }
        }],
        series: [{
            name: '',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 8,
            showAllSymbol: true,
            lineStyle: {
                normal: {
                    width: 3,
                    color: '#3DD149'
                }
            },
            //areaStyle: {
            //    normal: {
            //        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            //            offset: 0,
            //            color: 'rgba(61,209,73, 0.3)'
            //        }, {
            //            offset: 0.8,
            //            color: 'rgba(61,209,73, 0)'
            //        }], false),
            //        shadowColor: 'rgba(0, 0, 0, 0.1)',
            //        shadowBlur: 10
            //    }
            //},
            itemStyle: {
                normal: {
                    color: '#3DD149',
                    borderColor: '#3DD149',
                    borderWidth: 2

                }
            },
            data: data,
            markPoint: {
                symbolOffset: [0, '-10%'],
                symbolSize: [70,70],
                symbol: 'pin',
                label: {
                    show: true,
                    normal : {
                        textStyle : {
                            fontWeight : 'normal',
                            fontSize : 16,
                            color: '#F5F5F5',
                            padding: [4,10]
                        }
                    }
                },
                data: [
                    {
                        value: y,
                        coord:[x,y],
                        itemStyle: {
                            normal: {
                                color: '#3DD149',
                                borderColor: '#3DD149'
                            }
                        }
                    }
                ]
            }
        } ]
    };
    return option_second_discreteness_curve;
}


//第三个页面
//
function createoption_risk(risk, curve_time, riskFore){
    // var y=risk[risk.length-1];
    // var x=curve_time[curve_time.length-1];
    var index=risk.indexOf('-');
    if (index > -1) {
        risk.splice(index, 1);
    }
    var option_risk={
        backgroundColor: '#2E3439',
        tooltip: {
            axisPointer: {
                lineStyle: {
                    color: 'rgba(53,58,63,1)'
                }
            },
            trigger: 'axis'
        },

        grid: {
            top: 50,
            left: '3%',
            right: '4%',
            bottom: 18,
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            data: curve_time,
            boundaryGap: false,
            axisLine: {
                lineStyle: {
                    type :'dashed',
                    color: 'rgba(53,58,63,1)'
                }
            },
            //x轴刻度
            axisTick: {
                show: false
            },
            axisLabel: {
                margin: 20,
                textStyle: {
                    color:'#8E8E9A',
                    fontSize: 14
                }
            }
        }, {
            axisPointer: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    type :'dashed',
                    color: 'rgba(53,58,63,1)'
                }
            },
            axisTick: {
                show: false
            }

        }],
        yAxis: [{
            type: 'value',
            max: 1,
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    width : 0,
                    color: 'rgba(53,58,63,1)'
                }
            },
            axisLabel: {
                margin: 30,
                textStyle: {
                    color:'#8E8E9A',
                    fontSize: 14
                }
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(53,58,63,1)'
                }
            }
        }],
        series: [
            {
                name:'数据',
                type:'line',
                smooth:true,   //关键点，为true是不支持虚线，实线就用true
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        type: 'dashed',
                        width: 1
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            // color: 'rgba(66,97,226, 0.1)'
                            color: 'rgba(205,46,54, 0.1)'
                        }, {
                            offset: 0.8,
                            // color: 'rgba(66,97,226, 0)'
                            color: 'rgba(205,46,54, 0)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowBlur: 10
                    }
                },
                itemStyle: {
                    normal: {
                        color: 'rgb(205,46,54)',
                        borderColor: 'rgba(205,46,54,0.2)',
                        borderWidth: 2

                    }
                },
                data:riskFore
            }]
    };
    return option_risk;
}

function createoption_temperature(data,curve_all,curve_data,curve_time){

    var minx=curve_all.concat(curve_data);
     var minN = Math.min.apply(null,minx);

 var a = (minN *0.3 ).toFixed(2);
    var option_temperature = {
        backgroundColor: '#2E3439',
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                lineStyle: {
                    color: 'rgba(53,58,63,1)'
                }
            }
        },

        grid: {
            top: 47,
            left: '5%',
            right: '3%',
            bottom: '3%',
            containLabel: true
        },

        xAxis: [{
            type: 'category',
			data: curve_time,
            boundaryGap: false,
            minInterval: 1,  //坐标轴最小间隔大小
            axisLine: {
                lineStyle: {
                    type :'dashed',
                    color: 'rgba(53,58,63,1)'
                }
            },
            //x轴刻度
            axisTick: {
                show: false
            },
            axisLabel: {
                margin: 20,
                textStyle: {
                    color:'#8E8E9A',
                    fontSize: 14
                }
            }
        }, {
            axisPointer: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    type :'dashed',
                    color: 'rgba(53,58,63,1)'
                }
            },
            axisTick: {
                show: false
            }

        }],
        yAxis: [{
            type: 'value',
            min:a, 
            splitNumber: 2,
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    width : 0,
                    color: 'rgba(53,58,63,1)'
                }
            },
            axisLabel: {
                margin: 30,
                textStyle: {
                    color:'#8E8E9A',
                    fontSize: 14
                }
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(53,58,63,1)'
                }
            }
        }],
        series: [
            {
                name: '数据',
                type: 'line',
                smooth: true,
                symbol: 'none',
                showSymbol: false,
                lineStyle: {
                    normal: {
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#DC143C',
                        borderColor: 'rgba(205,46,54,0.2)',
                        borderWidth: 2
                    }
                },
                data: curve_data
            },
            {
                name: '数据',
                type: 'line',
                smooth: false,
                symbol: 'none',
                showAllSymbol:true,
                lineStyle: {
                    normal: {
                        color: '#4261E2'
                    }
                },

                itemStyle: {
                    normal: {
                        color: '#4261E2',
                        borderColor: '#4261E2',
                        borderWidth: 2
                    }
                },
                data: curve_all
            }

        ]
    };
    return option_temperature;
}

function createoption_production(data,curve_all,curve_data,curve_time){
	var minx=curve_all.concat(curve_data);
    var minN = Math.min.apply(null,minx);
    var a = (minN * 0.3).toFixed(2);
     var option_production = {
        backgroundColor: '#2E3439',
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                lineStyle: {
                    color: 'rgba(53,58,63,1)'
                }
            }
        },

        grid: {
            top: 47,
            left: '5%',
            right: '3%',
            bottom: '3%',
            containLabel: true
        },

        xAxis: [{
            type: 'category',
			data: curve_time,
            boundaryGap: false,
            minInterval: 1,  //坐标轴最小间隔大小
            axisLine: {
                lineStyle: {
                    type :'dashed',
                    color: 'rgba(53,58,63,1)'
                }
            },
            //x轴刻度
            axisTick: {
                show: false
            },
            axisLabel: {
                margin: 20,
                textStyle: {
                    color:'#8E8E9A',
                    fontSize: 14
                }
            }
        }, {
            axisPointer: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    type :'dashed',
                    color: 'rgba(53,58,63,1)'
                }
            },
            axisTick: {
                show: false
            }

        }],

        yAxis: [{
            type: 'value',
	    min: a,
            splitNumber: 2,
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    width : 0,
                    color: 'rgba(53,58,63,1)'
                }
            },
            axisLabel: {
                margin: 30,
                textStyle: {
                    color:'#8E8E9A',
                    fontSize: 14
                }
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(53,58,63,1)'
                }
            }
        }],
        series: [
            {
                name: '数据',
                type: 'line',
                smooth: true,
                symbol: 'none',
                showSymbol: false,
                lineStyle: {
                    normal: {
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#DC143C',
                        borderColor: 'rgba(205,46,54,0.2)',
                        borderWidth: 2
                    }
                },
                data: curve_data
            },
            {
                name: '数据',
                type: 'line',
                smooth: false,
                symbol: 'none',
                showAllSymbol:true,
                lineStyle: {
                    normal: {
                        color: '#4261E2'
                    }
                },

                itemStyle: {
                    normal: {
                        color: '#4261E2',
                        borderColor: '#4261E2',
                        borderWidth: 2
                    }
                },
                data: curve_all
            }
        ]
    };
    return option_production;
}

function createoption_pressure(data,curve_all,curve_data,curve_time){
	var minx=curve_all.concat(curve_data);
    var minN = Math.min.apply(null,minx);
    var a = (minN * 0.3).toFixed(2);
      var option_pressure = {
        backgroundColor: '#2E3439',
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                lineStyle: {
                    color: 'rgba(53,58,63,1)'
                }
            }
        },

        grid: {
            top: 47,
            left: '5%',
            right: '3%',
            bottom: '3%',
            containLabel: true
        },

        xAxis: [{
            type: 'category',
			data: curve_time,
            boundaryGap: false,
            minInterval: 1,  //坐标轴最小间隔大小
            axisLine: {
                lineStyle: {
                    type :'dashed',
                    color: 'rgba(53,58,63,1)'
                }
            },
            //x轴刻度
            axisTick: {
                show: false
            },
            axisLabel: {
                margin: 20,
                textStyle: {
                    color:'#8E8E9A',
                    fontSize: 14
                }
            }
        }, {
            axisPointer: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    type :'dashed',
                    color: 'rgba(53,58,63,1)'
                }
            },
            axisTick: {
                show: false
            }

        }],

        yAxis: [{
            type: 'value',
			min: a,
            splitNumber: 2,
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    width : 0,
                    color: 'rgba(53,58,63,1)'
                }
            },
            axisLabel: {
                margin: 30,
                textStyle: {
                    color:'#8E8E9A',
                    fontSize: 14
                }
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(53,58,63,1)'
                }
            }
        }],
        series: [
            {
                name: '数据',
                type: 'line',
                smooth: true,
                symbol: 'none',
                showSymbol: false,
                lineStyle: {
                    normal: {
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#DC143C',
                        borderColor: 'rgba(205,46,54,0.2)',
                        borderWidth: 2
                    }
                },
                data: curve_data
            },
            {
                name: '数据',
                type: 'line',
                smooth: false,
                symbol: 'none',
                showAllSymbol:true,
                lineStyle: {
                    normal: {
                        color: '#4261E2'
                    }
                },

                itemStyle: {
                    normal: {
                        color: '#4261E2',
                        borderColor: '#4261E2',
                        borderWidth: 2
                    }
                },
                data: curve_all
            }
        ]
    };
    return option_pressure;
}

function createoption_pressureses(data,curve_all,curve_data,curve_time){
	var minx=curve_all.concat(curve_data);
    var minN = Math.min.apply(null,minx);
    var a = (minN * 0.3).toFixed(2);
    var option_pressureses = {
        backgroundColor: '#2E3439',
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                lineStyle: {
                    color: 'rgba(53,58,63,1)'
                }
            }
        },

        grid: {
            top: 47,
            left: '5%',
            right: '3%',
            bottom: '3%',
            containLabel: true
        },

        xAxis: [{
            type: 'category',
			data: curve_time,
            boundaryGap: false,
            minInterval: 1,  //坐标轴最小间隔大小
            axisLine: {
                lineStyle: {
                    type :'dashed',
                    color: 'rgba(53,58,63,1)'
                }
            },
            //x轴刻度
            axisTick: {
                show: false
            },
            axisLabel: {
                margin: 20,
                textStyle: {
                    color:'#8E8E9A',
                    fontSize: 14
                }
            }
        }, {
            axisPointer: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    type :'dashed',
                    color: 'rgba(53,58,63,1)'
                }
            },
            axisTick: {
                show: false
            }

        }],

        yAxis: [{
            type: 'value',
			min: a,
            splitNumber: 2,
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    width : 0,
                    color: 'rgba(53,58,63,1)'
                }
            },
            axisLabel: {
                margin: 30,
                textStyle: {
                    color:'#8E8E9A',
                    fontSize: 14
                }
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(53,58,63,1)'
                }
            }
        }],
        series: [
            {
                name: '数据',
                type: 'line',
                smooth: true,
                symbol: 'none',
                showSymbol: false,
                lineStyle: {
                    normal: {
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#DC143C',
                        borderColor: 'rgba(205,46,54,0.2)',
                        borderWidth: 2
                    }
                },
                data: curve_data
            },
            {
                name: '数据',
                type: 'line',
                smooth: false,
                symbol: 'none',
                showAllSymbol:true,
                lineStyle: {
                    normal: {
                        color: '#4261E2'
                    }
                },

                itemStyle: {
                    normal: {
                        color: '#4261E2',
                        borderColor: '#4261E2',
                        borderWidth: 2
                    }
                },
                data: curve_all
            }
        ]
    };
    return option_pressureses;
}

function createoption_temperature_t(data,curve_all,curve_data,curve_time){
	var minx=curve_all.concat(curve_data);
    var minN = Math.min.apply(null,minx);
    var a = (minN * 0.3).toFixed(2);
    var option_temperature = {
        backgroundColor: '#2E3439',
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                lineStyle: {
                    color: 'rgba(53,58,63,1)'
                }
            }
        },

        grid: {
            top: 47,
            left: '5%',
            right: '3%',
            bottom: '3%',
            containLabel: true
        },

        xAxis: [{
            type: 'category',
            data: curve_time,
            boundaryGap: false,
            minInterval: 1,  //坐标轴最小间隔大小
            axisLine: {
                lineStyle: {
                    type :'dashed',
                    color: 'rgba(53,58,63,1)'
                }
            },
            //x轴刻度
            axisTick: {
                show: false
            },
            axisLabel: {
                margin: 20,
                textStyle: {
                    color:'#8E8E9A',
                    fontSize: 14
                }
            }
        }, {
            axisPointer: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    type :'dashed',
                    color: 'rgba(53,58,63,1)'
                }
            },
            axisTick: {
                show: false
            }

        }],

        yAxis: [{
            type: 'value',
			min: a,
            splitNumber: 2,
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    width : 0,
                    color: 'rgba(53,58,63,1)'
                }
            },
            axisLabel: {
                margin: 30,
                textStyle: {
                    color:'#8E8E9A',
                    fontSize: 14
                }
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(53,58,63,1)'
                }
            }
        }],
        series: [
            {
                name: '数据',
                type: 'line',
                smooth: true,
                symbol: 'none',
                showSymbol: false,
                lineStyle: {
                    normal: {
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#DC143C',
                        borderColor: 'rgba(205,46,54,0.2)',
                        borderWidth: 2
                    }
                },
                data: curve_data
            },
            {
                name: '数据',
                type: 'line',
                smooth: false,
                symbol: 'none',
                showAllSymbol:true,
                lineStyle: {
                    normal: {
                        color: '#4261E2'
                    }
                },

                itemStyle: {
                    normal: {
                        color: '#4261E2',
                        borderColor: '#4261E2',
                        borderWidth: 2
                    }
                },
                data: curve_all
            }
        ]
    };
    return option_temperature;
}

function createoption_production_p(data,curve_all,curve_data,curve_time){
	var minx=curve_all.concat(curve_data);
    var minN = Math.min.apply(null,minx);
    var a = (minN * 0.3).toFixed(2);
    var option_production = {
        backgroundColor: '#2E3439',
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                lineStyle: {
                    color: 'rgba(53,58,63,1)'
                }
            }
        },

        grid: {
            top: 47,
            left: '5%',
            right: '3%',
            bottom: '3%',
            containLabel: true
        },

        xAxis: [{
            type: 'category',
            data: curve_time,
            boundaryGap: false,
            minInterval: 1,  //坐标轴最小间隔大小
            axisLine: {
                lineStyle: {
                    type :'dashed',
                    color: 'rgba(53,58,63,1)'
                }
            },
            //x轴刻度
            axisTick: {
                show: false
            },
            axisLabel: {
                margin: 20,
                textStyle: {
                    color:'#8E8E9A',
                    fontSize: 14
                }
            }
        }, {
            axisPointer: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    type :'dashed',
                    color: 'rgba(53,58,63,1)'
                }
            },
            axisTick: {
                show: false
            }

        }],

        yAxis: [{
            type: 'value',
			min: a,
            splitNumber: 2,
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    width : 0,
                    color: 'rgba(53,58,63,1)'
                }
            },
            axisLabel: {
                margin: 30,
                textStyle: {
                    color:'#8E8E9A',
                    fontSize: 14
                }
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(53,58,63,1)'
                }
            }
        }],
        series: [
            {
                name: '数据',
                type: 'line',
                smooth: true,
                symbol: 'none',
                showSymbol: false,
                lineStyle: {
                    normal: {
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#DC143C',
                        borderColor: 'rgba(205,46,54,0.2)',
                        borderWidth: 2
                    }
                },
                data: curve_data
            },
            {
                name: '数据',
                type: 'line',
                smooth: false,
                symbol: 'none',
                showAllSymbol:true,
                lineStyle: {
                    normal: {
                        color: '#4261E2'
                    }
                },

                itemStyle: {
                    normal: {
                        color: '#4261E2',
                        borderColor: '#4261E2',
                        borderWidth: 2
                    }
                },
                data: curve_all
            }
        ]
    };
    return option_production;
}

function createoption_pressure_pr(data,curve_all,curve_data,curve_time){
	var minx=curve_all.concat(curve_data);
    var minN = Math.min.apply(null,minx);
    var a = (minN * 0.3).toFixed(2);
    var option_pressure = {
        backgroundColor: '#2E3439',
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                lineStyle: {
                    color: 'rgba(53,58,63,1)'
                }
            }
        },

        grid: {
            top: 47,
            left: '5%',
            right: '3%',
            bottom: '3%',
            containLabel: true
        },

        xAxis: [{
            type: 'category',
            data: curve_time,
            boundaryGap: false,
            minInterval: 1,  //坐标轴最小间隔大小
            axisLine: {
                lineStyle: {
                    type :'dashed',
                    color: 'rgba(53,58,63,1)'
                }
            },
            //x轴刻度
            axisTick: {
                show: false
            },
            axisLabel: {
                margin: 20,
                textStyle: {
                    color:'#8E8E9A',
                    fontSize: 14
                }
            }
        }, {
            axisPointer: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    type :'dashed',
                    color: 'rgba(53,58,63,1)'
                }
            },
            axisTick: {
                show: false
            }

        }],

        yAxis: [{
            type: 'value',
			min: a,
            splitNumber: 2,
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    width : 0,
                    color: 'rgba(53,58,63,1)'
                }
            },
            axisLabel: {
                margin: 30,
                textStyle: {
                    color:'#8E8E9A',
                    fontSize: 14
                }
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(53,58,63,1)'
                }
            }
        }],
        series: [
            {
                name: '数据',
                type: 'line',
                smooth: true,
                symbol: 'none',
                showSymbol: false,
                lineStyle: {
                    normal: {
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#DC143C',
                        borderColor: 'rgba(205,46,54,0.2)',
                        borderWidth: 2
                    }
                },
                data: curve_data
            },
            {
                name: '数据',
                type: 'line',
                smooth: false,
                symbol: 'none',
                showAllSymbol:true,
                lineStyle: {
                    normal: {
                        color: '#4261E2'
                    }
                },

                itemStyle: {
                    normal: {
                        color: '#4261E2',
                        borderColor: '#4261E2',
                        borderWidth: 2
                    }
                },
                data: curve_all
            }
        ]
    };
    return option_pressure;
}

function createoption_pressureses_pre(data,curve_all,curve_data,curve_time){
    var minx=curve_all.concat(curve_data);
    var minN = Math.min.apply(null,minx);
    var a = (minN * 0.3).toFixed(2);
    var option_pressureses = {
        backgroundColor: '#2E3439',
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                lineStyle: {
                    color: 'rgba(53,58,63,1)'
                }
            }
        },

        grid: {
            top: 47,
            left: '5%',
            right: '3%',
            bottom: '3%',
            containLabel: true
        },

        xAxis: [{
            type: 'category',
            data: curve_time,
            boundaryGap: false,
            minInterval: 1,  //坐标轴最小间隔大小
            axisLine: {
                lineStyle: {
                    type :'dashed',
                    color: 'rgba(53,58,63,1)'
                }
            },
            //x轴刻度
            axisTick: {
                show: false
            },
            axisLabel: {
                margin: 20,
                textStyle: {
                    color:'#8E8E9A',
                    fontSize: 14
                }
            }
        }, {
            axisPointer: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    type :'dashed',
                    color: 'rgba(53,58,63,1)'
                }
            },
            axisTick: {
                show: false
            }

        }],

        yAxis: [{
            type: 'value',
			min: a,
            splitNumber: 2,
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    width : 0,
                    color: 'rgba(53,58,63,1)'
                }
            },
            axisLabel: {
                margin: 30,
                textStyle: {
                    color:'#8E8E9A',
                    fontSize: 14
                }
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(53,58,63,1)'
                }
            }
        }],
        series: [
            {
                name: '数据',
                type: 'line',
                smooth: true,
                symbol: 'none',
                showSymbol: false,
                lineStyle: {
                    normal: {
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#DC143C',
                        borderColor: 'rgba(205,46,54,0.2)',
                        borderWidth: 2
                    }
                },
                data: curve_data
            },
            {
                name: '数据',
                type: 'line',
                smooth: false,
                symbol: 'none',
                showAllSymbol:true,
                lineStyle: {
                    normal: {
                        color: '#4261E2'
                    }
                },

                itemStyle: {
                    normal: {
                        color: '#4261E2',
                        borderColor: '#4261E2',
                        borderWidth: 2
                    }
                },
                data: curve_all
            }
        ]
    };
    return option_pressureses;
}





//第四个页面
function createoption_target(opt_one,curve_time){
	
	
	var option_target = {
        backgroundColor: '#2E3439',
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                lineStyle: {
                    color: 'rgba(53,58,63,1)'
                }
            }
        },
        grid: {
            top: 47,
            left: '5%',
            right: '3%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            data: curve_time,
            boundaryGap: false,
            minInterval: 1,  //坐标轴最小间隔大小
            axisLine: {
                lineStyle: {
                    type :'dashed',
                    color: 'rgba(53,58,63,1)'
                }
            },
            //x轴刻度
            axisTick: {
                show: false
            },
            axisLabel: {
                margin: 20,
                textStyle: {
                    color:'#8E8E9A',
                    fontSize: 14
                }
            }
        }, {
            axisPointer: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    type :'dashed',
                    color: 'rgba(53,58,63,1)'
                }
            },
            axisTick: {
                show: false
            }

        }],
        yAxis: [{
            type: 'value',
            splitNumber: 2,
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    width : 0,
                    color: 'rgba(53,58,63,1)'
                }
            },
            axisLabel: {
                margin: 30,
                textStyle: {
                    color:'#8E8E9A',
                    fontSize: 14
                }
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(53,58,63,1)'
                }
            }
        }],
        series: 
            {

                name: '数据',
                type: 'line',
                smooth: true,
                symbol: 'none',
                showAllSymbol: true,
                lineStyle: {
                    normal: {
						 width: 3
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#DC143C',
                        borderColor: 'rgba(205,46,54,0.2)'
                    }
                },
                data: opt_one
            }
            /*
            {
                name: '数据',
                type: 'line',
                smooth: true,
                symbol: 'none',
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 3,
                        color: '#4261E2'
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#4261E2',
                        borderColor: '#4261E2'
                    }
                },
                 data: opt_two
            } */
        
    };
    return option_target;
}



