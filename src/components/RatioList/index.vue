<template>
    <ul class="ratio-list">
        <li class="ratio-item" v-for="(item,index) in list" :key="index" :style="{
            width: '100%'
        }">
            <Poptip trigger="hover" transfer>
                <div :class="{'ratio-item-title': true}">
                    <span :class="indicateStyle(item.servstatus)"></span>
                    <span class="indicate-text">{{item.title}}</span>
                </div>
                <p class="pop-title ratio-item-title" slot="title">
                    <span>{{item.title}}</span>
                </p>
                <div class="pop-content" slot="content">
                    <ul>
                        <li>
                            <span class="title">整体时延</span>
                            {{item.alldelay}}
                        </li>
                        <li>
                            <span class="title">服务时延</span>
                            {{item.servicedelay}}
                        </li>
                        <li>
                            <span class="title">调用次数</span>
                            {{item.usetime}}
                        </li>
                        <li>
                            <span class="title">错误数</span>
                            {{item.error}}
                        </li>
                        <li>
                            <span class="title">类型</span>
                            {{item.type}}
                        </li>
                    </ul>
                </div>
            </Poptip>
        </li>
    </ul>
</template>

<style lang="less" scoped>
    .ratio-list {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        margin-top: 10px;
        padding-left: 5px;
        padding-right: 5px;
        min-height: 40px;
        text-align: left;
        list-style: none;

        .ratio-item {
            margin: 5px 0;
            cursor: pointer;
            position: relative;

            /deep/ .ivu-poptip {
                display: block;

                .ivu-poptip-rel {
                    display: block;
                }
            }

            .indicate-text {
                overflow: hidden;
                text-overflow: ellipsis;
                word-break: break-all;
            }

            .ratio-item-title {
                display: flex;
                align-items: center;
                overflow: hidden;
                white-space: nowrap;
            }

            .ratio-item-setting {
                position: absolute;
                right: 0;
                top: 2px;
            }
        }
    }
     .pop-title {
        font-weight: bold;
        font-size: 14px;
    }

    .pop-content {
        .title:after {
            content: ":";
        }
    }
    .title{
        font-size: 12px;
        font-weight: 500;
    }
      .indicate {
            display: inline-block;
            margin-right: 5px;
            width: 14px;
            height: 14px;
            border: 1px solid transparent;
            border-radius: 100%;
        }

        .indicate-text {
            width: 121px;
        }

        .indicate-tip {
            margin-right: 4px;
        }

        .indicate-init {
            background: #2db7f5;
        }

        .indicate-success {
            background: #19be6b;
        }

        .indicate-failure {
            background: #ed4014;
        }

</style>

<script>
export default {
    name: 'RatioList',
    props: ['list', 'indicateStyle'],
    methods: {
    }
}
</script>