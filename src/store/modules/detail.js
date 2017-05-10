/**
 * created by zhangf 2017-01-22
 */
import api from '../../api/api';
import * as types from '../mutation-types';

const state = {
    detail:{
    	docexdetailVO: {},
    	docexdetailContent: {},
        docexdetailOpinion: {},
        docexdetailAttachs: {},
        docexdetailOperations: {},
        isShowReplyPage: false,
        opinionSaveStatus: {},
        fiishStatus: ""
    },
};

const initParams = {
    startOfOpinion: 0,
    pageSize: 12,
    rn : 0
};

const getters = {
    detailDocexdetailVO: state => state.detail.docexdetailVO,
    detailContentOfTodo: state => state.detail.docexdetailContent,
    docexdetailOpinionOfTodo: state => state.detail.docexdetailOpinion,
    doecedetailAttachsOfTodo: state => state.detail.docexdetailAttachs,
    docexdetailOperations: state => state.detail.docexdetailOperations,
    docexdetailIsShowReplyPage: state => state.detail.isShowReplyPage,
    docexdetailOpinionSaveStatus: state => state.detail.opinionSaveStatus,
    docexFinishStatus: state => state.detail.fiishStatus
};

const actions = {
	/**
	 * [detailLoadOfTodo 获取详情的相关信息] 
	 * @param  {[type]} options.commit [description]
	 * @param  {[type]} docexId         [待办项目ID]
	 * @return {[type]}                [description]
	 */
	detailLoadOfTodo ({ dispatch, commit }, docexId) {
        api.loadDetailOfTodo(docexId, function (res) {
            commit(types.DETAIL_GETTODO_SUCCESS, { res })
            var {fileType} = res
            // console.log({res})
            console.log(fileType)
            dispatch('detailGetContentOfTodo', {docexId, fileType})
        });
    },

    /**
     * [detailGetContentOfTodo 获取详情的正文内容]
     * @param  {[type]} options.commit [description]
     * @param  {[type]} docexId        [待办项目ID]
     * @param  {[type]} fileType       [待办项目正文类型： ‘1’为文本类型]
     * @return {[type]}                [description]
     */
    detailGetContentOfTodo({dispatch, commit}, {docexId, fileType}){
        // debugger
    	api.loadDetailContentOfTodo(docexId, fileType, function(res){
    		commit(types.DETAIL_GETTODOCONTENT_SUCCESS, { res })
            dispatch('detailGetOpinion', {docexId, opId : 0, startOfOpinion : 0, pageSize : 12, rn : 0})
    	})
    },

    detailGetOpinion({dispatch, commit},{docexId, opId, startOfOpinion, pageSize, rn}){
        api.loadDetailOpnionOfTodo(docexId, opId, startOfOpinion, pageSize, rn, function(res){
            commit(types.DETAIL_GETTODOOPINION_SUCCESS, { res })
            dispatch('detailGetAttachs', docexId)
        })
    },

    detailGetAttachs({dispatch, commit}, docexId){
        api.loadDetailAttachOfTodo(docexId, function(res){
            commit(types.DETAIL_GETTODOATTACHS_SUCCESS, { res })
            dispatch('detailGetOperations', docexId)
        })
    },

    detailGetOperations({commit}, docexId){
        api.loadDocexOperation(docexId, function(res){
            commit(types.DETAIL_GETOPETATIONS_SUCCESS, { res })
        })
    },

    setIsShowReplyPage({commit}, value){
        commit(types.DETAIL_SETISSHOWREPLYPAGE_SUCCESS, value)
    },

    detailSendOpinion({dispatch, commit}, {docexId, opId, reply_content, isReply}){
        api.saveDetailOpnionOfTodo(docexId, opId, reply_content, isReply, function(res){
            commit(types.DETAIL_REPLYOPINION_SUCCESS, {res})
        })
    },

    detailFinish({commit},docexId) {
        api.finishDetail(docexId, function(res) {
            commit(types.DETAIL_FINISH_SUCCESS, res)
        })
    }
}

const mutations = {

    [types.DETAIL_GETTODO_SUCCESS] (state, { res }) {
        // console.log(res)
    	state.detail.docexdetailVO = res
    },
    [types.DETAIL_GETTODOCONTENT_SUCCESS] (state, { res }) {
    	state.detail.docexdetailContent = res
    },
    [types.DETAIL_GETTODOOPINION_SUCCESS] (state, { res }) {
        state.detail.docexdetailOpinion = res
    },
    [types.DETAIL_GETTODOATTACHS_SUCCESS] (state, { res }) {
        state.detail.docexdetailAttachs = res
    },
    [types.DETAIL_GETOPETATIONS_SUCCESS] (state, { res }) {
        state.detail.docexdetailOperations = res
    },
    [types.DETAIL_SETISSHOWREPLYPAGE_SUCCESS] (state, value) {
        state.detail.isShowReplyPage = value
    },
    [types.DETAIL_REPLYOPINION_SUCCESS] (state, {res}) {
        state.detail.opinionSaveStatus = res
    },
    [types.DETAIL_FINISH_SUCCESS] (state, res) {
        state.detail.fiishStatus = res
    },
}

export default{
    state,
    getters,
    actions,
    mutations
}