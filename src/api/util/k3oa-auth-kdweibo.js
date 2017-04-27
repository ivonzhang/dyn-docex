(function($) {

	var _kdweibo = $.dynbase.extend({
		
		_class_name: 'cn.firstsoft.firstframe.plugins.dyn.kdweibo.service.KdweiboService',
		_user_info: {},
		
		auth: function(openid, callback) {
			var self = this;
			self._user_info = {};
			var args = [openid];
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
				self._call(callback, [false, '云之家用户验证失败']);
			});
		},
		
		user: function() {
			var self = this;
			return $.extend(true, {}, self._user_info);
		}
	});
	
	$.extend({
		auth: _kdweibo
	});
	
})(jQuery);