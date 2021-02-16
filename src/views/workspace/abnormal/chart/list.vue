<template>
  <div>
    <!-- <BaseTitle content="异常级别" size="default" style="margin-top:-30px;"></BaseTitle> -->
    <BaseTitle content="异常列表" size="default" style="margin-top:-30px;"></BaseTitle>
    <CommonTable
          class="table"
          :dynamicColumns="{show: true, columns: tableColumnsChecked, onChange: commonTableChange}"
          :tableConfig="commonTableConfig">
    </CommonTable>
  </div>
</template>
<script>
import BaseTitle from '@/components/BaseTitle';
import CommonTable from '@/components/CommonTable';
import TableColumns from '@/components/TableColumns';
export default {
    name:'abnormal',
    components: {
        BaseTitle,
        CommonTable
    },
    data () {
      return {
      }

    },
    computed: {
       tableColumnsChecked() {
                const tableColumnsChecked = JSON.parse(this.$utils.getLocalStorage('tableColumns')) 
                || TableColumns.getColumns(this).map(column => column.title);
                return tableColumnsChecked;
        },
       commonTableConfig() {
            return {
                props: {
                    columns: TableColumns.getColumns(this),
                    data: []
                }
            };
      }
    },
    methods: {
          commonTableChange(columns) {
                this.$utils.setLocalStorage('tableColumns', JSON.stringify(columns));
            },
     }
}
</script>
<style lang="less" scoped>

</style>