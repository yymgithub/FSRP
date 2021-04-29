<template>
    <div id="card" :style="{top: `${cardData.y}px`, left: `${cardData.x}px`}">
         <a-card size="small" :title="cardData.title">
            <p>CPU使用率：{{cardData.cpu}}(%)</p>
            <p>内存使用率：{{cardData.ram}}(%)</p>
            <p>读速率：{{cardData.read}}(kb/s)</p>
            <p>写速率：{{cardData.write}}(kb/s)</p>
            <p>上行速率：{{cardData.up}}(kb/s)</p>
            <p>下行速率：{{cardData.down}}(kb/s)</p>
        </a-card>
    </div>
</template>
<script>
export default {
    name: 'GraphCard',
    props: {
        cardData: {
            title: String,
            cpu: String,
            ram: String,
            read: String,
            write: String,
            up: String,
            down: String,
            x: Number,
            y: Number
        }
    }
};
</script>
<style lang="less" scoped>
#card {
    width: 200px;
    position: absolute;
    // left: -300px;
    // top: -100px;
    user-select: none;
}
</style>