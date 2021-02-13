<template>
    <div>
        <my-header></my-header>
        <div class="container">
            <el-menu class="el-menu-vertical-demo" :collapse="isCollapse" @select="select" background-color="#2e3134" :default-active="defaultActive" :router="true">
                <el-menu-item :index="item.path" :key="item.path" v-for="item in nav.dashboard">
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
                <Button class="hideMenuStyle" type="text" shape="circle" @click="hideMenu" icon="md-arrow-back" v-if="listIndex !== -1"></Button>
                <Button class="hideMenuStyle" type="text" shape="circle" @click="showMenu" icon="md-arrow-forward" v-if="listIndex == -1"></Button>
            </el-menu>
            <section class="tab" v-if="listIndex == 0">
                <div class="title">
                    <span>监控信息</span>
                </div>
                <ul class="list">
                    <router-link tag="li" :to="{'name':item.router}" v-for="(item, index) in nav.dashboard[navIndex].children" :key="index">{{item.name}}</router-link>
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
            <section class="main-wrap">
                <el-scrollbar class="page-component__left">
                    <!-- <el-breadcrumb separator=">">
                        <el-breadcrumb-item v-for="item in levelList" :key="item.path">
                            {{ item.meta.title }}
                        </el-breadcrumb-item>
                    </el-breadcrumb> -->
                    <div class="main">
                        <keep-alive>
                            <router-view></router-view>
                        </keep-alive>
                    </div>
                </el-scrollbar>
            </section>
        </div>
    </div>
</template>
<script>
import MyHeader from '../home/layout/MyHeader.vue'
export default {
  components: { MyHeader },
  created() {
      if (/dashboard/.test(this.$route.path)) {
            this.listIndex = 0;
            this.defaultActive = this.nav["dashboard"][0].path;
        } else if (/recommend/.test(this.$route.path)) {
            this.listIndex = 1;
            this.defaultActive = this.nav["recommend"][0].path;
        } else if (/person/.test(this.$route.path)) {
            this.listIndex = 2;
            this.defaultActive = this.nav["person"][0].path;
        }

        this.getBreadcrumb();
  },
  data() {
      return {
            currentIndex: "",
            listIndex: "",
            defaultActive: "",
            isCollapse: true,
            navIndex: 0,
            levelList: null,
            nav: {
                dashboard: [
                    {
                        path: "/workspace/dashboard",
                        icon: "home_huiduceshi_sele",
                        activeIcon: "home_huiduceshi_sele",
                        children: [
                            {
                                name: "系统基础信息",
                                router: "systemlist"
                            },
                            {
                                name: "异常信息详情",
                                router: "indicatorinfo"
                            }
                        ]
                    }
                    ],
                recommend: [
                    {
                            path: "/workspace/recommend",
                            icon: "home_shengjifabu_sel",
                            activeIcon: "home_shengjifabu_sel",
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
                        icon: "home_yunyingtuijian_1",
                        activeIcon: "home_yunyingtuijian_1",
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
    watch: {
        $route() {
            this.getBreadcrumb();
        }
    },
    methods: {
        hideMenu() {
            this.currentIndex = this.listIndex;
            this.listIndex = -1;
        },
        showMenu() {
            this.listIndex = this.currentIndex;
        },
        select(key) {
            this.listIndex = key;
            if (/dashboard/.test(key)) {
                this.listIndex = 0;
            } else if (/recommend/.test(key)) {
                this.listIndex = 1;
            } else if (/person/.test(key)) {
                this.listIndex = 2;
            }
        },
        getBreadcrumb() {
            let matched = this.$route.matched.filter(item => {
                if (item.name) {
                    return true;
                }
            });
            const first = matched[0];
            if (first) {
                matched = [].concat(matched);
            }
            this.levelList = matched;
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
    .hideMenuStyle{
        position: absolute;
        bottom:10px;
        left: 10px;
    }
}
.main-wrap {
    flex: 1;
    display: flex;
    min-width: 956px;
    overflow-y: scroll;
    .page-component__left {
        height: calc(100vh - 60px);
        padding: 10px 20px;
        width: 100%;
        .el-scrollbar__wrap{
            margin-right: 0px!important;
            .main {
            padding: 20px 0;
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
