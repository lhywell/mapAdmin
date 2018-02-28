/**
 * 静态图片服务器地址
 */
const $static = 'http://smartdata.b0.upaiyun.com/thinkmark';

/**
 * 实例化一个经纬度坐标.
 * @param {Number} lng - 经度坐标.
 * @param {Number} lat - 纬度坐标.
 */
export function drawLngLat(lng, lat) {
    return new BMap.Point(lng, lat);
}


/**
 * 配置.
 */
let drawOption = {
    fillColor: '#FF0000',
    fillOpacity: 0.1,
    strokeStyle: 'solid',
    strokeColor: "#FF0000",
    strokeWeight: 1,
    enableClicking: true
}


/**
 * 画圆.
 * @param {position} lng - 矩形区域的西南角经纬度坐标.
 * @param {position} lat - 矩形区域的东北角经纬度坐标.
 * @param {number} radius - 矩形区域的透明度值.
 */
export function drawCircle(point, radius) {
    var opts = {};

    opts.fillColor = drawOption.fillColor;
    opts.fillOpacity = drawOption.fillOpacity;
    opts.strokeStyle = drawOption.strokeStyle;
    opts.strokeColor = drawOption.strokeColor;
    opts.strokeWeight = drawOption.strokeWeight;
    opts.enableClicking = drawOption.enableClicking;

    return new BMap.Circle(point, radius, opts);
}

/**
 * 画矩形.
 * @param {position} swstr - 矩形区域的西南角经纬度坐标.
 * @param {position} nestr - 矩形区域的东北角经纬度坐标.
 * @param {number} opacity - 矩形区域的透明度值.
 */
export function drawRect(swstr, nestr, opacity) {
    let opts = new IMAP.RectangleOptions();
    if (opacity == 0.25) {
        opts.fillOpacity = 0.25;
    } else {
        opts.fillOpacity = 0.1;
    }
    opts.fillColor = drawOption.fillColor;
    opts.strokeStyle = drawOption.strokeStyle;
    opts.strokeColor = drawOption.strokeColor;
    opts.strokeWeight = drawOption.strokeWeight;

    return new IMAP.Rectangle(new IMAP.LngLatBounds(swstr, nestr), opts);
}

/**
 * 画多边形.
 * @param {Array} path - 多边形的point数组.
 */
export function drawPolygon(path) {
    let opts = {};
    opts.fillColor = drawOption.fillColor;
    opts.fillOpacity = drawOption.fillOpacity;
    opts.strokeStyle = drawOption.strokeStyle;
    opts.strokeColor = drawOption.strokeColor;
    opts.strokeWeight = drawOption.strokeWeight;
    opts.enableClicking = drawOption.enableClicking;

    return new BMap.Polygon(path, opts);
}


/**
 * 画标注.
 * @param {number} lng - 经度坐标.
 * @param {number} lat - 纬度坐标.
 */
export function drawMarker(point, type) {
    let opts = {};
    switch (type) {
        case 1:
            opts.icon = new BMap.Icon($static + "/dot_blue.png", new BMap.Size(12, 12));
            break;
        case 2:
            opts.icon = new BMap.Icon($static + "/marker.png", new BMap.Size(15, 24));
            break;
        case 3:
            opts.icon = new BMap.Icon($static + "/dot_zi.png", new BMap.Size(12, 12));
            break;
        case 4:
            opts.icon = new BMap.Icon($static + "/dot_yellow.png", new BMap.Size(12, 12));
            break;

    }
    opts.offset = new BMap.Size(0, 0);


    return new BMap.Marker(point, opts);
}
