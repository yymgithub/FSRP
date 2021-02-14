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
        option: {
            type: Object,
                default () {
                    return {
                        legenddata:[],
                        xData:[],
                        series:[]
                    }
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
        drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let lineChart = echarts.init(document.getElementById(this.lineChartId));
        let option = {
              tooltip: {
                  trigger: 'axis'
              },
              legend: {
                  data: this.option.legenddata,
                  left: "center"
              },
              grid: {
                  left: '3%',
                  right: '7%',
                  bottom: '3%',
                  containLabel: true
              },
              xAxis: {
                  type: 'category',
                  boundaryGap: false,
                  data: this.option.xData
              },
              yAxis: {
                  type: 'value'
              },
              series: this.option.series
          };
        // 绘制图表
          lineChart.setOption(option);
        }
    },
    mounted () {
        this.drawLine();
    }
}
</script>
<style lang="less" scoped>

</style>