(function($) {
	document.addEventListener('plusready', function() {
		//compatibleConfirm('提交后台');
	});

	var InverID = null;
	var MaxTime = 5;
	var NowTime = MaxTime;
	var isWait = false;
	var E_getCode = document.body.querySelector('.getcode');

	E_getCode.addEventListener('tap', function(e) {
		if(isWait) return;
		isWait = true;
		E_getCode.innerHTML = NowTime;
		NowTime--;
		InverID = setInterval(function(event) {
			if(NowTime == 0) {
				E_getCode.innerHTML = '获取验证码';
				clearInterval(InverID);
				isWait = false;
				NowTime = MaxTime;
				return;
			}
			E_getCode.innerHTML = NowTime;
			NowTime--;
		}, 1000);
	})

	document.body.querySelector('#post').addEventListener('tap', function(e) {
		compatibleConfirm('您的评价已提交');
	})

})(mui);