/**
* created by zhangf 2016-12-29
*/
require('./util/k3oa-dyn-base.js')
require('./util/k3oa-auth-kdweibo.js')
require('./util/k3oa-auth-weixin.js')
require('./util/k3oa-docex.js')
require('./util/utils.js')
export default {

	serverInfo:{
		// domain: '/api'//配合vue-cli的配置项proxyTable设置代理 先弃用吧
		domain: 'http://172.20.105.112:7890/oa',
		
		/*// 部署在生成环境的时候使用下面的相对路径
		domain: '../../..'*/
	},


	/*以下ajax请求中请求的服务器地址由于跨域问题 已按照http://www.cnblogs.com/JRliu/p/5854738.html帖子中处理过 发布到生成环境时要注意！！！！！！！！！！*/
	initSettingInfo(cb){
		// debugger
		var self = this;
		var querys = $.jQutils.getQuerysOfURL(window.location.href);
		if(querys){
			console.log(querys);
			if (querys.source === 'WX' || querys.source === 'WXQY') {
				$.auth.init(self.serverInfo.domain, function(success, sysdata) {
					if ( success === false ) {
						alert('服务初始化失败: ' + sysdata);
						return;
					}
					
					$.auth.auth({
						userName: decodeURI(querys.userName),
						token: querys.token,
						time: querys.time
					}, function(success, data) {
						if ( success === true ) {
							$.kdk3oa.init(self.serverInfo.domain, {
								id: data.id,
								name: data.name
							});
							data.source = querys.source;
							cb.apply(null,[data]);
							// setTimeout(() => cb(data), 100)
						} else {
							alert(JSON.stringify(data));
						}
					});
				});
			}else if(querys.source === 'cloud_home'){

			}

		}else{
			alert("请求地址参数不正确，请前往管理控制台正确配置轻应用后再访问");
		}
		
	},


	/****************************************/
	/*首页页面请求*/
	/****************************************/

	/*获取待办列表*/
	getIndexListData(params, cb){
		$.kdk3oa.loadDocexs(params.start, params.pageSize, params.inboxId, function(list) {
			// console.log(list.docexFiledtVOs);
			cb.apply(null,[list.docexFiledtVOs]);
			/*$.stopLoading();
			$.displayDocexs();*/
		}, function(error) {
			// $.stopLoading();
			alert('加载失败: ' + error);
		});
	},

	/*获取已办列表：type为 myDraft我发起的； mySent我经办的*/
	getDocexsOfMyDraftOrMySent(params, cb){
		$.kdk3oa.loadDocexsOfMyDraftOrMySent(params.start, params.pageSize, params.type , params.strKey ,function(list) {
			cb.apply(null,[list.docexFiledtVOs]);
			// $.stopLoading();
			// $.displayDocexs();
		}, function(error) {
			$.stopLoading();
			alert('加载失败: ' + error);
		});
	},


	/****************************************/
	/*详情页面请求*/
	/****************************************/

	/**
	 * [loadDetailOfTodo description]获取代办详情信息：标题 发起人 时间等等
	 * @param  {[type]}   docexId [description]
	 * @param  {Function} cb      [description]
	 * @return {[type]}           [description]
	 */
	loadDetailOfTodo(docexId, cb){
		$.kdk3oa.loadDetailOfTodo(docexId, function(docexdetail){
			cb.apply(null,[docexdetail]);
		}, function(error) {
			//$.stopLoading();
			alert('加载失败: ' + error);
		});
	},

	/**
	 * [loadDetailContentOfTodo description]获取待办详情的正文
	 * @param  {[type]}   docexId [description]
	 * @param  {[type]}   fileType [description]
	 * @param  {Function} cb      [description]
	 * @return {[type]}           [description]
	 */
	loadDetailContentOfTodo(docexId, fileType, cb) {
		// debugger
		if(fileType === '1'){//如果是FCK编辑的正文
			$.kdk3oa.loadDetailContentOfTodo(docexId, function(content) {
				cb.apply(null,[content]);
			}, function(error) {
				//$.stopLoading();
				alert('加载失败: ' + error);
			});
		}else{//如果是weboffice编辑的正文
			// $.loadDetailOpnionOfTodo();
		}
	},

	/**
	 * [loadDetailOpnionOfTodo 获取意见列表]
	 * @param  {[type]} docexId        [待办项目ID]
	 * @param  {[type]} opId           [反馈意见id 客户端传过来初始为0]
	 * @param  {[type]} startOfOpinion [分页起始0]
	 * @param  {[type]} pageSize       [分页大小12]
	 * @param  {[type]} rn             [初始值0]
	 * @return {[type]}                [description]
	 */
	loadDetailOpnionOfTodo(docexId, opId, startOfOpinion, pageSize, rn, cb){
		$.kdk3oa.loadDetailOpnionOfTodo(docexId, opId, startOfOpinion, pageSize, rn, function(opinion) {
			cb.apply(null,[opinion]);
			// $._docex_opinion = opinion;
			// $._docex_attachlistOfReply = opinion.docexFileOptionVOs.docexFileAttachAllVO;
			// $.loadDetailAttachOfTodo();
			//$.stopLoading();
		}, function(error) {
			//$.stopLoading();
			alert('加载失败: ' + error);
		});
	},

	/*获取附件列表*/
	loadDetailAttachOfTodo: function(docexId, cb) {
		$.kdk3oa.loadDetailAttachOfTodo(docexId, function(attachlist) {
			cb.apply(null,[attachlist]);
			// $._docex_attachlist = attachlist.docexFileAttachVOs;
			// $.loadDocexOperation();
		}, function(error) {
			//$.stopLoading();
			alert('加载失败: ' + error);
		});
	},

	/*获取节点操作*/
	loadDocexOperation: function(docexId, cb) {
		$.kdk3oa.loadDocexOperation(docexId, function(operation) {
			cb.apply(null,[operation]);
			// $._docex_operation = operation.operationVOs;
			// $.stopLoading();
			// $.displayDocexdetail();
		}, function(error) {
			//$.stopLoading();
			// $('div.page-loading').css('display', 'none');
			alert('加载失败: ' + error);
		});
	},

	/**
	 * [saveDetailOpnionOfTodo 回复意见操作]
	 * @param  {[type]}   docexId       [详情id]
	 * @param  {[type]}   opId          [默认0]
	 * @param  {[type]}   reply_content [回复的意见]
	 * @param  {Boolean}  isReply       [默认0]
	 * @param  {Function} cb            [callback]
	 * @return {[type]}                 [description]
	 */
	saveDetailOpnionOfTodo(docexId, opId, reply_content, isReply, cb){
		// debugger
		$.kdk3oa.saveDetailOpnionOfTodo(docexId, opId, reply_content, isReply, function(opinionSaveStatus) {
			cb.apply(null,[opinionSaveStatus]);
			// var u = navigator.userAgent, app = navigator.appVersion;
			// var isIPhone = u.indexOf('iPhone') > -1;//是否为iPhone或者QQHD浏览器
			//轻应用用户体验改造后 iPhone和Android采用统一回复样式 add by fa_zhang 2015-10-28
			/*isIPhone = false;
			if(opinionSaveStatus.success == "1"){
				// $._params.attach_count = 0;
				// $(".attach_list").remove();
				//alert($._docex_fileSaveOptionSuccVO.msg);
				// $.showCustomAlert($._docex_fileSaveOptionSuccVO.msg);
				
				//回复成功后，上传附件
				// $.saveDocexFileAttachs4KOA(${param.id});
				
			}else{
				//alert($._docex_fileSaveOptionSuccVO.msg);
				// $.showCustomAlert($._docex_fileSaveOptionSuccVO.msg);
			}*/
			//$.loadDetailAttachOfTodo();
			//$.stopLoading();
		}, function(error) {
			// $.stopLoading();
			alert('加载失败: ' + error);
		});
	},

	finishDetail(docexId, cb) {
		$.kdk3oa.finishDetail(docexId, function(result) {
			cb.apply(null,[result])
		}, function(error) {
			// $.stopLoading();
			alert('请求失败: ' + error);
		});
	},

	endDetail(docexId, cb) {
		$.kdk3oa.endDetail(docexId, function(result) {
			cb.apply(null,[result])
		}, function(error) {
			// $.stopLoading();
			alert('请求失败: ' + error);
		});
	}


	
}