import * as types from '../mutation-types';

const state = {
    //商店基本信息
    storeInfo: {
        id: '',
        name: '', //商店名称
        coverage: 0, //辐射半径
        serviceArea: 0, //服务区域
    },
    switchPanel: false, //打开关闭右侧
    tabs: [{
            name: '客流洞察',
            value: '1'
        }, {
            name: '人口洞察',
            value: '2'
        },
        // {
        //     name: '消费偏好',
        //     value: '3'
        // },
        {
            name: '区域配套',
            value: '4'
        },
        // {
        //     name: '商铺信息',
        //     value: '5'
        // }
    ],
    selected: '1' //默认选中客流洞察
}
const getters = {
    switchPanel: state => state.switchPanel,
}
const mutations = {
    [types.SET_TABSELECTED]: (state, val) => {
        state.selected = val;
    },
    [types.SET_STOREINFO]: (state, val) => {
        state.storeInfo = val;
    },
    [types.SET_SWITCHPANEL]: (state, val) => {
        state.switchPanel = val;
    },

}

const actions = {
    setTabSelected({ commit }, val) {
        commit(types.SET_TABSELECTED, val);
    },
    setStoreInfo({ commit }, val) {
        commit(types.SET_STOREINFO, val);
    },
    setSwitchPanel({ commit }, val) {
        commit(types.SET_SWITCHPANEL, val);
    },

}



export default {
    state,
    getters,
    actions,
    mutations
}
