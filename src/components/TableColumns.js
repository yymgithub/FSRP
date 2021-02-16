/**
 * @file TableColumns Functional Components
 */

export default class TableColumns {

    static getColumns() {
        const columns = [
            {
                key: 'id',
                title: 'ID',
                minWidth: 70,
                align: 'center'
            },
            {
                key: 'level',
                title: '级别',
                minWidth: 100,
                align: 'center'
            },
            {
                key: 'service',
                title: '异常service',
                minWidth: 70,
                align: 'center'
            },
            {
                key: 'kpi',
                title: '异常KPI',
                minWidth: 70,
                align: 'center'
            },
            {
                key: 'darly',
                title: '关键日志',
                minWidth: 70,
                align: 'center'
            },
            {
                key: 'path',
                title: '关键路径',
                minWidth: 70,
                align: 'center'
            },
            {
                key: 'time',
                title: '发生时间',
                minWidth: 70,
                align: 'center'
            },
            {
                key: 'action',
                title: '操作',
                minWidth: 70,
                align: 'center'
            }
        ];

        return columns.filter(item => {
            // 当某个column定义了if值,则当if的返回值为false时,不返回这个column
            return !(item.if !== undefined && !item.if);
        });
    }
}