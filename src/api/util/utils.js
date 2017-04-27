(function($) {
	var  _utils = {

		getQuerysOfURL: function(url){
			var myURL = this.parseURL(url);
			return myURL.params;
		},

		parseURL: function(url) {
		   var a =  document.createElement('a');
		   a.href = url;
		   return {
		       source: url,
		       protocol: a.protocol.replace(':',''),
		       host: a.hostname,
		       port: a.port,
		       query: a.search,
		       params: (function(){
		           var ret = {},
		               seg = a.search.replace(/^\?/,'').split('&'),
		               len = seg.length, i = 0, s;
		           for (;i<len;i++) {
		               if (!seg[i]) { continue; }
		               s = seg[i].split('=');
		               ret[s[0]] = s[1];
		           }
		           return ret;
		       })(),
		       file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],
		       hash: a.hash.replace('#',''),
		       path: a.pathname.replace(/^([^\/])/,'/$1'),
		       relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1],
		       segments: a.pathname.replace(/^\//,'').split('/')
		   };
		},



		/*判断是否滚动到底部*/
		isScrollBottom: function () {
		    return (this.getScrollHeight() - (this.getScrollTop() + this.getWindowHeight())) < 10;
		},

		getScrollTop: function () {
		    var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
		    if (document.body) {
		        bodyScrollTop = document.body.scrollTop;
		    }
		    if (document.documentElement) {
		        documentScrollTop = document.documentElement.scrollTop;
		    }
		    scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
		    return scrollTop;
		},
		getScrollHeight: function () {
		    var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
		    if (document.body) {
		        bodyScrollHeight = document.body.scrollHeight;
		    }
		    if(document.documentElement){
		        documentScrollHeight = document.documentElement.scrollHeight;
		    }
		    scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
		    return scrollHeight;
		},

		getWindowHeight : function () {
		    var windowHeight = 0;
		    if(document.compatMode == "CSS1Compat"){
		        windowHeight = document.documentElement.clientHeight;
		    } else {
		        windowHeight = document.body.clientHeight;
		    }
		    return windowHeight;
		}

	}

	$.extend({
		jQutils: _utils
	});
})(jQuery)