/**
 * 静态图片服务器地址
 */
const $static = 'http://www.wulihub.com.cn/go/JPVkkW/';

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
 * @param {BMap.Point} point - 实例一个经纬度坐标点.
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
 * 画图标.
 * @param {number} type - 类型.
 * 已开门店包括点和围栏,并且定义类型为1
 * 意向门店包括点和围栏,并且定义类型为2
 * 增益品牌的点,并且定义类型为3
 * 竞品品牌的点,并且定义类型为4
 * 已开门店hover效果,并且定义类型为5
 * 意向门店hover效果,并且定义类型为6
 * 增益品牌hover效果,并且定义类型为7
 * 竞品品牌hover效果,并且定义类型为8
 */
export function drawIcon(type) {
    let icon;
    switch (type) {
        case 1:
            icon = new BMap.Icon($static + "/dot_mine.png", new BMap.Size(24, 24));
            icon.setImageSize(new BMap.Size(24, 24));
            break;
        case 2:
            icon = new BMap.Icon($static + "/choose-stores.png", new BMap.Size(27, 27));
            icon.setImageSize(new BMap.Size(27, 27));
            break;
        case 3:
            icon = new BMap.Icon($static + "/dot_zy.png", new BMap.Size(24, 24));
            icon.setImageSize(new BMap.Size(24, 24));
            break;
        case 4:
            icon = new BMap.Icon($static + "/dot_pc.png", new BMap.Size(24, 24));
            icon.setImageSize(new BMap.Size(24, 24));
            break;
        case 5:
            icon = new BMap.Icon($static + "/dot_mine.png", new BMap.Size(24, 24));
            icon.setImageSize(new BMap.Size(24, 24));
            break;
        case 6:
            icon = new BMap.Icon($static + "/choose-stores-hover.png", new BMap.Size(27, 27));
            icon.setImageSize(new BMap.Size(27, 27));
            break;
        case 7:
            icon = new BMap.Icon($static + "/dot_zy.png", new BMap.Size(24, 24));
            icon.setImageSize(new BMap.Size(24, 24));
            break;
        case 8:
            icon = new BMap.Icon($static + "/dot_pc.png", new BMap.Size(24, 24));
            icon.setImageSize(new BMap.Size(24, 24));
            break;
    };

    return icon;
}


/**
 * 画标记.
 * @param {BMap.Point} point - 实例一个经纬度坐标点.
 * @param {number} type - 类型.
 * 已开门店包括点和围栏,并且定义类型为1
 * 意向门店包括点和围栏,并且定义类型为2
 * 增益品牌的点,并且定义类型为3
 * 竞品品牌的点,并且定义类型为4
 */
export function drawMarker(point, type) {
    let opts = {};
    switch (type) {
        case 1:
            opts.icon = drawIcon(1);
            break;
        case 2:
            opts.icon = drawIcon(2);
            break;
        case 3:
            opts.icon = drawIcon(3);
            break;
        case 4:
            opts.icon = drawIcon(4);
            break;

    }
    opts.offset = new BMap.Size(0, 0);


    return new BMap.Marker(point, opts);
}

/**
 * 画搜索类图标.
 * @param {number} type - 类型.
 * 搜索的点,并且定义类型为1
 * 搜索点hover效果,并且定义类型为'hover'
 */
export function drawSearchIcon(type) {
    let icon;
    switch (type) {
        case 1:
            icon = new BMap.Icon($static + "/search-choose.png", new BMap.Size(40, 40));
            icon.setImageSize(new BMap.Size(40, 40));
            break;
        case 2:
            icon = new BMap.Icon($static + "/dot_red.png", new BMap.Size(10, 10));
            icon.setImageSize(new BMap.Size(10, 10));
            break;
        case 'hover':
            icon = new BMap.Icon($static + "/dot_red.png", new BMap.Size(12, 12));
            icon.setImageSize(new BMap.Size(12, 12));
            break;
    };

    return icon;
}

/**
 * 画围栏标记.
 * @param {BMap.Point} point - 实例一个经纬度坐标点.
 * @param {number} type - 类型.
 * 搜索的点,并且定义类型为1
 */
export function drawSearchMarker(point, type) {
    let opts = {};
    switch (type) {
        case 1:
            opts.icon = drawSearchIcon(1);
            break;
        case 2:
            opts.icon = drawSearchIcon(2);
            break;

    };
    opts.offset = new BMap.Size(0, 0);


    return new BMap.Marker(point, opts);
}

/**
 * 画搜索类图标.
 * @param {number} type - 类型.
 * 画圆,并且定义类型为1
 * 圈步行,并且定义类型为2
 * 圈驾车,并且定义类型为3
 * 画圆hover效果,并且定义类型为4
 * 圈步行效果,并且定义类型为5
 * 圈驾车效果,并且定义类型为6
 */
export function drawFenceIcon(type) {
    let icon;
    switch (type) {
        case 1:
            icon = new BMap.Icon($static + "/choose-stores.png", new BMap.Size(32, 32));
            icon.setImageSize(new BMap.Size(32, 32));
            break;
        case 2:
            icon = new BMap.Icon($static + "/walk.png", new BMap.Size(32, 32));
            icon.setImageSize(new BMap.Size(32, 32));
            break;
        case 3:
            icon = new BMap.Icon($static + "/car.png", new BMap.Size(32, 32));
            icon.setImageSize(new BMap.Size(32, 32));
            break;
        case 4:
            icon = new BMap.Icon($static + "/choose-stores-hover.png", new BMap.Size(32, 32));
            icon.setImageSize(new BMap.Size(32, 32));
            break;
        case 5:
            icon = new BMap.Icon($static + "/walk-hover.png", new BMap.Size(32, 32));
            icon.setImageSize(new BMap.Size(32, 32));
            break;
        case 6:
            icon = new BMap.Icon($static + "/car-hover.png", new BMap.Size(32, 32));
            icon.setImageSize(new BMap.Size(32, 32));
            break;
    };

    return icon;
}

/**
 * 画围栏标记.
 * @param {BMap.Point} point - 实例一个经纬度坐标点.
 * @param {number} type - 类型.
 * 画圆,并且定义类型为1
 * 圈步行,并且定义类型为2
 * 圈驾车,并且定义类型为3
 */
export function drawFenceMarker(point, type) {
    let opts = {};
    switch (type) {
        case 1:
            opts.icon = drawFenceIcon(1);
            break;
        case 2:
            opts.icon = drawFenceIcon(2);
            break;
        case 3:
            opts.icon = drawFenceIcon(3);
            break;

    };
    opts.offset = new BMap.Size(0, 0);


    return new BMap.Marker(point, opts);
}
