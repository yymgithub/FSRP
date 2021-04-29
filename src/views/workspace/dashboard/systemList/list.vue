<template>
  <div>
    <BaseTitle content="部署信息" size="default" style="margin-top:-30px;"></BaseTitle>
    <section>
      <Graph :api="api"></Graph>
    </section>
  </div>
</template>
<script>
import BaseTitle from '@/components/BaseTitle';
import Graph from '@/components/Graph';
export default {
    name:'systemlist',
    components: {
        Graph,
        BaseTitle
    },
    created() {
    },
    mounted() {
    },
    data() {
        return {
          api: '/data/systemlist.json'
        };
    },
    methods: {
    }
}
</script>
<style lang="less" scoped>

</style>