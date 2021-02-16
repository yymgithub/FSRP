<script>
    export default {
        name: 'CommonTable',
        props: {
            /**
             * @props dynamicColumns 动态列设置 [Object]
             *     columns 默认行, 默认全选 [Array]
             *     onChange 修改函数 [Function]
             * @props tableConfig 表格属性设置 [Object]
             *     props 属性 [Object]
             *     on 事件 [Object]
             *     详细请看vue render
            */
            dynamicColumns: {
                type: Object,
                default() {
                    return {
                        show: false
                    };
                }
            },
            tableConfig: {
                type: Object,
                default() {
                    return {
                        props: {
                            columns: [],
                            data: []
                        }
                    };
                }
            }
        },
        data() {
            return {
                tableColumnsChecked: []
            };
        },
        computed: {
            isDynamicColumns() {
                return this.dynamicColumns.show;
            },
            tableColumnsTitle() {
                return this.tableConfig.props.columns.map(column => column.title);
            },
            dynamicTableConfig() {
                return {
                    ...this.tableConfig,
                    props: {
                        ...this.tableConfig.props,
                        columns: this.tableConfig.props.columns.filter(column => this.tableColumnsChecked.includes(column.title))
                    }
                }
            }
        },
        created() {
            if (this.isDynamicColumns) {
                this.tableColumnsChecked = this.dynamicColumns.columns
                    || this.tableConfig.props.columns.map(column => column.title);
            }
        },
        methods: {
            checkboxChange(columns, func) {
                (typeof func === 'function') && func(columns);
                this.tableColumnsChecked = columns;
            }
        },
        render() {
            const {isDynamicColumns, tableColumnsTitle, dynamicColumns, dynamicTableConfig, tableColumnsChecked} = this;
            return (
                <div class="common-table">
                    {
                        isDynamicColumns
                            ?   (
                                <section class="checkboxs-wrap">
                                    <CheckboxGroup
                                        value={tableColumnsChecked}
                                        on-on-change={columns => {
                                            this.checkboxChange(columns, dynamicColumns.onChange)
                                        }}>
                                        <span class="checkboxs-title">显示字段</span>
                                        {
                                            tableColumnsTitle.map(column => <Checkbox label={column}>{column}</Checkbox>)
                                        }
                                    </CheckboxGroup>
                                </section>
                            )
                            : null
                    }
                    <Table {...dynamicTableConfig}></Table>
                </div>
            );
        }
    };
</script>

<style lang="less" scope>
    .common-table {
        .checkboxs-wrap {
            margin-bottom: 5px;

            .checkboxs-title {
                margin-right: 10px;
                font-size: 12px;
            }

            .checkboxs-title::after {
                content: ':'
            }
        }
    }
</style>