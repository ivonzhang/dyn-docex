/**
* created by zhangf 2016-12-29
*/
import api from '../../api/api';
import * as types from '../mutation-types';


const state = {
    index:{
        list:[],
        doneList:[],
        listType: 'todo',
        continueToLoad: true
    },
};

const getters = {
    indexListData: state => state.index.list,
    indexDoneList: state => state.index.doneList,
    indexListType: state => state.index.listType,
    indexContinueToLoad: state => state.index.continueToLoad,
};

const actions = {
     /*
     * 获取首页列表
     * */
    indexGetList ({ commit }, params) {
        const pageSize = params.pageSize;
        api.getIndexListData(params, function (res) {
            if(res.length < pageSize){
                 commit(types.INDEX_RESET_CONTINUETOLOAD_SUCCESS, false)
            }
            commit(types.INDEX_GET_LIST_SUCCESS, { res })
        });
    },
    /*
    * 获取首页已办列表
    **/
    indexGetDoneList({commit}, params){
        const pageSize = params.pageSize;
        api.getDocexsOfMyDraftOrMySent(params, function(res){
            if(res.length < pageSize){
                 commit(types.INDEX_RESET_CONTINUETOLOAD_SUCCESS, false)
            }
            commit(types.INDEX_GET_DONELIST_SUCCESS, {res})
        });
    },
    /*获取首页列表类型： todo done*/
    indexSetListType({commit}, type){
        commit(types.INDEX_SET_DONELISTTYPE_SUCCESS, type)
    },
    /*重置首页代办列表数据集*/
    resetIndexListData({commit}){
        commit(types.INDEX_RESET_LISTDATA_SUCCESS)
    },
    /*重置已办列表数据集*/
    resetIndexDoneListData({commit}){
        commit(types.INDEX_RESET_DONELISTDATA_SUCCESS)
    },
    /*检验是否还需要继续加载*/
    setIndexContinueToLoad({commit}, value){
        commit(types.INDEX_RESET_CONTINUETOLOAD_SUCCESS, value)
    }
}

const mutations = {
    [types.INDEX_GET_LIST_SUCCESS] (state, { res }) {
        for(var docex of res){
            state.index.list.push(docex)
        }
        // state.index.list = res;
        state.index.listType = 'todo';
    },
    [types.INDEX_GET_DONELIST_SUCCESS] (state, { res }) {
        for(var docex of res){
            state.index.doneList.push(docex)
        }
        //state.index.list = res;
        // state.index.listType = 'done';
    },
    [types.INDEX_SET_DONELISTTYPE_SUCCESS] (state, type) {
        state.index.listType = type
    },
    [types.INDEX_RESET_LISTDATA_SUCCESS] (state) {
        state.index.list = []
    },
    [types.INDEX_RESET_DONELISTDATA_SUCCESS] (state) {
        state.index.doneList = []
    },
    [types.INDEX_RESET_CONTINUETOLOAD_SUCCESS] (state, value) {
        state.index.continueToLoad = value
    },

};


export default{
    state,
    getters,
    actions,
    mutations
}