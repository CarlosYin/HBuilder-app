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
			if(loginPhone == '') E_btnpost.classList.add('btn-post-disabled');
			if(loginPhone != '') E_btnpost.classList.remove('btn-post-disabled');
		} else {
			LoginType = 'qq';
			_changeLoginTxt = '用手机号登录';
			_btnpostTxt = '登录';
			if(loginAcc == '' || loginPwd == '') E_btnpost.classList.add('btn-post-disabled');
			if(loginAcc != '' && loginPwd != '') E_btnpost.classList.remove('btn-post-disabled');
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

	var _wait;
	E_btnpost.addEventListener('tap', function(e) {
		if(('' + E_btnpost.classList).indexOf('btn-post-disabled') >= 0) return;

		_wait = OpenWait('请稍候...');
		setTimeout(function(e) {
			_wait.close();
			clicked('/CarlosYin/code/home/index.html', false, false, null, 'none');
		}, 1500);

	})

	document.body.querySelector('.more').addEventListener('tap', function(e) {
		bts = [{
			title: "找回密码"
		}, {
			title: "前往微信安全中心"
		}];
		ActionSheet('', '取消', bts, cb);

		function cb(idx) {
			console.log(idx);
		}
	})

	document.body.querySelector('.changeArea').addEventListener('tap', function(e) {
		clicked('/CarlosYin/code/login/area.html', false, false, null, 'slide-in-bottom');
	})

	document.addEventListener('changeArea', function(e) {

		document.body.querySelector('.area').innerHTML = e.detail.area;
		document.body.querySelector('.lbl_phone').innerHTML = e.detail.phone;

	})

	var loginPhone = '';
	document.body.querySelector('#phone').addEventListener('input', function(e) {
		loginPhone = this.value;
		if(loginPhone != '') {
			E_btnpost.classList.remove('btn-post-disabled');
		} else
			E_btnpost.classList.add('btn-post-disabled');
	})

	var loginAcc = '';
	var loginPwd = '';
	document.body.querySelector('#acc').addEventListener('input', function(e) {
		loginAcc = this.value;
		if(loginAcc != '' && loginPwd != '') {
			E_btnpost.classList.remove('btn-post-disabled');
		} else
			E_btnpost.classList.add('btn-post-disabled');
	})

	document.body.querySelector('#pwd').addEventListener('input', function(e) {
		loginPwd = this.value;
		if(loginAcc != '' && loginPwd != '') {
			E_btnpost.classList.remove('btn-post-disabled');
		} else
			E_btnpost.classList.add('btn-post-disabled');
	})

	document.addEventListener('cancelArea', function(e) {
		darkStyle();
	})

})(window);