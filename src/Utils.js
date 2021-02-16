/**
 * @file Web前端项目工具类
 */

import {Message} from 'view-design';

import moment from 'moment';

const echartTypeMap = {
    pie(title) {
        return {
            title: {
                text: title,
                x: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            series: [
                {
                    name: '',
                    type: 'pie',
                    radius: '50%',
                    center: ['50%', '66%'],
                    data: []
                }
            ]
        };
    }
};

export default class Utils {

    /**
     * 时间戳转时间String
     * @param {number} ts 时间戳
     * @param {Function} formatFunc 字符串模版函数
     * @return {string} 时间显示字符串
     */
    static tsToDateStringFormat(ts, formatFunc) {
        function zeroPrefix(num) {
            return `${num < 10 ? '0' : ''}${num}`;
        }
        let tsInt = typeof ts === 'string' ? parseInt(ts, 10) : ts;
        let date = new Date(tsInt);

        let year = date.getFullYear();
        let month = zeroPrefix(date.getMonth() + 1);
        let day = zeroPrefix(date.getDate());
        let hour = zeroPrefix(date.getHours());
        let minute = zeroPrefix(date.getMinutes());
        let second = zeroPrefix(date.getSeconds());

        if (!formatFunc) {
            return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
        }
        return formatFunc({year, month, day, hour, minute, second});
    }

    /**
     * 获取时间对象的秒级时间戳
     * @param {*} date 时间对象
     * @return {number} timestamp number
     */
    static getTimeStampSecond(date) {
        return Math.floor(date.getTime() / 1000);
    }

    /**
     * 获取当前时间的秒级时间戳
     * @return {number} timestamp number
     */
    static getTimeStampNowSecond() {
        return Utils.getTimeStampSecond(new Date());
    }

    /**
     * 获取时间对象的零点日期时间
     * @param {*} date 时间对象
     * @return {Date} date object
     */
    static getDateTimeZero(date) {
        date.setHours(0, 0, 0);
        return date;
    }

    /**
     * 获取时间对象的末点(23:59:59)日期时间
     * @param {*} date 时间对象
     * @return {Date} date object
     */
    static getDateTimeEnd(date) {
        date.setHours(23, 59, 59);
        return date;
    }

    /**
     * 整数格式转化为千分位格式
     * @param {Number} num
     * @return {String}
     */
    static thousandsSeparator(num = 0) {
        if (typeof num === 'number' || !isNaN(num - '')) {
            const parts = Number(num).toString().split('.');
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            return parts.join('.');
        }

        return num;
    }

    /**
     * 显示错误Message(传入errInfo的code为0或者401时则自动不显示,code为0返回false,不为0返回true,用以业务逻辑判断是否执行后续程序)
     * @param {*} errInfo 错误信息对象
     * @return {boolean} code为0返回false,不为0返回true,用以业务逻辑判断是否执行后续程序
     */
    static showErrorMsg(errInfo = {}) {
        let code = errInfo.code === undefined || errInfo.code === null ? 500 : errInfo.code;
        let errmsg = errInfo.errmsg;
        // code = 0 表示不需要显示errMessage,则返回false,业务视图也不需要因显示errMessage而中断后续逻辑
        if (code === 0) {
            return false;
        }
        if (errmsg == 'success') {
            return false;
        }

        // 打印错误log方便调试
        console.log(errInfo);
        // 401 表示用户未登录,此时页面跳转,不需要显示Message
        if (code === 401) {
            return true;
        }
        Message.error(errInfo.msg || errInfo.errmsg || '未知异常导致加载失败!');
        return true;
    }

    /**
     * setLocalStorage
     * @params {*} name
     * @params {*} value
     */
    static setLocalStorage(name, value) {
        window.localStorage.setItem(name, value);
    }

    /**
     * getLocalStorage
     * @params {*} name
     */
    static getLocalStorage(name) {
        return window.localStorage.getItem(name);
    }

    /**
     * removeLocalStorage
     * @params {*} name
     */
    static removeLocalStorage(name) {
        return window.localStorage.removeItem(name);
    }

    /**
     * clearLocalStorage
     */
    static clearLocalStorage() {
        window.localStorage.clear();
    }

    // 引入moment http://momentjs.cn/
    static moment = moment;

    /**
     * create echart option
     */
    static getEchartOption = type => {
        return echartTypeMap[type];
    }

    /**
     * resolve echart data
     * @params {Object} result
     */
    static resolveEchartOption = result => {
        const series = [];
        const seriesObj = {};
        const date = Object.keys(result.data); // 时间数组
        const title = {
            text: '',
            left: 'center',
            top: '10',
        };
        const yAxis = [];
        const legend = {
            data: [],
            bottom: 0
        };
        const tooltip = {
            trigger: 'axis',
            formatter(params) {
                let result = '';
                params.forEach((element, index) => {
                    const type = seriesObj[element.seriesName].type;
                    const suffix = (type === 'ratio' ? '%' : '');
                    if (index === 0) {
                        result += `${element.name}`;
                    }
                    result += `
                        <br/>
                        ${element.marker}
                        <span style="margin-left: 3px;">${element.seriesName}:</span>
                        <span style="line-height: 12px; margin-left: 3px;">${element.value}${suffix}</span>
                    `;
                });
                return result;
            }
        };
        const xAxis = {
            type: 'category',
            data: date,
            boundaryGap: false
        };

        date.forEach(key => {
            const target = result.data[key];
            const desc = result.desc || {};
            Object.keys(target).forEach(targetKey => {
                if (!seriesObj[targetKey]) {
                    seriesObj[targetKey] = {
                        type: desc[targetKey] ? desc[targetKey].type : 'value',
                        data: []
                    };
                }

                const value = target[targetKey];
                seriesObj[targetKey].data.push(value);
            });
        });

        /**
         * 判断是否存在多种类型: ratio value
         */
        let seriesType = [];
        Object.keys(seriesObj).forEach(key => {
            const target = seriesObj[key];
            legend.data.push(key);
            seriesType.push(target.type);
            const result = {
                name: key,
                type: 'line',
                data: target.data
            };

            series.push(result);
        });
        seriesType = Array.from(new Set(seriesType));

        if (seriesType.length === 1) {
            // 只有一种类型
            const yAxisItem = {
                type: 'value'
            };
            if (seriesType[0] === 'ratio') {
                yAxisItem.name = '%';
            }
            yAxis.push(yAxisItem);
        }
        else {
            // 两种类型
            yAxis.push({
                type: 'value'
            }, {
                type: 'value',
                max: 100,
                name: '%'
            });

            series.forEach(serie => {
                if (seriesObj[serie.name].type === 'ratio') {
                    serie.yAxisIndex = 1;
                }
                else {
                    serie.yAxisIndex = 0;
                }
            });
        }

        const options = {
            title,
            legend,
            tooltip,
            xAxis,
            yAxis,
            series
        };

        return options;
    }

    /**
     * resolve filter data
     * @params {Object} filterValue
     */
    static resolveFilterValue = filterValue => {
        const data = {};
        Object.keys(filterValue).forEach(key => {
            const value = filterValue[key];
            if (value === 0 || value) {
                data[key] = value;
            }
        });
        return data;
    };
}