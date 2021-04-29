<template>
    <div id="card" v-show="ifCard">
         <a-card size="small" :title="moduleData.name">
            <p>异常开始时间：{{moduleData.time}}</p>
            <p>点击节点查看日志详情</p>
        </a-card>
    </div>
</template>
<script>
export default {
    name: 'ModuleCard',
    props: {
        ifCard: Boolean,
        moduleData: {
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