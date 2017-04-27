import Vue from 'vue';
import Vuex from 'vuex';
import index from './modules/index'
import setting from './modules/setting'
import detail from './modules/detail'

Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
        index,
        setting,
        detail
    },
    strict: process.env.NODE_ENV !== 'production', //是否开启严格模式
});

export default store;