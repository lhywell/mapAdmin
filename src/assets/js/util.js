/**
 * 静态图片服务器地址
 */
const $static = 'http://www.wulihub.com.cn/go/JPVkkW/';

/**
 * 立得空间的key-用于等时圈
 */
const LD_key = '78cfc4737cfd8ff1bb62357347c76b7d';

import * as draw from './draw'
import * as LD from './LD'

const brandPositionList = [{
    value: '奢侈',
    label: '奢侈'
}, {
    value: '轻奢侈',
    label: '轻奢侈'
}, {
    value: '大众',
    label: '大众'
}, {
    value: '廉价',
    label: '廉价'
}];

const maxTableColumnLength = 10;

const getAccessToken = () => {
    return localStorage.getItem('access_token')
}

//构造request请求
const makeRequest = (config) => {
    //url可根据环境配置或者config传入
    var url = '';
    const defaults = {
        method: 'get',
        url: url,
        // headers: {
        //     'authorization': (getAccessToken())
        // },
    };
    const request = _.merge(defaults, config);
    // const ax = this.$axios(request);
    // return ax;
    return request;
}
/**
 * [千位分隔符]
 * @param  {[type]} num [number]
 * @return {[type]}     [number]
 */
const milliFormat = (num) => {
    return num && num.toString()
        .replace(/(^|\s)\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}
/**
 * [格式化时间]
 * @param  {[Date]} date [时间]
 * @return {[String]}      [字符串时间]
 */
const dateFormat = (now) => {
    const year = now.getFullYear(); //得到年份
    let month = now.getMonth() + 1; //得到月份
    let date = now.getDate(); //得到日期
    if (month < 10) {
        month = `0${month}`;
    }
    if (date < 10) {
        date = `0${date}`;
    }
    return `${year}-${month}-${date}`;
}
/**
 * [获取时间的前一天]
 * @param {[new Date]} [now] [当前时间]
 * @return {[Date]} [返回当前时间的前一天]
 */
const preDate = (now = new Date()) => {
    return new Date(now.getTime() - 24 * 60 * 60 * 1000);
}
/**
 * [获取时间的前7天-一周]
 * @param  {Date}   now [当前时间]
 * @return {[Date]}     [返回当前时间的前7天-一周]
 */
const preWeek = (now = new Date()) => {
    return new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000);
}
/**
 * [获取时间的前30天-一个月]
 * @param  {Date}   now [当前时间]
 * @return {[Date]}     [返回当前时间的前30天-一个月]
 */
const preMonth = (now = new Date()) => {
    return new Date(now.getTime() - 29 * 24 * 60 * 60 * 1000);
}
export default Object.assign({
    $static,
    LD_key,
    brandPositionList,
    maxTableColumnLength,
    makeRequest,
    milliFormat,
    dateFormat,
    preDate,
    preWeek,
    preMonth
}, draw, LD)
