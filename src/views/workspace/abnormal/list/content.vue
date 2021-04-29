<template>
    <div>
        <BaseTitle content="异常信息" size="default" style="margin-top:-30px;"></BaseTitle>
        <Card>
            <a-descriptions title=" " :column="2">
              <a-descriptions-item label="异常service">
                主机B->hadoop-slave1-NodeManager
                </a-descriptions-item>
                <a-descriptions-item label="关键日志">
                Caused by: java.net.NoRouteToHostException
                </a-descriptions-item>
                <a-descriptions-item label="异常KPI">
                主机B->hadoop-slave1:cpu
                </a-descriptions-item>
                <a-descriptions-item label="关键路径">
                ResourceManager(主机A,hadoop-master)——>NodeManager(主机B,hadoop-slave1)
                </a-descriptions-item>
            </a-descriptions>
        </Card>
        <BaseTitle content="部署详情" size="default"></BaseTitle>
        <Graph :api="api"></Graph>
        <BaseTitle content="服务调用详情" size="default"></BaseTitle>
        <ServiceGraph :api="serviceapi" v-on:getNodeId="getNodeId"></ServiceGraph>
        <div id="serviceInfo" v-show="ifService">
            <BaseTitle :content="serviceid+'详情'" size="small"></BaseTitle>
            <ModuleGraph :api="moduleapi" v-on:getModuleId="getModuleId"></ModuleGraph>
        </div>
    </div>
</template>

<script>
import BaseTitle from '@/components/BaseTitle';
import Graph from '@/components/Graph';
import ServiceGraph from '@/components/ServiceGraph';
import ModuleGraph from '@/components/ModuleGraph';
export default {
     components: {
        BaseTitle,
        Graph,
        ServiceGraph,
        ModuleGraph
    },
    data() {
        return {
            ifService: false,
            serviceid: '服务',
            ratioList: [],
            api: '/data/abnormalgraph.json',
            serviceapi: '/data/servicegraph.json',
            moduleapi: '/data/modulegraph.json'
        };
    },
    created() {
         // 关键路径指标详情
        this.$http.get('/data/ratiolistdata.json').then((res) => {
              if (res.data.code === 200) {
                  this.ratioList = res.data.data;
              }
        });

    },
    methods: {
        getNodeId(data) {
            this.serviceid = data;
            if (data) {
                this.ifService = true;
            }
        },
        getModuleId(data) {

        }
       
    }
}
</script>
<style lang="less" scoped>
  #serviceInfo {
      width: 100%;
      height: 100px;
  }
</style>