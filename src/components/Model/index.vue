<template>
    <div>
         <a-drawer
            :title="modelData.title"
            placement="right"
            width="330"
            :closable="true"
            :visible="visible"
            :after-visible-change="afterVisibleChange"
            @close="onClose"
        >
            <a-row :gutter="16">
                <a-col :span="8">
                    <a-statistic title="CPU使用率" :value="modelData.cpu">
                        <template #suffix>
                        <span>%</span>
                        </template>
                    </a-statistic>
                </a-col>
                <a-col :span="8">
                    <a-statistic title="内存使用率" :value="modelData.ram">
                        <template #suffix>
                        <span>kb/s</span>
                        </template>
                    </a-statistic>
                </a-col>
                <a-col :span="8">
                    <a-statistic title="读速率" :value="modelData.read">
                        <template #suffix>
                        <span>kb/s</span>
                        </template>
                    </a-statistic>
                </a-col>
            </a-row>
            <a-row :gutter="16">
                <a-col :span="8">
                    <a-statistic title="写速率" :value="modelData.write">
                        <template #suffix>
                        <span>kb/s</span>
                        </template>
                    </a-statistic>
                </a-col>
                <a-col :span="8">
                    <a-statistic title="上行速率" :value="modelData.read">
                        <template #suffix>
                        <span>kb/s</span>
                        </template>
                    </a-statistic>
                </a-col>
                <a-col :span="8">
                    <a-statistic title="下行速率" :value="modelData.write">
                        <template #suffix>
                        <span>kb/s</span>
                        </template>
                    </a-statistic>
                </a-col>
            </a-row>
            <a-divider dashed />
            <Tablist :subtitle="'CPU&内存'" :panelist="master.cpu"></Tablist>
        </a-drawer>
    </div>
</template>
<script>
import Tablist from '@/components/Tablist';
export default {
    name: 'Model',
    components: {
        Tablist
    },
    props: {
        visible: Boolean,
        afterVisibleChange: Function,
        onClose: Function,
        modelData: {
            title: String,
            cpu: String,
            ram: String,
            read: String,
            write: String,
            up: String,
            down: String
        }
    },
    data () {
        return {
            masterList:[
                {
                    title: '内存使用率',
                    suffix: '%',

                }

            ]
        }
    },
    created() {
         // 主机指标信息
        this.$http.get('/data/masterdata.json').then((res) => {
              if (res.data.code === 200) {
                  this.master = res.data.data;
              }
        });
    }
};
</script>
<style lang="less" scoped>
.bold {
    font-size: 14px;
    font-weight: 550;
    margin-right: 5px;
    margin-bottom: 10px;
}
</style>