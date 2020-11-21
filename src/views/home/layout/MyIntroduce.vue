<template>
    <div class="body">
         <section class="section">
            <p class="p1">技术和平台优势</p>
            <p class="p2">基于知识图谱，快速查找，精准定位，个性化推荐</p>
            <ul>
                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-home_shengjifabu_sel"></use>
                    </svg>
                    <div>使用简单、精准快速</div>
                    <p>根据故障标签、故障描述、报错日志精准定位；根据推荐指数罗列解决方案</p>
                </li>
                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-home_yunyingtuijian_1"></use>
                    </svg>
                    <div>历史查询、个性推荐</div>
                    <p>根据历史记录查询，产生个性化推荐；支持点赞收藏，丰富个人技术库</p>
                </li>
                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-home_banbenguanli_se"></use>
                    </svg>
                    <div>记录汇总、个人管理</div>
                    <p>个人中心支持历史记录查询，支持解决方案收藏，方便管理</p>
                </li>
            </ul>
        </section>
    </div>
</template>

<style lang="less" scoped>
.body{
    min-width: 1200px;
}
.section {
    height: 530px;
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    .p1 {
        margin-top: 100px;
        font-size: 28px;
        color: #373d41;
        margin-bottom: 10px;
    }
    .p2 {
        font-size: 16px;
        color: #9b9ea0;
    }
    ul {
        margin-top: 108px;
        display: flex;
        width: 1200px;
        justify-content: space-between;
        align-items: center;
        li {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 300px;
            color: #373d41;
            font-size: 15px;
            svg {
                width: 48px;
                height: 46px;
            }
            div {
                margin-top: 48px;
            }
            p {
                margin-top: 12px;
                font-size: 14px;
                color: #9b9ea0;
            }
        }
    }
}

</style>