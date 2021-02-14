<template>
  <div>
    <a-row>
      <a-col :span="16">
        <a-card size="small" :loading="g6loading" :bordered="false" title="系统部署图">
          <div style="width:100%;">
            <mind :data="dataList" :height="height"></mind>
          </div>
        </a-card>
      </a-col>
      <a-col :span="8">
        <div style="width:100%;padding-left:20px;">
          <a-card size="small" style="height:180px;" :bordered="false" title="当前异常">
                <a-row>
                  <a-col :span="12" class="nowinfo">
                    <a-statistic title="紧急" :value="2" :value-style="{ color: 'rgb(245, 108, 108)' }">
                    <template #prefix>
                      <a-icon type="close-circle" theme="twoTone" two-tone-color="rgb(245, 108, 108)" class="icon"/>
                    </template>
                    </a-statistic>
                  </a-col>
                  <a-col :span="12" class="nowinfo">
                    <a-statistic title="重要" :value="4" :value-style="{ color: 'rgb(255, 136, 51)' }">
                    <template #prefix>
                      <a-icon type="exclamation-circle" theme="twoTone" two-tone-color="rgb(255, 136, 51)" class="icon" />
                    </template>
                    </a-statistic>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12" class="nowinfo">
                    <a-statistic title="次要" :value="5" :value-style="{ color: 'rgb(230, 162, 60)' }">
                    <template #prefix>
                      <a-icon type="question-circle" theme="twoTone" two-tone-color="rgb(230, 162, 60)" class="icon" />
                    </template>
                    </a-statistic>
                  </a-col>
                  <a-col :span="12" class="nowinfo">
                    <a-statistic title="提示" :value="1" :value-style="{ color: 'rgb(64, 158, 255)' }">
                    <template #prefix>
                      <a-icon type="info-circle" theme="twoTone" two-tone-color="rgb(64, 158, 255)" class="icon" />
                    </template>
                    </a-statistic>
                  </a-col>
                </a-row>
          </a-card>
           <a-card :loading="linechartloading" style="margin-top:20px;height:370px;" size="small" :bordered="false" title="过去一周异常统计">
              <linechart :lineChartId="lineChartId" :width="linewidth" :height="lineheight" :option="lineoption"></linechart>
          </a-card>
        </div>
      </a-col>
    </a-row>
    <a-row>
      <div style="margin-top:20px">
      </div>
    </a-row>
  </div>
</template>
<script>
import mind from '@/components/mind';
import linechart from '@/components/charts/linecharts';
export default {
    name:'chartlist',
    components: {
        mind,
        linechart
    },
    created() {
        this.$http.get('/data/systemdata.json').then((res) => {
              if (res.data.code === 200) {
                  this.dataList = res.data.dataList;
                  this.g6loading = false;
              }
        });
        this.linechartloading = false;
        this.lineoption = {
          legenddata:['紧急', '重要', '次要', '提示'],
          xData:['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          series:[
             {
                      name: '紧急',
                      type: 'line',
                      stack: '总量',
                      itemStyle:{ 
                        normal:{
                            color:'rgb(245, 108, 108)',
                            lineStyle:{
                              color:'rgb(245, 108, 108)'
                            }
                          }
                      },
                      data: [12, 23, 24, 19, 8, 26, 24]
                  },
                  {
                      name: '重要',
                      type: 'line',
                      stack: '总量',
                      itemStyle:{ 
                            normal:{
                                color:'rgb(255, 136, 51)',
                                lineStyle:{
                                  color:'rgb(255, 136, 51)'
                                }
                            }
                      },
                      data: [24, 32, 14, 24, 37, 35, 12]
                  },
                  {
                      name: '次要',
                      type: 'line',
                      stack: '总量',
                      itemStyle:{ 
                          normal:{
                            color:'rgb(230, 162, 60)',
                            lineStyle:{
                              color:'rgb(230, 162, 60)'
                            }
                          }
                      },
                      data: [14, 25, 7, 23, 18, 34, 45]
                  },
                  {
                      name: '提示',
                      type: 'line',
                      stack: '总量',
                      itemStyle:{ 
                          normal:{
                            color:'rgb(64, 158, 255)',
                            lineStyle:{
                              color:'rgb(64, 158, 255)'
                            }
                          }
                      },
                      data: [34, 13, 21, 16, 37, 21, 18]
                  }
          ]
        }

    },
    mounted() {
    },
    data() {
        return {
          g6loading: true,
          linechartloading: true,
          dataList: {},
          height: 500,
          lineChartId: 'linechart1',
          lineheight: '300px',
          linewidth: '100%',
          lineoption:{}
        };
    },
    methods: {
    }
}
</script>
<style lang="less" scoped>
.nowinfo {
  display: flex;
  justify-content: center;
  .icon {
    font-size: 18px;
  }
}
  
</style>