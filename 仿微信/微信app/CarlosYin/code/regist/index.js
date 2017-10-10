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
	var LoginType = 'phone';
	var E_btnpost = document.body.querySelector('.btn-post');

	var AniDec = 0.3;
	var body_height = document.body.clientHeight;
	var E_protocol = document.body.querySelector('.protocol');
	var E_main = document.body.querySelector('#main');
	E_btnpost.addEventListener('tap', function(e) {
		if(('' + E_btnpost.classList).indexOf('btn-post-disabled') >= 0) return;

		document.body.querySelector('#pro_title').innerHTML = '';
		E_main_protocol.innerHTML = '';

		E_protocol.classList.remove('mui-hidden');
		E_main.classList.add('filter-blur');
		JT.fromTo('.protocol', AniDec, {
			opacity: 0,
			top: body_height / 2
		}, {
			opacity: 1,
			top: 0,
			onEnd: AniEnd
		});

		function AniEnd() {
			i = 0;
			getProtocol();
		}
	})

	var E_main_protocol = document.body.querySelector('#main_protocol');
	var E_line = document.body.querySelector('.line');

	var i = 0;
	var InterID = null;
	//请求协议
	function getProtocol() {
		InterID = setInterval(function(e) {
			if(i > 100 && InterID) {
				clearInterval(InterID);
				E_line.style.width = '0%';
				showProtocol();
			} else {
				E_line.style.width = i + '%';
				i++;
			}
		}, 15);
	}

	function showProtocol() {
		document.body.querySelector('#pro_title').innerHTML = '微信隐私保护指引';
		for(var i = 1; i < 60; i++) {
			var _p = document.createElement('p');
			_p.innerHTML = '协议内容段落' + i;
			E_main_protocol.appendChild(_p);
		}

		mui('#protocolWrapper').scroll({
			deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
		});
	}

	document.body.querySelector('.mui-pull-text2').addEventListener('tap', HidePro);

	document.body.querySelector('.no-aggre').addEventListener('tap', HidePro);

	function HidePro(callback) {
		console.log(typeof callback)
		E_main.classList.remove('filter-blur');
		JT.fromTo('.protocol', AniDec, {
			opacity: 1,
			top: 0
		}, {
			opacity: 0,
			top: body_height * 2 / 3,
			onEnd: AniEnd
		});

		function AniEnd() {
			E_protocol.classList.add('mui-hidden');
			if(typeof callback == 'function') callback();
		}
	}

	document.body.querySelector('.changeArea').addEventListener('tap', function(e) {
		clicked('/CarlosYin/code/login/area.html', false, false, null, 'slide-in-bottom');
	})

	document.addEventListener('changeArea', function(e) {
		console.log('changeArea' + JSON.stringify(e.detail));

		document.body.querySelector('.area').innerHTML = e.detail.area;
		document.body.querySelector('.lbl_phone').innerHTML = e.detail.phone;

	})

	var loginPhone = '';
	var E_inputPhone = document.body.querySelector('#phone');
	E_inputPhone.addEventListener('input', function(e) {
		loginPhone = this.value;
		if(loginPhone != '') {
			E_btnpost.classList.remove('btn-post-disabled');
		} else
			E_btnpost.classList.add('btn-post-disabled');
	})

	document.addEventListener('cancelArea', function(e) {
		darkStyle();
	})

	document.body.querySelector('.aggre').addEventListener('tap', function(e) {
		var _wait = null;

		function RegistPhone() {
			_wait = OpenWait('请稍候...');
		}
		HidePro(RegistPhone);

		setTimeout(function(e) {
			_wait.close();
			var btns = ['取消', '好'];
			var _phoneNO = document.body.querySelector('.lbl_phone').innerHTML + ' ' + E_inputPhone.value;
			NConfirm('确认手机号码', '我们将发送验证码短信到这个号码:\n' + _phoneNO, btns, function(idx) {
				if(idx == 1) {
					_wait = OpenWait('请稍候...');
					setTimeout(function(e) {
						_wait.close();
						clicked('/CarlosYin/code/home/index.html', false, false, null, 'none');
					}, 1500);
				}

			})
		}, 1500);
	})

})(window);