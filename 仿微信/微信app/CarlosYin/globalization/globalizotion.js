(function(w) {

	//国际化数据内容
	w.gloInfo = null;
	//当前国际化文件
	w.GLOBALIZOTION = plus.storage.getItem('GLOBALIZOTION') || 'zh-cn.json';

	//读取国际化配置文件
	w.getgloInfo = function(_glo) {
		if(_glo) GLOBALIZOTION = _glo;
		var file_url = '_www/CarlosYin/globalization/' + GLOBALIZOTION;
		plus.io.resolveLocalFileSystemURL(file_url, function(entry) {
			entry.file(function(file) {
				var fileReader = new plus.io.FileReader();
				fileReader.readAsText(file, 'utf-8');
				fileReader.onloadend = function(evt) {
					gloInfo = JSON.parse(evt.target.result);
					//读取完成后回调
					GlobalizotionReload();
				}
			});
		}, function(e) {
			NAlert("错误", '读取语言文件失败！');
		});
	}
	document.addEventListener('plusready', function() {
		getgloInfo();
	});
})(window);