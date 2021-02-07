<template>
    <div class="header-wrap">
        <header :style="{'width':isWorkspace?'100%':'1200px','background':isWorkspace?'#2e3134':'auto'}">
            <h1 v-if="!isWorkspace" :style="{'margin-left':isWorkspace?'24px':'0'}">AIOPS</h1>
            <h1 v-if="isWorkspace" style="margin-left:24px;font-size:20px">智能监控平台</h1>
            <ul>
                <router-link tag="li" to="/home">首页</router-link>
                <router-link v-if="!isWorkspace" tag="li" to="/workspace/dashboard">监控信息</router-link>
                <router-link v-if="!isWorkspace" tag="li" to="/workspace/recommend">相关推荐</router-link>
                <router-link v-if="!isWorkspace" tag="li" to="/workspace/person">个人中心</router-link>
                <p v-if="isWorkspace">退出</p>
            </ul>
        </header>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isWorkspace: false,
        }
    },
    created() {
        this.isWorkspace = /workspace/.test(this.$route.path);
    }
}
</script>

<style lang="less" scoped>
.header-wrap {
    min-width: 1200px;
    line-height: 32px;
    align-items: center;
    display: flex;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    color: #fff;
    font-size: 14px;
    p {
        margin-right: 20px;
    }
}
h1 {
    font-size: 25px;
    position: relative;
    z-index: 999;
    font-weight: 600;
}
header {
    align-items: center;
    display: flex;
    height: 60px;
    justify-content: space-between;
    width: 100%;
    ul {
        display: flex;
        li {
            margin: 0 24px;
            cursor: pointer;
            list-style: none;
        }
        li.active {
            color: #61c6f1;
            border-bottom: 2px solid #61c6f1;
        }
    }
}
</style>