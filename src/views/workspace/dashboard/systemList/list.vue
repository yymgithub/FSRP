<template>
  <div>
    <section>
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
          <a-card :loading="barchartloading" style="margin-top:20px;height:370px;" size="small" :bordered="false" title="过去一周异常统计">
              <barchart :barChartId="barChartId" :width="barwidth" :height="barheight" :dimensions="barData.dimensions" :source="barData.source"></barchart>
          </a-card>
        </div>
      </a-col>
    </a-row>
    </section>
    <a-divider orientation="left">
      主机指标信息
    </a-divider>
    <section style="margin-top:20px">
      <div class="flexstyle">
          <a-card :loading="linechartloading" class="zhuji" size="small" :bordered="false">
              <tablist :subtitle="'CPU&内存'" :panelist="master.cpu"></tablist>
          </a-card>
          <a-card :loading="linechartloading" class="zhuji" size="small" :bordered="false">
              <tablist :subtitle="'磁盘读写'" :panelist="master.cd"></tablist>
          </a-card>
          <a-card :loading="linechartloading" class="zhuji" size="small" :bordered="false">
              <tablist :subtitle="'网络上下行'" :panelist="master.network"></tablist>
          </a-card>
      </div>
    </section>
    <a-divider orientation="left">
      容器指标信息
    </a-divider>
    <section style="margin-top:20px">
      <div class="flexstyle">
          <a-card :loading="linechartloading" class="rongqi" size="small" :bordered="false">
              <tablist :subtitle="'CPU&内存'" :panelist="container.cpu"></tablist>
          </a-card>
      </div>
    </section>
     <a-divider orientation="left">
      服务指标信息
    </a-divider>
    <section style="margin-top:20px">
      <div class="flexstyle">
          <a-card :loading="linechartloading" class="fuwu" size="small" :bordered="false">
              <tablist :subtitle="'响应时间'" :panelist="service.respose"></tablist>
          </a-card>
          <a-card :loading="linechartloading" class="fuwu" size="small" :bordered="false">
              <tablist :subtitle="'每分钟调用次数'" :panelist="service.time"></tablist>
          </a-card>
      </div>
    </section>
  </div>
</template>
<script>
import mind from '@/components/mind';
import barchart from '@/components/charts/barcharts';
import tablist from '@/components/tablist'
export default {
    name:'systemlist',
    components: {
        mind,
        barchart,
        tablist
    },
    created() {
        // 系统部署图信息
        this.$http.get('/data/systemdata.json').then((res) => {
              if (res.data.code === 200) {
                  this.dataList = res.data.dataList;
                  this.g6loading = false;
              }
        });
        // 过去一周异常信息
        this.$http.get('/data/bardata.json').then((res) => {
              if (res.data.code === 200) {
                  this.barData.dimensions = res.data.dimensions;
                  this.barData.source = res.data.source;
                  this.barchartloading = false;
              }
        });
        // 主机指标信息
        this.$http.get('/data/masterdata.json').then((res) => {
              if (res.data.code === 200) {
                  this.master = res.data.data;
                  this.linechartloading = false;
              }
        });
        // 容器指标信息
        this.$http.get('/data/containerdata.json').then((res) => {
              if (res.data.code === 200) {
                  this.container = res.data.data;
                  this.linechartloading = false;
              }
        });
        // 服务指标信息
        this.$http.get('/data/servicedata.json').then((res) => {
              if (res.data.code === 200) {
                  this.service = res.data.data;
                  this.linechartloading = false;
              }
        });
       
    },
    mounted() {
    },
    data() {
        return {
          g6loading: true,
          barchartloading: true,
          linechartloading: true,
          dataList: {},
          height: 500,
          barChartId: 'linechart1',
          barheight: '300px',
          barwidth: '100%',
          lineoption: {},
          barData: {
            dimensions: [],
            source: []
          },
          master: [],
          container: [],
          service: []
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
.flexstyle {
  display: flex;
  justify-content: space-between;
}
.zhuji {
  width:32%;
  height:400px;
}
.rongqi {
  width:40%;
  height:400px;
}
.fuwu {
  width:48%;
  height:400px;
}
  
</style>