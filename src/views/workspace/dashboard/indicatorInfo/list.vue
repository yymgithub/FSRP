<template>
  <div>
    <BaseTitle content="基本信息" size="default" style="margin-top:-30px;"></BaseTitle>
    <section>
    <a-row>
      <a-col :span="16">
        <a-card size="small" :loading="g6loading" :bordered="false" title="系统部署图">
          <div style="width:100%;">
            <Mind :data="dataList" :height="height"></Mind>
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
          <a-card :loading="barchartloading" size="small" :bordered="false" title="过去一周异常统计">
              <barchart :barChartId="barChartId" :width="barwidth" :height="barheight" :dimensions="barData.dimensions" :source="barData.source"></barchart>
          </a-card>
        </div>
      </a-col>
    </a-row>
    </section>
    <BaseTitle content="主机指标信息" size="default"></BaseTitle>
    <section>
      <div class="flexstyle">
          <a-card :loading="linechartloading" class="zhuji" size="small" :bordered="false">
              <Tablist :subtitle="'CPU&内存'" :panelist="master.cpu"></Tablist>
          </a-card>
          <a-card :loading="linechartloading" class="zhuji" size="small" :bordered="false">
              <Tablist :subtitle="'磁盘读写'" :panelist="master.cd"></Tablist>
          </a-card>
          <a-card :loading="linechartloading" class="zhuji" size="small" :bordered="false">
              <Tablist :subtitle="'网络上下行'" :panelist="master.network"></Tablist>
          </a-card>
      </div>
    </section>
    <BaseTitle content="容器指标信息" size="default"></BaseTitle>
    <section>
      <div class="flexstyle">
          <a-card :loading="linechartloading" class="rongqi" size="small" :bordered="false">
              <Tablist :subtitle="'CPU&内存'" :panelist="container.cpu"></Tablist>
          </a-card>
      </div>
    </section>
    <BaseTitle content="服务指标信息" size="default"></BaseTitle>
    <section>
      <div class="flexstyle">
          <a-card :loading="linechartloading" class="fuwu" size="small" :bordered="false">
              <Tablist :subtitle="'响应时间'" :panelist="service.respose"></Tablist>
          </a-card>
          <a-card :loading="linechartloading" class="fuwu" size="small" :bordered="false">
              <Tablist :subtitle="'每分钟调用次数'" :panelist="service.time"></Tablist>
          </a-card>
      </div>
    </section>
  </div>
</template>
<script>
import Mind from '@/components/Mind';
import barchart from '@/components/Charts/barcharts';
import Tablist from '@/components/Tablist';
import BaseTitle from '@/components/BaseTitle'
export default {
    name:'systemlist',
    components: {
        Mind,
        barchart,
        Tablist,
        BaseTitle
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
          height: 480,
          barChartId: 'barchart1',
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