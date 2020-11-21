<template>
    <section>
        <p class="title">欢迎使用</p>
        <p class="desc">IT故障解决方案推荐平台</p>
        <router-link class="btn" tag="div" to="/workspace">立即体验</router-link>
    </section>
</template>

<style lang="less" scoped>
section {
    background: url(../../../../public/img/home_bj_shengtai.jpg);
    height: 380px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .title {
        font-size: 24px;
        color: #373d41;
        margin-top: 70px;
    }
    .desc {
        font-size: 36px;
        color: #373d41;
        margin-top: 20px;
    }
    .btn {
        background-image: linear-gradient(90deg, #61c6f1 0%, #0496ff 100%);
        width: 180px;
        height: 40px;
        font-size: 18px;
        color: #ffffff;
        text-align: center;
        line-height: 40px;
        margin-top: 30px;
        cursor: pointer;
    }
}
</style>

