<template>
    <section>
        <h1>智能监控平台</h1>
        <p class="desc">IT Failure Solution Recommendation Platform</p>
         <p class="p3">
            <span>故障问答</span>
            <i></i>
            <span>记录查询</span>
             <i></i>
            <span>历史推荐</span>
            <i></i>
            <span>知识图谱</span>
            <i></i>
            <span>个人管理</span>
        </p>
          <div class="btn-wrap">
                <div class="btn">开始使用</div>
                <div class="btn2">
                    <router-link tag="a" :to="{ path: 'workspace/dashboard' }">故障问答</router-link>
                    <!-- <router-link tag="a" :to="{ path: 'person' }">历史记录</router-link> -->
                    <!-- <router-link tag="a" :to="{ path: 'recommend' }">历史推荐</router-link> -->
                </div>
        </div>
    </section>
</template>

<style lang="less" scoped>
section {
    background: url(../../../../public/img/home_bj.jpg) no-repeat; 
    background-size: cover;
    width: 100%;
    min-width: 1200px;
    height: 100vh;
    min-height: 400px;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    h1 {
        font-size: 48px;
        position: relative;
        z-index: 999;
        margin: 0;
        margin-top: 100px;
    }
    .desc {
        opacity: 0.8;
        margin-bottom: 40px;
        width: 600px;
        letter-spacing: 6px;
        text-align-last: justify;
        -moz-text-align-last: justify;
        -webkit-text-align-last: justify;
        position: relative;
        z-index: 999;
    }
    .p3 {
        display: flex;
        align-items: center;
        font-size: 20px;
        margin-bottom: 100px;
        position: relative;
        z-index: 999;
        span {
            opacity: 0.8;
        }
        i {
            background: #ffffff;
            width: 3px;
            height: 3px;
            border-radius: 100%;
            margin: 0 25px;
        }
    } 
    .btn,
    .btn2 {
        border: 2px solid #fff;
        width: 172px;
        line-height: 46px;
        font-size: 20px;
        text-align: center;
        cursor: pointer;
        transition: 1s;
        display: flex;
        flex-direction: column;
        a {
            color: #fff;
            text-decoration-line: none;
        }
    }
    .btn-wrap {
        width: 172px;
        height: 142px;
    }
    .btn-wrap:hover {
        .btn2 {
            display: flex;
        }
        .btn {
            display: none;
        }
    }
    .btn2 {
        display: none;
        a:hover {
            background: #808080;
        }
    }

}
</style>