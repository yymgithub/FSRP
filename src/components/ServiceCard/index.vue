<template>
    <div id="card" v-show="ifCard">
         <a-card size="small" :title="serviceData.name">
            <p>所在主机：{{serviceData.machine}}</p>
            <p>所在容器：{{serviceData.containner}}</p>
            <p>整体时延：{{serviceData.alldelay}}</p>
            <p>服务时延：{{serviceData.servicedelay}}</p>
            <p>调用次数：{{serviceData.usetime}}</p>
            <p>错误数：{{serviceData.error}}</p>
            <p>类型：{{serviceData.servicetype}}</p>
            <p>点击节点查看详情</p>
        </a-card>
    </div>
</template>
<script>
export default {
    name: 'ServiceCard',
    props: {
        ifCard: Boolean,
        serviceData: {
            name: String,
            machine: String,
            containner: String,
            alldelay: String,
            servicedelay: String,
            usetime: String,
            error: String,
            servicetype: String
        }
    }
};
</script>
<style lang="less" scoped>
#card {
    width: 250px;
}
</style>