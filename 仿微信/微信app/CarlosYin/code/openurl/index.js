(function(w) {
	document.addEventListener('plusready', function() {
		init();
		var ourl = plus.storage.getItem('openurl');
		var sub = plus.webview.create(ourl, ourl, {
			top: '60px'
		});
		var self = plus.webview.currentWebview();
		self.append(sub);
		
		sub.show();
	});
	//用户国际化语言设置，目前采取的是读取文件后回调，以后还需要想到更好的解决方案
	w.GlobalizotionReload = function() {
		//		document.body.querySelector('.choose-language').innerHTML = gloInfo.index.language;
		//		document.body.querySelector('.btn-login').innerHTML = gloInfo.index.btnLogin;
		//		document.body.querySelector('.btn-regist').innerHTML = gloInfo.index.btnRegist;
	}

	function init() {
		lightStyle();
	}

})(window);