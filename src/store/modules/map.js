import * as types from '../mutation-types'

const state = {
    newBrandModal: true,
    brandDetailModal: false,
    addBrandModal: false,
    brandModalStyle: {
        height: '100%',
        position: 'absolute',
        bottom: 0,
        top: 0,
        right: 0,
        left: 'auto',
        // 'overflow-y':'auto'
        // transition: 'right,left 2s,2s',
        // '-moz-transition': 'right,left 2s,2s',
        // '-webkit-transition': 'right,left 2s,2s',
        // '-ms-transition': 'right,left 2s,2s',
        // '-o-transition': 'right,left 2s,2s',
    },
    switchShop: true,
    switchBrand: true,
    switchHot: false,
    griddingMapOverlays: '',
    shopCover: false,
    brandCover: false,
    dropDownShop: false,
    circleListener: null,
    walkListener: null,
    driveListener: null,
    currentBrandId: '',
    infoModal: '',
    infoTarget: '',
    fenceRange:false,
    //用于标识意向门店做过删除操作，提示地图需重新获取意向门店数据
    isDeleteIntentionShops:false,
    userId:1000
}

const getters = {
    newBrandModal: state => state.newBrandModal,
    brandDetailModal: state => state.brandDetailModal,
    addBrandModal: state => state.addBrandModal,
    brandModalStyle: state => state.brandModalStyle,
    switchShop: state => state.switchShop,
    switchBrand: state => state.switchBrand,
    switchHot: state => state.switchHot,
    griddingMapOverlays: state => state.griddingMapOverlays,
    shopCover: state => state.shopCover,
    brandCover: state => state.brandCover,
    dropDownShop: state => state.dropDownShop,
    circleListener: state => state.circleListener,
    walkListener: state => state.walkListener,
    driveListener: state => state.driveListener,
    currentBrandId: state => state.currentBrandId,
    infoModal: state => state.infoModal,
    infoTarget: state => state.infoTarget,
    fenceRange: state => state.fenceRange,
    isDeleteIntentionShops: state => state.isDeleteIntentionShops
}

const mutations = {
    [types.SWITCH_NEW_BRAND_MODAL]: (state, payload) => {
        state.newBrandModal = payload.modalState
    },
    [types.SWITCH_BRAND_DETAIL_MODAL]: (state, payload) => {
        state.brandDetailModal = payload.modalState
    },
    [types.SWITCH_ADD_BRAND_MODAL]: (state, payload) => {
        state.addBrandModal = payload.modalState
    },
    [types.CHANGE_BRAND_MODAL_STYLE]: (state, payload) => {
        state.brandModalStyle = payload.modalStyle
    },
    [types.SET_CURRENT_BRAND_ID]: (state, payload) => {
        state.currentBrandId = payload.brandId
    },
    [types.SETSWITCHSHOP]: (state, switchShop) => {
        state.switchShop = switchShop
    },
    [types.SETSWITCHBRAND]: (state, switchBrand) => {
        state.switchBrand = switchBrand
    },
    [types.SETSWITCHHOT]: (state, switchHot) => {
        state.switchHot = switchHot
    },
    [types.SETSGRIDDINGMAPOVERLAYS]: (state, payload) => {
        state.griddingMapOverlays = payload.payload
    },
    [types.SETSHOPCOVER]: (state, shopCover) => {
        state.shopCover = shopCover
    },
    [types.SETBRANDCOVER]: (state, brandCover) => {
        state.brandCover = brandCover
    },
    [types.SETDROPDOWNSHOP]: (state, dropDownShop) => {
        state.dropDownShop = dropDownShop
    },
    [types.SETCIRCLELINSTENER]: (state, circleListener) => {
        state.circleListener = circleListener
    },
    [types.SETWALKLINSTENER]: (state, walkListener) => {
        state.walkListener = walkListener
    },
    [types.SETDRIVELINSTENER]: (state, driveListener) => {
        state.driveListener = driveListener
    },
    [types.SETSELFMODAL]: (state, { infoModal, infoTarget }) => {
        state.infoModal = infoModal
        state.infoTarget = infoTarget
    },
    [types.SETCHECKBOXRANG]: (state, fenceRange) => {
        state.fenceRange = fenceRange
    },
    [types.ISDELETEINTENTIONSHOPS]: (state, payload) => {
        state.isDeleteIntentionShops = payload.isDeleteIntentionShops
    }
}

const actions = {
    //是否显示新建品牌对话框
    swtichNewBrandModal({ commit }, payload) {
        commit(types.SWITCH_NEW_BRAND_MODAL, payload);
    },
    //是否显示品牌配置对话框
    swtichBrandDetailModal({ commit }, payload) {
        commit(types.SWITCH_BRAND_DETAIL_MODAL, payload);
    },
    changeBrandModalStyle({ commit }, payload) {
        commit(types.CHANGE_BRAND_MODAL_STYLE, payload);
    },
    setCurrentBrandId({ commit }, payload) {
        commit(types.SET_CURRENT_BRAND_ID, payload);
    },
    // swtichAddBrandModal({ commit }, payload) {
    //     commit(types.SWITCH_ADD_BRAND_MODAL, payload);
    // },
    setSwitchShop({ commit }, switchShop) {
        commit(types.SETSWITCHSHOP, switchShop);
    },
    setSwitchBrand({ commit }, switchBrand) {
        commit(types.SETSWITCHBRAND, switchBrand);
    },
    setSwitchHot({ commit }, switchHot) {
        commit(types.SETSWITCHHOT, switchHot);
    },
    setGriddingMapOverlays({ commit }, payload) {
        commit(types.SETSGRIDDINGMAPOVERLAYS, payload);
    },
    setShopCover({ commit }, shopCover) {
        commit(types.SETSHOPCOVER, shopCover);
    },
    setBrandCover({ commit }, brandCover) {
        commit(types.SETBRANDCOVER, brandCover);
    },
    setDropDownShop({ commit }, dropDownShop) {
        commit(types.SETDROPDOWNSHOP, dropDownShop);
    },
    setCircleListener({ commit }, circleListener) {
        commit(types.SETCIRCLELINSTENER, circleListener);
    },
    setWalkListener({ commit }, walkListener) {
        commit(types.SETWALKLINSTENER, walkListener);
    },
    setDriveListener({ commit }, driveListener) {
        commit(types.SETDRIVELINSTENER, driveListener);
    },
    setSelfModal({ commit }, { infoModal, infoTarget }) {
        commit(types.SETSELFMODAL, { infoModal, infoTarget });
    },
    setCheckboxRang({ commit }, fenceRange) {
        commit(types.SETCHECKBOXRANG, fenceRange);
    },
    //删除意向店铺
    setDeleteIntentionShops({ commit }, payload) {
        commit(types.ISDELETEINTENTIONSHOPS, payload);
    }
}



export default {
    state,
    getters,
    actions,
    mutations
}
