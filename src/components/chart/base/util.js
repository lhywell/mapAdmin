const util = {
    /**
    * 深度拷贝
    * @param {Object} obj1
    * @param {Object} obj2
    * @returns Object
    */
    mergeRecursive: (obj1, obj2) => {
        for (let p in obj2) {
            try {
                if (obj2[p].constructor === Object) {
                    if (!obj1[p]) {
                        obj1[p] = {}
                    }
                    obj1[p] = util.mergeRecursive(obj1[p], obj2[p])
                } else {
                    obj1[p] = obj2[p]
                }
            } catch (e) {
            }
        }
        return obj1;
    }
};
export default util;