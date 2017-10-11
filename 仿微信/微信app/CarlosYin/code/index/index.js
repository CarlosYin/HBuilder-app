(function(w) {
	document.addEventListener('plusready', function() {
		//console.log("所有plus api都应该在此事件发生后调用，否则会出现plus is undefined。"
		init();
		
		
		
	});
	
	

	//用户国际化语言设置，目前采取的是读取文件后回调，以后还需要想到更好的解决方案
	w.GlobalizotionReload = function() {
		document.body.querySelector('.choose-language').innerHTML = gloInfo.index.language;
		document.body.querySelector('.btn-login').innerHTML = gloInfo.index.btnLogin;
		document.body.querySelector('.btn-regist').innerHTML = gloInfo.index.btnRegist;
	}

	function init() {
		darkStyle();
		var p_data = {
			PageSize: 12,
			PageIndex: 1
		}

		//语言切换
		document.querySelector('.choose-language').addEventListener('tap', function(e) {
			clicked('/CarlosYin/code/set_language/index.html', false, false, null, 'slide-in-bottom');
		})

		//跳转登录
		document.querySelector('.btn-login').addEventListener('tap', function(e) {
			clicked('/CarlosYin/code/login/index.html', false, false, null, 'slide-in-bottom');
		})
		
		//跳转注册
		document.querySelector('.btn-regist').addEventListener('tap', function(e) {
			clicked('/CarlosYin/code/regist/index.html', false, false, null, 'slide-in-bottom');
		})
		
		//list页面点击列表项的回调操作。
		document.addEventListener('closeSetLan', function(e) {
			darkStyle();
		})
	}

})(window);