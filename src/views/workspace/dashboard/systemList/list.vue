<template>
  <div>
    <a-row>
      <a-col :span="16">
        <a-card size="small" :loading="loading" :bordered="false" title="系统部署图">
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
           <a-card style="margin-top:20px;height:370px;" size="small" :bordered="false" title="过去一周异常统计">
              <div id="myChart" :style="{width: '300px', height: '300px'}"></div>
          </a-card>
        </div>
      </a-col>
    </a-row>
    <a-row>
      <div style="margin-top:20px">
        <a-card
          style="width:100%"
          :bordered="false"
          :tab-list="tabListNoTitle"
          :active-tab-key="noTitleKey"
          @tabChange="key => onTabChange(key, 'noTitleKey')"
        >
          <p v-if="noTitleKey === '主机A-CPU&内存'">
            主机A-CPU&内存
          </p>
          <p v-else-if="noTitleKey === '主机B-CPU&内存'">
            主机B-CPU&内存
          </p>
          <p v-else>
            主机c-CPU&内存
          </p>
        </a-card>
        </div>
    </a-row>
  </div>
</template>
<script>
import mind from '@/components/mind';
import * as echarts from 'echarts';
export default {
    name:'systemlist',
    components: {
        mind
    },
    created() {
        this.$http.get('/data/systemdata.json').then((res) => {
              if (res.data.code === 200) {
                  this.dataList = res.data.dataList;
                  this.loading = false;
              }
        })
    },
    mounted() {
      this.drawLine();
    },
    data() {
        return {
          tabListNoTitle: [
            {
              key: '主机A-CPU&内存',
              tab: '主机A-CPU&内存',
            },
            {
              key: '主机B-CPU&内存',
              tab: '主机B-CPU&内存',
            },
            {
              key: '主机C-CPU&内存',
              tab: '主机C-CPU&内存',
            },
            {
              key: '主机A-磁盘读写',
              tab: '主机A-磁盘读写',
            },
            {
              key: '主机B-磁盘读写',
              tab: '主机B-磁盘读写',
            },
            {
              key: '主机C-磁盘读写',
              tab: '主机C-磁盘读写',
            },
          ],
          key: '主机A-CPU&内存',
          noTitleKey: '主机A-CPU&内存',
          loading:true,
          dataList: {},
          height: 500
        };
    },
    methods: {
       onTabChange(key, type) {
          console.log(key, type);
          this[type] = key;
        },
      drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('myChart'));
        let option = {
              tooltip: {
                  trigger: 'axis'
              },
              legend: {
                  data: ['紧急', '重要', '次要', '提示'],
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
                  data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
              },
              yAxis: {
                  type: 'value'
              },
              series: [
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
          };
            // 绘制图表
            myChart.setOption(option);
        }
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