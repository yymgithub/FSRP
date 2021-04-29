<template>
  <div>
    <BaseTitle content="异常统计" size="default" style="margin-top:-30px;"></BaseTitle>
    <a-row :gutter="8">
      <a-col :span="6">
         <a-card size="small" style="height:250px;" :bordered="false" title="当前异常">
                <div style="height:10px;"></div>
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
                <div style="height:30px;"></div>
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
      </a-col>
      <a-col :span="18">
         <a-card :loading="barchartloading" size="small" style="height:250px;" :bordered="false" title="过去一周异常统计">
            <barchart :barChartId="barChartId" :width="barwidth" :height="barheight" :dimensions="barData.dimensions" :source="barData.source"></barchart>
        </a-card>
      </a-col>
    </a-row>
    <BaseTitle content="异常列表" size="default"></BaseTitle>
    <CommonTable
          class="table"
          :dynamicColumns="{show: true, columns: tableColumnsChecked, onChange: commonTableChange}"
          :tableConfig="commonTableConfig">
    </CommonTable>
    <Modal title="查看关键路径" v-model="stackAnalysisModal.show" width="800" scrollable>
      <span style="font-size:14px;font-weight:500;">{{stackAnalysisModal.content}}</span>
      <div v-show="stackAnalysisModal.subshow" style="margin-top:20px;">
        <Card>
          <span class="indicate indicate-success"></span>
          <span>指标正常</span>
          <span class="indicate indicate-failure" style="margin-left:10px;"></span>
          <span>指标异常</span>
          <div class="ratio-content-panel-wrap">
            <a-row class="ratio-content-panel" type="flex">
              <a-col  
                class="section"
                :style="{
                    borderRight: isBorderRight(ratioList, index) ? '1px solid #dcdee2' : 'none'
                }"
                v-for="(item, index) of ratioList"
                :span="8"
                :key="index">
              <h3 class="section-title" :title="item.title">{{item.title}}</h3>
              <RatioList
                  :indicate-style="indicateStyle"
                  :list="item.list">
              </RatioList>
              </a-col>
            </a-row>
          </div>
          </Card>
      </div>
    </Modal>
    <Drawer title="推荐解决方案" width="900" :closable="true" v-model="stackAnalysisDrawer.show">
      <Table :columns="recTableConfig" :data="recommenddata"></Table>
    </Drawer>
    <Drawer title="详情" width="750" :closable="true" v-model="stackAnalysisDrawer.subshow">
      <p>异常原因：</p>
      <p>解决方案：</p>
    </Drawer>
  </div>
</template>
<script>
import BaseTitle from '@/components/BaseTitle';
import CommonTable from '@/components/CommonTable';
import TableColumns from '@/components/TableColumns';
import RatioList from '@/components/RatioList';
import barchart from '@/components/Charts/barcharts';
export default {
    name:'abnormal',
    components: {
        BaseTitle,
        CommonTable,
        RatioList,
        barchart
    },
    data () {
      return {
        barchartloading: true,
        barChartId: 'barchart1',
        barheight: '200px',
        barwidth: '100%',
        barData: {
            dimensions: [],
            source: []
        },
        tableData:[],
        stackAnalysisModal:{
          show: false,
          subshow: true,
          content: ''
        },
        stackAnalysisDrawer:{
          show: false,
          subshow: false
        },
        recommenddata:[],
        ratioList: []
      }
    },
    computed: {
      tableColumnsChecked() {
                const tableColumnsChecked = JSON.parse(this.$utils.getLocalStorage('tableColumns')) 
                || TableColumns.getColumns(this).map(column => column.title);
                return tableColumnsChecked;
      },
      commonTableConfig() {
            return {
                props: {
                    columns: TableColumns.getColumns(this),
                    data: this.tableData
                }
            };
      },
      recTableConfig() {
        return TableColumns.getRecColumns(this);
      }
    },
    created() {
         // 过去一周异常信息
        this.$http.get('/data/bardata.json').then((res) => {
              if (res.data.code === 200) {
                  this.barData.dimensions = res.data.dimensions;
                  this.barData.source = res.data.source;
                  this.barchartloading = false;
              }
        });
      this.loadData();
      // 关键路径指标详情
        this.$http.get('/data/ratiolistdata.json').then((res) => {
              if (res.data.code === 200) {
                  this.ratioList = res.data.data;
              }
        });
      // 推荐列表数据
        this.$http.get('/data/recommenddata.json').then((res) => {
              if (res.data.code === 200) {
                  this.recommenddata = res.data.data;
              }
        });
    },
    methods: {
          indicateStyle(servstatus) {
                let styleName = [
                    'indicate-failure',
                    'indicate-success',
                    'indicate-init'
                ][servstatus * 1] || 'indicate-init';
                let style = {'indicate': true};
                style[styleName] = true;
                return style;
            },
          isBorderRight(list, index) {
                const result = list.slice(0, index);
                let columnNumber = 0;
                result.forEach(() => {
                    columnNumber += 1;
                });

                const lastNumber = columnNumber % 3;
                const otherNumner = 3 - lastNumber;

                if (otherNumner > 1) {
                    return true;
                }
                else {
                    return false;
                }
            },
          commonTableChange(columns) {
              this.$utils.setLocalStorage('tableColumns', JSON.stringify(columns));
          },
          loadData() {
            // 异常table信息
            this.$http.get('/data/abnormaldata.json').then((res) => {
                  if (res.data.code === 200) {
                      this.tableData = res.data.data;
                  }
            });
          },
          showStackAnalysisModal(info) {
            this.stackAnalysisModal.show = true;
            this.stackAnalysisModal.content = '加载中...';
            if (info.path) {
              this.stackAnalysisModal.content = info.path;
            }
          },
          showStackAnalysisDrawer() {
            this.stackAnalysisDrawer.show = true;
          },
          showSubDrawer() {
            this.stackAnalysisDrawer.subshow = true;
          },
          handleProblem() {

          },
          gotoDetail(info) {
            console.log(info);
            this.$router.push({ 
              path:"content",
　　　　       query:{id:info.id} 
            })
          }
     }
}
</script>
<style lang="less" scoped>
  .ratio-content-panel-wrap {
      @border-line: 1px solid #dcdee2;
      border-bottom: @border-line;
      border-left: @border-line;
      border-right: @border-line;
      .ratio-content-panel {
        width: 100%;
          .section {
            text-align: center;
            padding: 0;
            height: auto;
            h3 {
                padding: 8px 0;
                font-size: 12px;
                color: #fff;
                background: #3282d6;
                border-top: @border-line;
                border-bottom: @border-line;
            }

            .section-title {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
      }
  }
   .indicate {
            display: inline-block;
            margin-right: 5px;
            width: 14px;
            height: 14px;
            border: 1px solid transparent;
            border-radius: 100%;
        }

        .indicate-text {
            width: 121px;
        }

        .indicate-tip {
            margin-right: 4px;
        }

        .indicate-init {
            background: #2db7f5;
        }

        .indicate-success {
            background: #19be6b;
        }

        .indicate-failure {
            background: #ed4014;
        }
</style>