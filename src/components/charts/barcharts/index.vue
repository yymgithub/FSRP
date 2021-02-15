<template>
    <div style="display:flex;width:100%;">
        <div :id="barChartId" :style="{width: width, height: height}"></div>
    </div>
</template>
<script>
import * as echarts from 'echarts';
export default {
    name: "barchart",
    props: {
        barChartId:{
            type: String,
            default () {
                return 'barChartId'
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
        let barChart = echarts.init(document.getElementById(this.barChartId));
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
                        type: 'bar',
                        stack: '总量',
                        barWidth: 16,
                        color:'rgb(245, 108, 108)',
                    },
                    {
                        type: 'bar',
                        stack: '总量',
                        barWidth: 20,
                        color:'rgb(255, 136, 51)'
                    },
                    {
                        type: 'bar',
                        stack: '总量',
                        barWidth: 20,
                        color:'rgb(230, 162, 60)'
                    },
                    {
                        type: 'bar',
                        stack: '总量',
                        barWidth: 20,
                        color:'#83bff6'
                    }
                ]
          };
        // 绘制图表
          barChart.setOption(option);
        }
    },
    mounted () {
        this.drawBar();
    }
}
</script>
<style lang="less" scoped>

</style>