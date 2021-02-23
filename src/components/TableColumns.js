/**
 * @file TableColumns Functional Components
 */
function convertTextToHtml(text) {
    return text.replace(/\\n/gi, '\n').replace(/<br\s*\/?>/gi, '\n');
}
const CrashStackCell = {
    template: `
        <Tooltip :max-width="800" transfer>
            <Icon type="md-eye"/>
            <div :style="style" slot="content">
                <a href="javascript:void(0);" @click="onCopy">复制到剪贴板</a>
                <div>{{convertTextToHtml(text)}}</div>
            </div>
        </Tooltip>
    `,
    data() {
        return {
            style: {
                textAlign: 'left',
                maxHeight: '300px',
                overflow: 'auto'
            }
        };
    },
    props: ['text'],
    methods: {
        convertTextToHtml,
        onCopy() {
            this.$copyText(this.text);
            this.$Message.success('复制成功!');
        }
    }
};
export default class TableColumns {
    static getColumns(context) {
        const columns = [
            {
                key: 'id',
                title: 'ID',
                width: '50px',
                align: 'center'
            },
            {
                key: 'level',
                title: '级别',
                width: '70px',
                align: 'center'
            },
            {
                key: 'service',
                title: '异常service',
                width: '300px',
                align: 'center'
            },
            {
                key: 'kpi',
                title: '异常KPI',
                width: '200px',
                align: 'center'
            },
            {
                key: 'daily',
                title: '关键日志',
                width: '100px',
                render: (h, params) => {
                    return h(CrashStackCell, {
                        props: {
                            text: params.row.daily
                        }
                    });
                },
                align: 'center'
            },
            {
                title: '关键路径',
                width: '100px',
                render: (h, params) => {
                    return h('Button', {
                        props: {
                            size: 'small',
                        },
                        domProps: {
                            innerHTML: '查看'
                        },
                        on: {
                            click: () => {
                                context.showStackAnalysisModal(params.row, params.index);
                            }
                        }
                    });
                },
                align: 'center'
            },
            {
                key: 'time',
                title: '发生时间',
                width: '150px',
                align: 'center'
            },
            {
                key: 'action',
                title: '操作',
                minWidth: 100,
                align: 'center'
            }
        ];
        return columns.filter(item => {
            // 当某个column定义了if值,则当if的返回值为false时,不返回这个column
            return !(item.if !== undefined && !item.if);
        });
    }
}