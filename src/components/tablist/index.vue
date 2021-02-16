<template>
    <div style="display:flex;width:100%;">
        <a-tabs
        :default-active-key="activekey"
        :tab-position="mode"
        :style="{ height: '100%' }"
        @prevClick="callback"
        @nextClick="callback"
        >
        <a-tab-pane v-for="(item,index) in panelist" :key="index">
            <template #tab>
            <a-row :gutter="12" style="width: 140px; margin: 8px 0" type="flex">
                <a-col >
                   {{ item.title }}
                </a-col>
            </a-row>
            </template>
            <h2 class="subtitle"> {{ subtitle }} </h2>
            <linechart :lineChartId="item.id" :width="linewidth" :height="lineheight" :dimensions="item.dimensions" :source="item.source"></linechart>
        </a-tab-pane>
        </a-tabs>
    </div>
</template>
<script>
import linechart from '@/components/charts/linecharts';
export default {
        name: "tablist",
        components: {
            linechart
        },
        props: {
            subtitle: {
                type: String,
                default () {
                    return '';
                }
            },
            activekey: {
                type: Number,
                default () {
                    return 0;
                }
            },
            panelist: {
                type: Array,
                default () {
                    return [];
                }
            }
        },
        data () {
            return {
                mode: 'top',
                lineheight: '250px',
                linewidth: '100%',
                lineoption: {}
            }
        },
        created() {},
        methods: {
            callback(val) {
            console.log(val);
            },
        },
        mounted () {
        }
    }
</script>
<style lang="less" scoped>
.subtitle {
    color: rgba(0, 0, 0, 0.85);
    font-weight: 500;
    font-size: 14px;
    white-space: nowrap;
    text-align: left;
}

</style>