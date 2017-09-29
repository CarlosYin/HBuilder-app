(function(w) {

	mui('.mui-scroll-wrapper').scroll({
		deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
	});

	w.GlobalizotionReload = function() {}
	
	var chooseLanguageFileName = plus.storage.getItem('GLOBALIZOTION') || GLOBALIZOTION;
	var _lists = document.body.querySelectorAll('.mui-table-view-cell');
	[].forEach.call(_lists, function(item) {
		if(item.getAttribute('filename') == chooseLanguageFileName) {
			item.querySelector('a').classList.add('mui-navigate-right');
		}
	});


	//列表项的选择
	document.body.querySelector('.mui-table-view').addEventListener('tap', function(e) {
		var ev = ev || window.event;
		var target = ev.target || ev.srcElement;

		while(target.classList !== 'mui-table-view-cell') {
			if(target.classList == 'mui-table-view-cell') {
				
				//列表右侧的小勾
				document.body.querySelector('.mui-navigate-right').classList.remove('mui-navigate-right');
				target.querySelector('a').classList.add('mui-navigate-right');
				
				
				//国际化文件名称
				var _filename = target.getAttribute('filename');
				var setpage = plus.webview.getWebviewById('/CarlosYin/code/set_language/index.html');
				var param = {
					type: -1
				};
				if(_filename == null) {
					NAlert('提示', '暂无此语言的配置文件');
				}
				if(_filename && (chooseLanguageFileName != _filename)) {
					param.filename = _filename;
					GLOBALIZOTION = _filename;
					param.type = 1;
				}
				mui.fire(setpage, 'changeSucStatus', param);
				break;
			}
			target = target.parentNode;
		}
	});

})(window);