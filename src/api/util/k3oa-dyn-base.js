(function($) {
	
	var _dyn_base = {
		
		_class_name: undefined,
		_server_url: undefined,
		_version: undefined,
		
		/**
		 * 调用JavaScript函数 -
		 * 
		 * func[Function]: 
		 * 		JavaScript函数对象 -
		 * args[Array]: 
		 * 		传递给func的参数 -
		 */
		_call: function(func, args) {
			if ( $.isFunction(func) ) {
				func.apply(null, args);
			}
		},
		
		/**
		 * 以POST方式向动态模块请求JSON数据 -
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
				url: self._server_url + '/plugins/dyn/dyn.do',
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
		 * options[Object]:
		 * 		该参数包含的新对象的特有属性和方法 -
		 */
		extend: function(options) {
			var self = this;
			return $.extend({
				_super: self
			}, self, options || {});
		},
		
		/**
		 * 获取当前动态模块的版本号（如果有的话） -
		 */
		version: function() {
			var self = this;
			return self._version;
		}
	};
	
	$.extend({
		dynbase: _dyn_base
	});
	
})(jQuery);