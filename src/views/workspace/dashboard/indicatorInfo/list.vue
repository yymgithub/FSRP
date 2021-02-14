<template>
  <div>
    <a-row>
      <div style="margin-top:20px">
        <a-card
          style="width:100%"
          :bordered="false"
          :tab-list="tabListNoTitle"
          :active-tab-key="noTitleKey"
          @tabChange="key => onTabChange(key, 'noTitleKey')"
        >
          <p v-if="noTitleKey === '主机A-CPU&内存'">
            主机A-CPU&内存
          </p>
          <p v-else-if="noTitleKey === '主机B-CPU&内存'">
            主机B-CPU&内存
          </p>
          <p v-else>
            主机c-CPU&内存
          </p>
        </a-card>
        </div>
    </a-row>
  </div>
</template>
<script>
// import * as echarts from 'echarts';
export default {
    name:'indicatorInfo',
    components: {
    },
    created() {
    },
    mounted() {
    },
    data() {
        return {
          tabListNoTitle: [
            {
              key: '主机A-CPU&内存',
              tab: '主机A-CPU&内存',
            },
            {
              key: '主机B-CPU&内存',
              tab: '主机B-CPU&内存',
            },
            {
              key: '主机C-CPU&内存',
              tab: '主机C-CPU&内存',
            },
            {
              key: '主机A-磁盘读写',
              tab: '主机A-磁盘读写',
            },
            {
              key: '主机B-磁盘读写',
              tab: '主机B-磁盘读写',
            },
            {
              key: '主机C-磁盘读写',
              tab: '主机C-磁盘读写',
            },
          ],
          key: '主机A-CPU&内存',
          noTitleKey: '主机A-CPU&内存',
        };
    },
    methods: {
       onTabChange(key, type) {
          console.log(key, type);
          this[type] = key;
        }
    }
}
</script>
<style lang="less" scoped>
.nowinfo {
  display: flex;
  justify-content: center;
  .icon {
    font-size: 18px;
  }
}
  
</style>