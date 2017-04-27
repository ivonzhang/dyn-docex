/**
* created by zhangf 2016-12-29
*/
import api from '../../api/api';
import * as types from '../mutation-types';


const state = {
    user:{
        _user_info: {},
    },
    /*存放服务器信息*/
    server:{
        _class_name: 'cn.firstsoft.firstframe.plugins.dyn.docex.service.DocexService',
        _start: 0,
        _page_size: 20,
        _server_url: '',
    },
    source: 'cloud_home'
};

const getters = {
    getUserInfo: state => state.user._user_info,
    getServer: state => state.server,
    settingSource: state => state.source
};

const actions = {
     /*
     * 获取首页列表
     * */
    settingGetInitInfo ({ commit }, type) {
        // commit(types.COMM_LOADING_STATUS,true);
        api.initSettingInfo(function (res) {
            console.log(res)
            commit(types.INIT_SERVER_AND_USER, { res });
        })
    },
}

const mutations = {
    [types.INIT_SERVER_AND_USER] (state, { res }) {
        state.user._user_info = res
         state.source = res.source
    },
    [types.INIT_SETTING_SOURCE] (state, source) {
        state.source = source
    },
};


export default{
    state,
    getters,
    actions,
    mutations
}