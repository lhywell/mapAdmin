import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import getters from './getters'
import * as mutations from './mutations'

import map from './modules/map'
import chart from './modules/chart'
Vue.use(Vuex)

const state = {}

export default new Vuex.Store({
    state,
    actions,
    getters,
    mutations,
    modules: {
        map,
        chart
    }
})
