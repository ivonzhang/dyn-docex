(function($) {
	'use strict';

	/**
	 * 设置对象的属性
	 * 
	 * obj[Object]:
	 * name[String]:
	 * value[*]:
	 * flag[Number]: 
	 * 		0001  writable
	 * 		0010  configurable
	 * 		0100  enumerable
	 */
	var _set_object_property = function(obj, name, value, flag) {
		if ( typeof Object.defineProperty === 'function' ) {
			Object.defineProperty(obj, name, {
				writable: !!(flag & 1),
				configurable: !!(flag & 2),
				enumerable: !!(flag & 4),
				value: value
			});
		} else {
			obj[name] = value;
		}
	};
	
	var _extend_module = function(name, options) {
		var _module = $.extend({}, this, options || {});
		_set_object_property(_module, '_super', this, 0);
		if ( name ) {
			_set_object_property(_dyn, name, _module, 4);
		}
		return _module;
	};
	
	var _dyn = {};
	
	var _dyn_base = {
		
		_class_name: undefined,
		_server_url: undefined,
		_version: undefined,
		
		/**
		 * 调用JavaScript函数 -
		 * 
		 * func[Function]: 
		 * 		JavaScript函数对象，函数中this指向当前动态模块对象
		 * args[Array]: 
		 * 		传递给func的参数，若函数无参数，则数组长度应为0
		 */
		_call: function(func, args) {
			var self = this;
			if ( $.isFunction(func) ) {
				func.apply(self, args);
			}
		},
		
		/**
		 * 以POST方式调用动态模块的ajax方法，获取JSON数据 -
		 * 
		 * method[String]: 
		 * 		动态模块的方法名称 -
		 * args[Array|undefined]:
		 * 		方法参数。若动态模块的方法无参数，则该值必须为undefined
		 * onSuccess[Function|undefined]: 
		 * 		调用成功后的回调函数，参数与jQuery.ajax的success回调函数相同 -
		 * onError[Function|undefined]:
		 * 		调用失败后的回调函数，参数与jQuery.ajax的error回调函数相同 -
		 */
		_post: function(method, args, onSuccess, onError) {
			var self = this;
			$.ajax({
				type: 'POST',
				url: self._server_url + '/plugins/dyn/dyn.do?' + $.param({
					_: new Date().getTime()
				}),
				data: {
					method: 'ajax',
					className: self._class_name,
					methodName: method,
					params: $.isArray(args) ? args.join(',') : args
				},
				success: onSuccess || $.noop,
				error: onError || $.noop
			});
		},

		/**
		 * 以POST方式请求动态模块的ajax方法
		 * 
		 * method[String]: 
		 * 		动态模块的方法名称
		 * args[Array|undefined]:
		 * 		方法参数。若动态模块的方法无参数，则该值必须为undefined
		 * callback[Function|undefined]: 
		 * 		调用结束后的回调函数，参数如下
		 *  	success[Boolean]: 是否成功
		 *  	data[Object|Array|String|Number|undefined]: 若调用成功，data中存放返回的数据；否则data为错误信息。
		 */
		_post_ajax: function(method, args, callback) {
			var self = this;
			$.ajax({
				type: 'POST',
				url: self._server_url + '/plugins/dyn/dyn.do?' + $.param({
					_: new Date().getTime()
				}),
				data: {
					method: 'ajax',
					className: self._class_name,
					methodName: method,
					params: $.isArray(args) ? args.join(',') : args
				},
				success: function(result, text, jqxhr) {
					if ( result.success == 1 ) {
						self._call(callback, [true, result.result]);
					} else {
						self._call(callback, [false, result.error]);
					}
				},
				error: function(jqxhr, text, error) {
					if ( jqxhr.status != 0 ) {
						self._call(callback, [false, 'HTTP:' + jqxhr.status]);
					}
				}
			});
		},

		/**
		 * 以POST方式请求动态模块的ajax方法，并返回JsonResponse对象
		 * 
		 * method[String]: 
		 * 		动态模块的方法名称 -
		 * args[Array|undefined]:
		 * 		方法参数。若动态模块的方法无参数，则该值必须为undefined
		 * callback[Function|undefined]: 
		 * 		调用结束后的回调函数，参数如下
		 *  	success[Boolean]: 是否成功
		 *  	data[Object|Array|String|Number|undefined]: 若调用成功，data中存放返回的数据；否则data为错误信息。
		 */
		_post_ajax_jr: function(method, args, callback) {
			var self = this;
			self._post_ajax(method, args, function(success, data) {
				if ( success === true ) {
					if ( data.success === true ) {
						self._call(callback, [true, data.data]);
					} else {
						self._call(callback, [false, data.error]);
					}
				} else {
					self._call(callback, [false, data]);
				}
			});
		},


		/**
		 * 以POST方式请求动态模块的json方法
		 * 
		 * method[String]: 
		 * 		动态模块的方法名称
		 * obj[Object|Array|undefined]:
		 * 		方法参数。若动态模块的方法无参数，则该值必须为undefined
		 * callback[Function|undefined]: 
		 * 		调用结束后的回调函数，参数如下
		 *  	success[Boolean]: 是否成功
		 *  	data[Object|Array|String|Number|undefined]: 若调用成功，data中存放返回的数据；否则data为错误信息。
		 */
		_post_json: function(method, obj, callback) {
			var self = this;
			var _data = {
				className: self._class_name,
				methodName: method,
				params: obj
			};
			$.ajax({
				type: 'POST',
				url: self._server_url + '/plugins/dyn/dyn.do?' + $.param({
					method: 'json',
					_: new Date().getTime()
				}),
				contentType: 'application/json',
				dataType: 'json',
				data: JSON.stringify(_data),
				success: function(result, text, jqxhr) {
					if ( result.success == 1 ) {
						self._call(callback, [true, result.result]);
					} else {
						self._call(callback, [false, result.error]);
					}
				},
				error: function(jqxhr, text, error) {
					if ( jqxhr.status != 0 ) {
						self._call(callback, [false, 'HTTP:' + jqxhr.status]);
					}
				}
			});
		},

		/**
		 * 以POST方式请求动态模块的json方法，并返回JsonResponse对象
		 * 
		 * method[String]: 
		 * 		动态模块的方法名称 -
		 * obj[Object|Array|undefined]:
		 * 		方法参数。若动态模块的方法无参数，则该值必须为undefined
		 * callback[Function|undefined]: 
		 * 		调用结束后的回调函数，参数如下: callback(success, data)
		 *  	success[Boolean]: 是否成功
		 *  	data[Object|Array|String|Number|undefined]: 若调用成功，data中存放返回的数据；否则data为错误信息。
		 */
		_post_json_jr: function(method, obj, callback) {
			var self = this;
			self._post_json(method, obj, function(success, data) {
				if ( success === true ) {
					if ( data.success === true ) {
						self._call(callback, [true, data.data]);
					} else {
						self._call(callback, [false, data.error]);
					}
				} else {
					self._call(callback, [false, data]);
				}
			});
		},
		
		/**
		 * 生成下载文件用的URL地址 -
		 * 
		 * method[String]:
		 * 		动态模块负责下载文件的方法名 -
		 * options[Object|undefined]:
		 * 		链接的额外参数 -
		 */
		_download: function(method, options) {
			var self = this;
			var params = $.extend({
				method: 'file',
				className: self._class_name,
				methodName: method
			}, options);
			return self._server_url + '/plugins/dyn/dyn.do?' + $.param(params);
		},
		
		/**
		 * 初始化函数 -
		 * 
		 * url[String]:
		 * 		OA6.2的HTTP访问路径 -
		 * callback[Function|undefined]:
		 * 		初始化之后的回调函数 -
		 */
		_init: function(url, callback) {
			var self = this;
			self._server_url = url;
			if ( typeof callback === 'function' ) {
				self._post('version', undefined, function(obj, text, jqxhr) {
					if ( obj.success === 1 || obj.success == '1' ) {
						self._version = obj.result.version;
						self._call(callback, [true, obj.result]);
					} else {
						self._call(callback, [false, obj.error]);
					}
				}, function(jqxhr, text, error) {
					self._call(callback, [false, text]);
				});
			}
		},
		
		/**
		 * 初始化方法，同_init函数 -
		 */
		init: function(url, callback) {
			var self = this;
			self._init(url, callback);
		},
		
		/**
		 * 生成访问OA6.2中指定资源的URL路径 -
		 * 
		 * path[String]:
		 * 		资源的访问路径，如果是绝对路径（以'/'开头），则表示从OA6.2的根路径起 -
		 * params[Object|undefined]:
		 * 		访问资源所需要的额外参数 -
		 */
		url: function(path, params) {
			var self = this;
			var index = path.indexOf('?');
			if ( index == -1 ) {
				path += '?';
			} else {
				var c = path.charAt(path.length - 1);
				if ( c != '?' && c != '&' ) {
					path += '&';
				}
			}
			if ( path.charAt(0) == '/' ) {
				path = self._server_url + path;
			}
			return path + $.param(params || {});
		},
		
		/**
		 * 以当前对象为基础，创建一个新对象。新创建的对象将继承当前对象的所有属性和方法 -
		 * 新对象可以包含特有的属性和方法，或者覆盖当前对象的属性和方法 -
		 * 该方法主要用于创建一个特定功能的动态模块对象 -
		 * 
		 * name[String]:
		 * 		新对象的名称。如果指定名称，所创建的对象将根据名称保存到$.dyn对象中。
		 * options[Object]:
		 * 		该参数包含的新对象的特有属性和方法 -
		 */
		extend: function(name, options) {
			var self = this;
			if ( (typeof name === 'string') && _dyn[name] ) {
				throw 'dyn module "' + name + '" is already defined.';
			}

			var _module = undefined;
			if ( arguments.length < 2 ) {
				if ( typeof arguments[0] === 'string' ) {
					_module = self.extend(arguments[0], {});
				} else {
					_module = self.extend(undefined, arguments[0]);
				}
			} else {
				_module = $.extend({}, self, options || {});
				_set_object_property(_module, '_super', self, 0);
				if ( typeof name === 'string' ) {
					_set_object_property(_dyn, name, _module, 4);
				}
			}
			return _module;
		},
		
		/**
		 * 获取当前动态模块的版本号（如果有的话） -
		 */
		version: function() {
			var self = this;
			return self._version;
		}
	};
	
	if ( typeof Object.freeze === 'function' ) {
		Object.freeze(_dyn_base);
	}
	_set_object_property(_dyn, 'base', _dyn_base, 4);
	
	
	/********************toast and dialog*******************/
	
	var _toast = 
		'<div class="toast-12-11"  style="display:none">'
		+	'<div class="aui-toast">'
		+		'<i></i>'
		+		'<div class="aui-toast-content"></div>'
		+	'</div>'
		+'</div>';		
	var _showToast = {
		options: {
			delay: 1500,
			type: 0,
			text: '操作成功'
		},
		show: function() {
			var self = this; 
			var isDelay = true;
			var $toast = $('.toast-12-11');
			if($toast.length === 0) {
				//第一次加载
				$toast = $(_toast);
				$toast.appendTo($('body'));
			}
			$toast.find('.aui-toast i').removeClass();
			var clazz = '';
			switch(self.options.type) {
			case _dyn_toast.type.loading:
				clazz = 'aui-toast-loading';
				isDelay = false;
				break;	
			case _dyn_toast.type.ok:
				clazz = 'aui-iconfont aui-icon-check';
				break;
			case _dyn_toast.type.warn:
				clazz = 'aui-iconfont aui-icon-warn';
				break;
			case _dyn_toast.type.error: 
				clazz = 'aui-iconfont aui-icon-roundclose';
				break;
			case _dyn_toast.type.info:
				clazz = 'aui-iconfont aui-icon-info';
				break;
			default:
				clazz = 'aui-iconfont aui-icon-check';
			}
			$toast.find('i').addClass(clazz);
			//设置显示内容
			$toast.find('.aui-toast .aui-toast-content').text(self.options.text);
			$toast.show();
			//loading的时候不需要自动隐藏
			if(isDelay) {
				setTimeout(function(){
					$toast.hide();
				}, self.options.delay);
			}
		},
		hide: function() {
			$('.toast-12-11').hide();
		}
	};
	var _dialog = 
		'<div class="dialog-12-11" style="display: none;">'
		+	'<div class="aui-dialog">'
		+		'<div class="aui-dialog-header">提示</div>'
		+		'<div class="aui-dialog-body aui-text-left"></div>'
		+		'<div class="aui-dialog-footer">'
		+			'<div class="aui-dialog-btn aui-text-danger cancel" tapmode>取消</div>'
		+			'<div class="aui-dialog-btn aui-text-info ok" tapmode >确定</div>'
		+		'</div>'
		+	'</div>'
		+'</div>';
	var _showDialog = {
		options: {
			text: '',
			cancel: $.noop,
			ok: $.noop
		},
		show: function() {
			var self = this; 
			var $dialog = $('.dialog_12_11');
			if($dialog.length === 0) {
				$dialog = $(_dialog);
				//取消按钮单击单击事件
				$dialog.find('.aui-dialog .aui-dialog-footer .cancel').on("click", function(){
					self.options.cancel();
					$dialog.hide();
				});
				//确认按钮绑定单击事件
				$dialog.find('.aui-dialog .aui-dialog-footer .ok').on("click", function(){
					self.options.ok();
					$dialog.hide();
				});
				$dialog.appendTo($('body'));
			}
			//设置说明内容
			$dialog.find('.aui-dialog .aui-text-left').text(self.options.text);
			$dialog.show();
		}
	};
	var _dyn_toast = {
		type: {
			loading: -1,	//
			ok: 0,  	  	//成功提醒
			warn: 1,		//警告提醒
			error: 2,		//错误提醒
			info: 3			//提示性文字
		},
		startLoading: function() {
			var self = this;
			$.extend(_showToast.options, {
				type: self.type.loading,
				text: '加载中...'
			});
			_showToast.show();
		},
		stopLoading: function() {
			_showToast.hide();
		},
		ok: function(text){
			var self = this;
			$.extend(_showToast.options, {
				type: self.type.ok,
				text: text
			});
			_showToast.show();
		},
		warn: function(text){
			var self = this;
			$.extend(_showToast.options, {
				type: self.type.warn,
				text: text
			});
			_showToast.show();
		},
		error: function(text){
			var self = this;
			$.extend(_showToast.options, {
				type: self.type.error,
				text: text
			});
			_showToast.show();
		},
		info: function(text) {
			var self = this;
			$.extend(_showToast.options, {
				type: self.type.info,
				text: text
			});
			_showToast.show();
		},
		dialog: function(options){
			//相关判断
			$.extend(_showDialog.options, options || {});
			_showDialog.show();
		}
	};
	/******************end toast*****************/
	/******************start util*********************/
	var _dynutil = {
		//判断是否为云之家客户端
		isYzjApp: function() {
			return navigator.userAgent.match(/Qing\/.*;(iPhone|Android).*/)?true:false; 
		},
		//获取qing版本
		getQVersion: function() {
			var self = this, 
				result = '0.0.0';
		    if(self.isYzjApp()) {
		    	result = navigator.userAgent.match(/Qing\/(\d{1,2}\.\d{1,2}\.\d{1,2})/)[1];
		    }
		    return result;
		},
		/**
		 * 比较qing版本与指定的版本
		 * @param version{String} 待比较的版本号
		 * @return {Number} 大于：1；等于：0；小于：-1
		 */
		compareQVersion: function(version) {
			var self = this,
				localVersion, result = -1;
			localVersion = self.getQVersion();
			//判断是否相等
			if(localVersion === version) {
				result = 0;
			} else {
				//因为字符串比较为ascii值比较，如9 > 10
				var localArr=[], arr=[]; 
				$(localVersion.split(".")).each(function(index, item){
					localArr.push(parseInt(item));
				});
				$(version.split(".")).each(function(index, item){
					arr.push(parseInt(item));
				});
				if(localArr[0] > arr[0] 
				    || (localArr[0] === arr[0] && localArr[1] > arr[1])
				    || (localArr[0] === arr[0] && localArr[1] === arr[1] && localArr[2] > arr[2])) {
					result = 1;
				}
			}
			return result;
		}
	};
	/******************start util*********************/
	$.extend({
		dyn: _dyn,
		dynbase: _dyn_base,
		dyntoast: _dyn_toast,
		dynutil: _dynutil
	});
	
})(jQuery);