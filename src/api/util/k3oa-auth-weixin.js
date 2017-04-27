(function($) {

	var _weixin = $.dynbase.extend({
		
		_class_name: 'cn.firstsoft.firstframe.plugins.dyn.weixin.service.WeixinService',
		_user_info: {},
		
		auth: function(data, callback) {
			var self = this;
			self._user_info = {};
			var args = [data.userName, data.token, data.time];
			self._post('auth', args, function(obj, text, jqxhr) {
				if ( obj.success === 1 || obj.success == '1' ) {
					obj = obj.result;
					if ( obj.success === true ) {
						$.extend(self._user_info, obj.data);
						self._call(callback, [true, self._user_info]);
					} else {
						self._call(callback, [false, obj.error]);
					}
				} else {
					self._call(callback, [false, obj.error]);
				}
			}, function() {
				self._call(callback, [false, '微信用户验证失败']);
			});
		},
		
		user: function() {
			var self = this;
			return $.extend(true, {}, self._user_info);
		}
	});
	
	$.extend({
		auth: _weixin
	});
	
})(jQuery);