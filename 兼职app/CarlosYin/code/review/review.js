(function($) {

	document.body.querySelector('.send').addEventListener('tap', function(e) {
		compatibleConfirm('提交后台');
	})
	
	var chooseNum = 0;
	document.body.querySelector('.dianzan').addEventListener('tap', function(e) {
		var ev = ev || window.event;
		var target = ev.target || ev.srcElement;
		var _list = '' + target.classList;
		var _index = parseInt(_list.indexOf('icon-dianzan'));
		if(_index > 0) {
			var _num = parseInt(target.getAttribute('num'));
			chooseNum = _num;
			var listSpans = document.body.querySelectorAll('.icon-dianzan');
			[].forEach.call(listSpans, function(item, idex) {
				item.classList.remove('dz-active');
				if(idex <= _num) {
					item.classList.add('dz-active');
				}
			})
		}
	})

})(mui);