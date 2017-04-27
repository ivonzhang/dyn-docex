(function($) {

	var _k3oa = {
			_class_name: 'cn.firstsoft.firstframe.plugins.dyn.docex.service.DocexService',
			_start: 0,
			_page_size: 20,
			_server_url: '',
			_docex_info: {},
			_user_info: {},
			
			_call: function(func, args) {
				if ( $.isFunction(func) ) {
					func.apply(null, args);
				}
			},
			
			_ajax: function(method, args, onSuccess, onError) {
			var self = this;
			$.ajax({
				type: 'POST',				
				/*url: self._server_url + '/plugins/dyn/dyn.do',*/
				url: self._server_url + '/plugins/dyn/dyn.do?'+"timestamp="+(new Date()).getTime(),
				data: {
					method: 'ajax',
					className: self._class_name,
					methodName: method,
					params: args.join(',')
				},
				success: onSuccess,
				error: onError
				});
			},
			/*以json方式提交数据*/
			_json: function(method, args, onSuccess, onError) {
			var self = this;
			var _obj = {
					className: self._class_name,
					methodName: method,
					params: args
			};
			$.ajax({
				type: 'POST',				
				/*url: self._server_url + '/plugins/dyn/dyn.do',*/
				url: self._server_url + '/plugins/dyn/dyn.do?method=json&'+"timestamp="+(new Date()).getTime(),
				data: JSON.stringify(_obj),
				contentType: 'application/json',
				dataType: 'json',
				success: onSuccess,
				error: onError
				});
			},
		
			init: function(url, user, callback) {
				var self = this;
				self._server_url = url;
				self._docex_info = {};
				self._user_info = {
					userId: user.id
				};
			},
			
			
			last: function(a) {
				var self = this;
				if ( a ) {
					$.extend(self._docex_info, {
					last: a
					});
				}
				return self._docex_info.last;
			},
		
			end: function() {
				var self = this;
				return self.last() !== undefined && self._docex_info.end === true;
			},
			
			
			
			/*load the todoList*/
			loadDocexs: function(start, pageSize, inboxId, onSuccess, onError) {
			var self = this;
			var args = [
				self._user_info.userId,
				start,
				pageSize,
				inboxId
			];
			 			
			self._ajax('getDocexFileListByPageToKOA', args, function(obj, text, jqxhr){
				if ( obj.success === 1 || obj.success == '1' ) {
					var arr = obj.result;
					self._call(onSuccess, [arr]);
				} else {
					self._call(onError, [obj.error]);
				}
				}, $.noop);
			},
			
			
			/*load list of myDraft or mySent*/
			loadDocexsOfMyDraftOrMySent: function(start, pageSize, type, strKey, onSuccess, onError) {
			var self = this;
			var args = [
				self._user_info.userId,
				start,
				pageSize,
				type,
				strKey
			];
			 			
			self._ajax('getMyDraftOrMysentListByPageToKOA', args, function(obj, text, jqxhr){
				if ( obj.success === 1 || obj.success == '1' ) {
					var arr = obj.result;
					self._call(onSuccess, [arr]);
				} else {
					self._call(onError, [obj.error]);
				}
				}, $.noop);
			},
			
			
			/*load detail of todo*/
			loadDetailOfTodo: function(id, onSuccess, onError) {
			var self = this;
			var args = [
				self._user_info.userId,
				id
			];
			 			
			self._ajax('getDocexFiledetailToKOA', args, function(obj, text, jqxhr){
				if ( obj.success === 1 || obj.success == '1' ) {
					var arr = obj.result;
					self._call(onSuccess, [arr]);
				} else {
					self._call(onError, [obj.error]);
				}
				}, $.noop);
			},
			
			/*load detail of myDraft*/
			loadDetailOfMyDraft: function(id, onSuccess, onError) {
			var self = this;
			var args = [
				self._user_info.userId,
				id
			];
			 			
			self._ajax('findOutDocexFiledetailToKOA', args, function(obj, text, jqxhr){
				if ( obj.success === 1 || obj.success == '1' ) {
					var arr = obj.result;
					self._call(onSuccess, [arr]);
				} else {
					self._call(onError, [obj.error]);
				}
				}, $.noop);
			},
			
			
			
			
			/*load the main content of todo docexfiledetail*/
			loadDetailContentOfTodo: function(id, onSuccess, onError) {
			var self = this;
			var args = [
				self._user_info.userId,
				id
			];
			 			
			self._ajax('getWordContentToKOA', args, function(obj, text, jqxhr){
				if ( obj.success === 1 || obj.success == '1' ) {
					var arr = obj.result;
					self._call(onSuccess, [arr]);
				} else {
					self._call(onError, [obj.error]);
				}
				}, $.noop);
			},
			
			
			
			
			/*load the opinion list of todo docexfiledetail*/
			loadDetailOpnionOfTodo: function(id, opId, startOfOpinion, pageSize, rn, onSuccess, onError) {
			var self = this;
			var args = [
				self._user_info.userId,
				id,
				opId,
				startOfOpinion,
				pageSize,
				rn
			];
			 			
			self._ajax('getDocexFileOptionListByPageToKOA', args, function(obj, text, jqxhr){
				if ( obj.success === 1 || obj.success == '1' ) {
					var arr = obj.result;
					self._call(onSuccess, [arr]);
				} else {
					self._call(onError, [obj.error]);
				}
				}, $.noop);
			},
			
			/*load the attach list of todo docexfiledetail*/
			loadDetailAttachOfTodo: function(id, onSuccess, onError) {
			var self = this;
			var args = [
				self._user_info.userId,
				id
			];
			 			
			self._ajax('getDocexFileAttachListToKOA', args, function(obj, text, jqxhr){
				if ( obj.success === 1 || obj.success == '1' ) {
					var arr = obj.result;
					self._call(onSuccess, [arr]);
				} else {
					self._call(onError, [obj.error]);
				}
				}, $.noop);
			},
			
			/*finish the docexfile , change todo to become do*/
			finishDetail: function(id, onSuccess, onError) {
			var self = this;
			var args = [
				self._user_info.userId,
				id
			];
			 			
			self._ajax('finishDetailToKOA', args, function(obj, text, jqxhr){
				if ( obj.success === 1 || obj.success == '1' ) {
					var arr = obj.result;
					self._call(onSuccess, [arr]);
				} else {
					self._call(onError, [obj.error]);
				}
				}, $.noop);
			},
			
			
			/*end the docexfile , change todo to become do*/
			endDetail: function(id, onSuccess, onError) {
			var self = this;
			var args = [
				self._user_info.userId,
				id
			];
			 			
			self._ajax('endDetailToKOA', args, function(obj, text, jqxhr){
				if ( obj.success === 1 || obj.success == '1' ) {
					var arr = obj.result;
					self._call(onSuccess, [arr]);
				} else {
					self._call(onError, [obj.error]);
				}
				}, $.noop);
			},
			
			
			/*load docexfile operation*/
			loadDocexOperation: function(id, onSuccess, onError) {
			var self = this;
			var args = [
				self._user_info.userId,
				id
			];
			 			
			self._ajax('getDocexFileOperationToKOA', args, function(obj, text, jqxhr){
				if ( obj.success === 1 || obj.success == '1' ) {
					var arr = obj.result;
					self._call(onSuccess, [arr]);
				} else {
					self._call(onError, [obj.error]);
				}
				}, $.noop);
			},
			
			
			
			/*save the opinion of docexfiledetail*/
			saveDetailOpnionOfTodo: function(id, opId, reply_content, isReply, onSuccess, onError) {
			var self = this;
			var args = [
				self._user_info.userId,
				id,
				opId,
				reply_content,
				isReply
			];
			 			
			self._ajax('saveDocexFileOptionToKOA', args, function(obj, text, jqxhr){
				if ( obj.success === 1 || obj.success == '1' ) {
					var arr = obj.result;
					self._call(onSuccess, [arr]);
				} else {
					self._call(onError, [obj.error]);
				}
				}, $.noop);
			},
			
			
			
			/*new the newArbDetailToKOA*/
			newArbDetailToKOA: function(ids, title, content, isAdditional, oldId, onSuccess, onError) {
			var self = this;
			var args = [
				self._user_info.userId,
				ids,
				title,
				content,
				isAdditional,
				oldId
			];
			 			
			self._ajax('newArbDetailToKOA', args, function(obj, text, jqxhr){
				if ( obj.success === 1 || obj.success == '1' ) {
					var arr = obj.result;
					self._call(onSuccess, [arr]);
				} else {
					self._call(onError, [obj.error]);
				}
				}, $.noop);
			},
			
			/*load detail's flowshow of todo*/
			getDocexFlowShow: function(id, type, onSuccess, onError) {
			var self = this;
			var args = [
				self._user_info.userId,
				id,
				type
			];
			 			
			self._ajax('getFlowXMLStrToKOA', args, function(obj, text, jqxhr){
				if ( obj.success === 1 || obj.success == '1' ) {
					var arr = obj.result;
					self._call(onSuccess, [arr]);
				} else {
					self._call(onError, [obj.error]);
				}
				}, $.noop);
			},
			
			
			/*load detail's read history*/
			getReadHistory: function(id, start, pageSize, type, onSuccess, onError) {
			var self = this;
			var args = [
				self._user_info.userId,
				id,
				start,
				pageSize,
				type
			];
			 			
			self._ajax('getDocexFileReaderListByPageToKOA', args, function(obj, text, jqxhr){
				if ( obj.success === 1 || obj.success == '1' ) {
					var arr = obj.result;
					self._call(onSuccess, [arr]);
				} else {
					self._call(onError, [obj.error]);
				}
				}, $.noop);
			},
			
			
			/*return the url of decexdetail*/
			detailURL: function(id, hasFlowShow, status, type,source) {
			var self = this;
			return self._server_url + '/plugins/dyn/docex/docex_detail.jsp?' + $.param({
				id: id,
				userId: self._user_info.userId, 
				hasFlowShow: hasFlowShow,
				status: status,
				type: type,
				source: source,
				});
			},
			
			/*return the url of the docexfiel attachment*/
			attachmentURL: function(aid) {
			var self = this;
			var h = window.location.href;
			return h.substring(0, h.lastIndexOf('/dyn')) + '/dyn/dyn.do?' + $.param({
				method: 'file',
				className: self._class_name,
				methodName: 'getAttachment',
				params: aid
			});
			/*** 旧附件下载方式 通过手机默认浏览器下载
			return self._server_url + '/plugins/dyn/dyn.do?' + $.param({
				method: 'file',
				className: self._class_name,
				methodName: 'getAttachment',
				params: aid
				});
				**/
			},
			
			docexFlowShow: function(id) {
			var self = this;
			return self._server_url + '/plugins/mobile/docexFileinbox_mobile_flowshow.jsp?' + $.param({
				detailId: id,
				client: 'phone',
				userId: self._user_info.userId,
			});
			},
			
			
			showAlert: function(){
				
				var alertHtml = '<div class="warning-modal">'
						            + '<div class="warning-content">'
						            +    '<i class="fa fa-exclamation-circle"></i>'
						            +    '<span>对不起！您需要验证身份后才可以使用此功能.</span>'
						            + '</div>'
						        + '<div class="modal-footer">'
						        + '<span>我知道了</span>'
						        + '</div>'
						        + '</div>'
						        + '<div class="full-screen-modal-back"></div>';
				var alserHtmlObj = $(alertHtml).appendTo($(document.body));
				alserHtmlObj.css('display', 'block');
			},
			
			/*加签*/
			special4KOA: function(userIds, from, stepId, detailId, onSuccess, onError) {
			var self = this;
			var args = {
				userId : self._user_info.userId,
				userIds : userIds,
				from : from,
				stepId : stepId,
				detailId : detailId
			};
			 			
			self._json('special4KOA', args, function(obj, text, jqxhr){
				if ( obj.success === 1 || obj.success == '1' ) {
					var arr = obj.result;
					self._call(onSuccess, [arr]);
				} else {
					self._call(onError, [obj.error]);
				}
				}, $.noop);
			},
			
			/*获取登录token*/
			getToken: function(id, onSuccess, onError) {
			var self = this;
			var args = [
				self._user_info.userId
			];
			 			
			self._ajax('getToken', args, function(obj, text, jqxhr){
				if ( obj.success === 1 || obj.success == '1' ) {
					var arr = obj.result;
					self._call(onSuccess, [arr]);
				} else {
					self._call(onError, [obj.error]);
				}
				}, $.noop);
			},
			
			/*附件上传*/
			saveDocexFileAttachs4KOA: function(docexFileId, attachs, onSuccess, onError) {
			var self = this;
			var args = {
				docexFileId : docexFileId,
				attachs : attachs
			};
			 			
			self._json('saveDocexFileAttachs', args, function(obj, text, jqxhr){
				if ( obj.success === 1 || obj.success == '1' ) {
					var arr = obj.result;
					self._call(onSuccess, [arr]);
				} else {
					self._call(onError, [obj.error]);
				}
				}, $.noop);
			},
			
			//把weboffice编辑的正文当成附件形式转发 保存 add by fa_zf_zhang 2015-12-16
			saveWordContentAsAttach: function(userId, docexFileId, fileBodyId, onSuccess, onError) {
				var self = this;
				var args = {
					userId: userId,
					docexFileId : docexFileId,
					fileBodyId : fileBodyId
				};
				 			
				self._json('saveWordContentAsAttach', args, function(obj, text, jqxhr){
					if ( obj.success === 1 || obj.success == '1' ) {
						var arr = obj.result;
						self._call(onSuccess, [arr]);
					} else {
						self._call(onError, [obj.error]);
					}
					}, $.noop);
			},
			
			//点击按钮波浪效果
			clickWaves: function(obj,e){
				var ink, d, x, y;
				
				$(obj).addClass("ripplelink");
				
				if ($(obj).find(".ink").length === 0) {
					var id = Math.round(Math.random()*1000)+'';
		            $(obj).prepend('<span class="ink" id="'+ id +'"></span>');
		            $(obj).data("ink-id", id);
		        }
		        //ink = $(obj).find(".ink");
		        var ink_id = $(obj).data("ink-id");
		        ink = $("#"+ink_id);
		        ink.removeClass("animate");
		        if (!ink.height() && !ink.width()) {
		            d = Math.max($(obj).outerWidth(), $(obj).outerHeight());
		            ink.css({
		                height: d,
		                width: d
		            });
		        }
		        if(e.type == 'click'){
		        	//click事件下 用e.pageX
			        x = e.pageX - $(obj).offset().left - ink.width() / 2;
				    y = e.pageY - $(obj).offset().top - ink.height() / 2;
		        }else{
			        //touchstart事件下 获取鼠标位置用e.originalEvent.targetTouches[0].pageX
			        x = e.originalEvent.targetTouches[0].pageX - $(obj).offset().left - ink.width() / 2;
			        y = e.originalEvent.targetTouches[0].pageY - $(obj).offset().top - ink.height() / 2;
		        }
		        ink.css({
		            top: y + 'px',
		            left: x + 'px'
		        }).addClass("animate");
			},
			getSSOUserInfo : function(id, docexFileId, onSuccess, onError) {
				var self = this;
				var args = [
				      self._user_info.userId,
				      id,
				      docexFileId
					
				];
				 			
				self._ajax('getSSOUserInfo', args, function(obj, text, jqxhr){
					if ( obj.success === 1 || obj.success == '1' ) {
						var arr = obj.result;
						self._call(onSuccess, [arr]);
					} else {
						self._call(onError, [obj.error]);
					}
					}, $.noop);
			},
		};

	$.extend({
		kdk3oa: _k3oa
	});


})(jQuery);