<template>
  <div>
    <!-- <BaseTitle content="异常级别" size="default" style="margin-top:-30px;"></BaseTitle> -->
    <BaseTitle content="异常列表" size="default" style="margin-top:-30px;"></BaseTitle>
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
          <span style="margin-right:10px;">指标正常</span>
          <span class="indicate indicate-failure"></span>
          <span>指标异常</span>

          <div class="ratio-content-panel-wrap">
            <Row class="ratio-content-panel" type="flex">
              <Col  
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
              </Col>
            </Row>
          </div>
          </Card>
      </div>
    </Modal>
  </div>
</template>
<script>
import BaseTitle from '@/components/BaseTitle';
import CommonTable from '@/components/CommonTable';
import TableColumns from '@/components/TableColumns';
import RatioList from '@/components/RatioList';
export default {
    name:'abnormal',
    components: {
        BaseTitle,
        CommonTable,
        RatioList
    },
    data () {
      return {
        tableData:[],
        stackAnalysisModal:{
          show: false,
          subshow: true,
          content: ''
        },
        ratioList:[
          {
            title:'主机A-hadoop-master',
            list:[
              {
                title:'NameNode',
                servstatus: 1,
                alldelay:'900ms',
                servicedelay:'108ms',
                usetime:'6',
                error:'0',
                type:'hadoop'
              },
              {
                title:'ResourceManager',
                servstatus: 0,
                alldelay:'800ms',
                servicedelay:'100ms',
                usetime:'5',
                error:'2',
                type:'hadoop'
              }
            ]
          },
          {
            title:'主机B-hadoop-slave1',
            list:[
               {
                title:'DataNode',
                servstatus: 0,
                alldelay:'890ms',
                servicedelay:'700ms',
                usetime:'',
                error:'2',
                type:'hadoop'
              },
              {
                title:'NodeManager',
                servstatus: 0,
                alldelay:'900ms',
                servicedelay:'700ms',
                usetime:'6',
                error:'2',
                type:'hadoop'
              }
            ]

          },
          {
            title:'主机B-hadoop-slave2',
            list:[
               {
                title:'DataNode',
                servstatus: 1,
                alldelay:'900ms',
                servicedelay:'800ms',
                usetime:'6',
                error:'0',
                type:'hadoop'
              },
              {
                title:'NodeManager',
                servstatus: 1,
                alldelay:'800ms',
                servicedelay:'600ms',
                usetime:'5',
                error:'0',
                type:'hadoop'
              }
            ]
          }
        ]
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
      }
    },
    created() {
      this.loadData();
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