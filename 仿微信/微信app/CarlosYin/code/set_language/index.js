(function(w) {
	document.addEventListener('plusready', function() {
		init();
	});

	//用户国际化语言设置，目前采取的是读取文件后回调，以后还需要想到更好的解决方案
	w.GlobalizotionReload = function() {
		document.querySelector('.mui-pull-text').innerHTML = gloInfo.setLanguage.header.back;
		document.querySelector('.mui-title').innerHTML = gloInfo.setLanguage.header.h1;
		document.querySelector('.btn-success').innerHTML = gloInfo.setLanguage.header.btnSuccess;
	}
	var btn_suc = document.querySelector('.btn-success');

	var chooseFileName = null;

	function init() {

		mui.init({
			gestureConfig: {
				doubletap: true
			},
			subpages: [{
				url: 'list.html',
				id: '/CarlosYin/code/set_language/list.html',
				styles: {
					top: '65px',
					bottom: '0px',
				}
			}]
		});

		//完成按钮事件
		btn_suc.addEventListener('tap', function(e) {
			//是否有设置语言
			var isChanage = ('' + this.classList).indexOf('btn-success-disabled') >= 0 ? false : true;
			//如果没有改变语言
			if(!isChanage) return;

			var wv_all = plus.webview.all();

			for(var i = 0; i < wv_all.length; i++) {
				wv_all[i].evalJS("getgloInfo('" + GLOBALIZOTION + "');");
			}

			plus.storage.setItem('GLOBALIZOTION', GLOBALIZOTION);

			var wv_curr = plus.webview.currentWebview();
			wv_curr.close();
		})

		document.addEventListener('changeSucStatus', function(e) {
			var _type = parseInt(e.detail.type);
			if(_type == -1) {
				btn_suc.classList.add('btn-success-disabled');
			} else if(_type == 1) {
				btn_suc.classList.remove('btn-success-disabled');
				GLOBALIZOTION = e.detail.filename;
			}
		})
	}

})(window);