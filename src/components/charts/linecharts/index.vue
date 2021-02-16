<template>
    <div style="display:flex;width:100%;">
        <div :id="lineChartId" :style="{width: width, height: height}"></div>
    </div>
</template>
<script>
import * as echarts from 'echarts';
export default {
    name: "linechart",
    props: {
        lineChartId:{
            type: String,
            default () {
                return 'lineChartId'
            }
        },
        source: {
            type: Array,
            default () {
                return []
            }

        },
        dimensions: {
            type: Array,
                default () {
                return []
            }
        },
        height:{
            type: String,
            default () {
                return ''
            }
        },
        width:{
            type: String,
            default () {
                return ''
            }
        }
    },
    data () {
        return {
        }
    },
    methods: {
        drawBar(){
        // 基于准备好的dom，初始化echarts实例
        let lineChart = echarts.init(document.getElementById(this.lineChartId));
        let option = {
                legend: {},
                tooltip: {
                  trigger: 'axis'
                },
                grid: {
                  left: '3%',
                  right: '7%',
                  bottom: '3%',
                  containLabel: true
                },
                dataset: {
                    dimensions: this.dimensions,
                    source: this.source
                },
                xAxis: {type: 'category',boundaryGap: true},
                yAxis: {},
                // Declare several bar series, each will be mapped
                // to a column of dataset.source by default.
                series: [
                    {
                        type: 'line',
                        areaStyle: {
                            opacity: 0.5
                        },
                        color:'rgb(252, 157, 154)',
                        symbolSize: 4,
                        lineStyle: {
                            width: 1
                        }
                    },
                    {
                        type: 'line',
                        areaStyle: {
                            opacity: 0.5
                        },
                        color:'#83bff6',
                        symbolSize: 4,
                        lineStyle: {
                            width: 1
                        }
                    }
                ]
          };
        // 绘制图表
          lineChart.setOption(option);
        }
    },
    mounted () {
        this.drawBar();
    }
}
</script>
<style lang="less" scoped>

</style>