let chartUtil = {

};
/**
 * 深度拷贝
 * @param {Object} obj1
 * @param {Object} obj2
 * @returns Object
 */
chartUtil.mergeRecursive = (obj1, obj2) => {
    for (let p in obj2) {
        try {
            if (obj2[p].constructor === Object) {
                if (!obj1[p]) {
                    obj1[p] = {}
                }
                obj1[p] = chartUtil.mergeRecursive(obj1[p], obj2[p])
            } else {
                obj1[p] = obj2[p]
            }
        } catch (e) {

        }
    }
    return obj1;
}
/**
 * 计算一组数据各占百分比
 * @param {Array|Object} data 
 */
chartUtil.scale = (data = [], dataTotal) => {
    const type = Object.prototype.toString.call(data) === '[object Array]' ? 1 : 0;
    const fromData = type ? data : Object.values(data);
    const total = fromData.reduce((sum, value) => {
        return sum + (Object.prototype.toString.call(value) === '[object Number]' ? value : 0);
    }, 0);
    let scale = fromData.map((item) => {
        return !total ? 0 : ((item / (dataTotal || total)) * 100).toFixed(2);
    });
    return type ? scale : (() => {
        let newData = {};
        Object.keys(data).forEach((item, index) => {
            newData[item] = scale[index];
        });
        return newData;
    })();
}
/**
 * 按照value 排序
 * @param {Object} data 
 * @param {String} asc|dsc 默认升序
 */
chartUtil.objSort = (data = {}, order = 'asc') => {
    const newData = {};
    (Object.keys(data).sort(
        function(a, b) {
            return order === 'asc' ? data[a] < data[b] : data[a] > data[b];
        }
    )).forEach((key) => {
        newData[key] = data[key];
    });
    return newData;
}
chartUtil.CONSUMENAMES = ['高', '中', '低'];
chartUtil.EDUCATIONNAMES = ['专科', '本科', '硕士', '博士', '博士后', '其他'];
/**
 * [转换对象key属性=name属性]
 * @param  {Array}  data  [数据集合]
 * @param  {[Array]} names [名称集合]
 * @return {[Array]}       [转换之后的结果]
 * [{"key":"high","value":30},{"key":"middle","value":45},{"key":"low","value":25}]=[{"name":"high","value":30},{"name":"middle","value":45},{"name":"low","value":25}]
 */
chartUtil.keyConvertName = (data = [], names) => {
    return data.map((item, index) => {
        return {
            name: names ? names[index] : item.key,
            value: item.value
        }
    });
}
export default chartUtil;
