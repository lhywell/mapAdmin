/**
 * 立得空间的key-用于等时圈
 */
const LD_key = '78cfc4737cfd8ff1bb62357347c76b7d';

/**
 * 坐标转换，由一个百度坐标转国测局坐标.
 * @param {number} lng - 经度坐标.
 * @param {number} lat - 纬度坐标.
 */
export function toLD(lng, lat) {
    let point = lng.toString() + ',' + lat.toString();
    let url = 'http://api.ishowchina.com/v3/coord/convert?' + 'coords=' + point + '&from=3&to=2&ak=' + LD_key;
    return url;
}

/**
 * 坐标转换，由国测局坐标转百度坐标.
 * @param {String Array} path - 点坐标集合.
 */
export function toBaidu(path) {
    let url = 'http://api.ishowchina.com/v3/coord/convert?' + 'coords=' + path + '&from=2&to=3&ak=' + LD_key;
    return url;
}

/**
 * 调用立得的到达圈服务.
 * @param {String} location - 中心点坐标.
 * @param {String} type - 类型步行2|驾车1.
 * @param {String} time - 时间.
 */
export function reachrange(location, type, time) {
    let url = 'http://api.ishowchina.com/v3/reachrange?' + "&location=" + location + "&type=" + type + "&time=" + Math.abs(time) + '&ak=' + LD_key;

    if (type == 2) {
        url += "&speed=" + 3; //速度：3千米/每小时
    }
    return url;
}

/**
 * 调用立得的多边面积分析服务.
 * @param {string} bounds - 围栏.
 */
export function getArea(bounds) {
    //bounds必须首尾相连
    let str = '';
    let arr = bounds.split(';')
    if (arr[0] === arr[arr.length - 1]) {
        str = bounds;
    } else {
        str = bounds + ';' + arr[0];
    }
    let url = 'http://api.ishowchina.com/v3/gts/polygonarea?coor=' + str + '&ak=' + LD_key;
    return url;
}
