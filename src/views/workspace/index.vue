<template>
    <div>
        <my-header></my-header>
        <div class="container">
            <el-menu class="el-menu-vertical-demo" :collapse="isCollapse" @select="select" background-color="#2e3134" :default-active="defaultActive" :router="true">
                <el-menu-item :index="item.path" :key="item.path" v-for="item in nav.ask">
                    <my-icon v-if="listIndex != 0" :type="item.icon"></my-icon>
                    <my-icon v-else :type="item.activeIcon"></my-icon>
                </el-menu-item>
                <el-menu-item :index="item.path" :key="item.path" v-for="item in nav.recommend">
                    <my-icon v-if="listIndex != 1" :type="item.icon"></my-icon>
                    <my-icon v-else :type="item.activeIcon"></my-icon>
                </el-menu-item>
                <el-menu-item :index="item.path" :key="item.path" v-for="item in nav.person">
                    <my-icon v-if="listIndex != 2" :type="item.icon"></my-icon>
                    <my-icon v-else :type="item.activeIcon"></my-icon>
                </el-menu-item>
            </el-menu>
            <section class="tab" v-if="listIndex == 0">
                <div class="title">
                    <span>故障问答</span>
                </div>
                <ul class="list">
                    <router-link tag="li" :to="{'name':item.router}" v-for="(item, index) in nav.ask[navIndex].children" :key="index">{{item.name}}</router-link>
                </ul>
            </section>
            <section class="tab" v-if="listIndex == 1">
                <div class="title">
                    <span>相关推荐</span>
                </div>
                <ul class="list">
                    <router-link tag="li" :to="{'name':item.router}" v-for="(item, index) in nav.recommend[navIndex].children" :key="index">{{item.name}}</router-link>
                </ul>
            </section>
            <section class="tab" v-if="listIndex == 2">
                <div class="title">
                    <span>个人管理</span>
                </div>
                <ul class="list">
                    <router-link tag="li" :to="{'name':item.router}" v-for="(item, index) in nav.person[navIndex].children" :key="index">{{item.name}}</router-link>
                </ul>
            </section>
        </div>
        
    </div>
</template>
<script>
import MyHeader from '../home/layout/MyHeader.vue'
export default {
  components: { MyHeader },
  created() {
      if (/ask/.test(this.$route.path)) {
            this.listIndex = 0;
            this.defaultActive = this.nav["ask"][0].path;
        } else if (/recommend/.test(this.$route.path)) {
            this.listIndex = 1;
            this.defaultActive = this.nav["recommend"][0].path;
        } else if (/person/.test(this.$route.path)) {
            this.listIndex = 2;
            this.defaultActive = this.nav["person"][0].path;
        }
  },
  data() {
      return {
            listIndex: "",
            defaultActive: "",
            isCollapse: true,
            navIndex: 0,
            nav: {
                ask: [
                    {
                        path: "/workspace/ask",
                        icon: "home_shengjifabu_sel",
                        activeIcon: "home_shengjifabu_sel",
                        children: [
                            {
                                name: "问题描述",
                                router: "answerlist"
                            }
                        ]
                    }
                    ],
                recommend: [
                    {
                            path: "/workspace/recommend",
                            icon: "home_yunyingtuijian_1",
                            activeIcon: "home_yunyingtuijian_1",
                            children: [
                                {
                                    name: "历史记录推荐",
                                    router: "recommendlist"
                                },
                                {
                                    name: "历史记录查询",
                                    router: "historyask"
                                },
                            ]
                    }
                ],
                person: [
                    {
                        path: "/workspace/person",
                        icon: "home_huiduceshi_sele",
                        activeIcon: "home_huiduceshi_sele",
                        children: [
                            {
                                name: "我的提问",
                                router: "historylist"
                            },
                            {
                                name: "我的收藏",
                                router: "collectionlist"
                            },
                            {
                                name: "个人设置",
                                router: "personal"
                            }
                        ]
                    }
                ]
            }
       }
    },
    methods: {
        select(key) {
            this.listIndex = key;
            if (/ask/.test(key)) {
                this.listIndex = 0;
            } else if (/recommend/.test(key)) {
                this.listIndex = 1;
            } else if (/person/.test(key)) {
                this.listIndex = 2;
            }
        }
    }
}
</script>
<style lang="less" scoped>
.container{
    margin-top: 60px;
    height: calc(100vh - 60px);
    display: flex;
    min-width: 1200px;
    width: 100%;
    .el-menu-vertical-demo {
        flex-shrink: 0;
        p {
            text-align: center;
            font-size: 12px;
            line-height: 56px;
            color: #999;
            height: 100%;
        }
    }
    .tab {
        width: 180px;
        flex-shrink: 0;
        background: #f4f7fb;
        height: 100%;
        position: relative;
        .title {
            height: 56px;
            background: #d9dee4;
            text-align:center;
            padding-top:20px;
            span {
                font-size:16px;
                color:#000;
                line-height:24px;
                font-weight:bold;
            }
        }
        .list {
            li {
                text-indent: 60px;
                height: 36px;
                line-height: 36px;
                color: #7a8287;
                cursor: pointer;
                font-size: 13px;
                &.active {
                    background: #fff;
                    color: #373d41;
                    .icon {
                        color: #373d41;
                    }
                }
            }
            .icon {
                color: #7a8287;
                font-size: 12px;
            }
        }
        .list-android {
            li:nth-child(1) {
                line-height: 40px;
                text-indent: 30px;
            }
        }
    }
}
.el-menu-item.is-active {
    background: #64c7ee !important;
    outline:none;
}
.icon {
    font-size: 24px;
    color: #fff;
}
</style>
