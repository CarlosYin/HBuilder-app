(function(w) {
	document.addEventListener('plusready', function() {
		init();
	});

	//用户国际化语言设置，目前采取的是读取文件后回调，以后还需要想到更好的解决方案
	w.GlobalizotionReload = function() {
		//		document.body.querySelector('.choose-language').innerHTML = gloInfo.index.language;
		//		document.body.querySelector('.btn-login').innerHTML = gloInfo.index.btnLogin;
		//		document.body.querySelector('.btn-regist').innerHTML = gloInfo.index.btnRegist;
	}

	function init() {
		darkStyle();
	}
	//获取屏幕宽度 用于顶部文字动画
	var body_width = document.body.clientWidth;
	var AniDec = 0.3;
	var LoginType = 'phone';
	var E_changeLogin = document.body.querySelector('.changeLogin');
	var E_btnpost = document.body.querySelector('.btn-post');

	E_changeLogin.addEventListener('tap', function(e) {
		var moveWidth = -body_width;
		var _changeLoginTxt = '';
		var _btnpostTxt = '';
		if(LoginType == 'qq') {
			moveWidth = 0;
			LoginType = 'phone';
			_changeLoginTxt = '用微信号/QQ号/邮箱登录';
			_btnpostTxt = '下一步';
		} else {
			LoginType = 'qq';
			_changeLoginTxt = '用手机号登录';
			_btnpostTxt = '登录';
		}
		E_changeLogin.innerHTML = _changeLoginTxt;
		E_btnpost.innerHTML = _btnpostTxt;

		JT.to('.qqLogin', AniDec, {
			left: moveWidth,
			onEnd: AniEnd
		});
		JT.to('.phoneLogin', AniDec, {
			left: moveWidth,
			onEnd: AniEnd
		});

		function AniEnd() {

		}

	})

	E_btnpost.addEventListener('tap', function(e) {
		if(('' + E_btnpost.classList).indexOf('btn-post-disabled') >= 0) return;
		console.log('执行');
	})

	document.body.querySelector('.changeArea').addEventListener('tap', function(e) {
		clicked('/CarlosYin/code/login/area.html', false, false, null, 'slide-in-bottom');
	})
	
	document.addEventListener('changeArea',function(e){
		console.log('changeArea'+JSON.stringify(e.detail));
		
		document.body.querySelector('.area').innerHTML = e.detail.area;
		document.body.querySelector('.lbl_phone').innerHTML = e.detail.phone;
		
	})

})(window);