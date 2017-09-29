
(function(w) {

	/**
	 * 请求服务器
	 * @param {URIString} url : 请求的url
	 * @param {URIString} type : 请求类型GetPost
	 * @param {JSON} data : 请求发送的数据仅在Post类型下有效
	 * @param {Function} suc : 请求成功后的回调
	 */
	w.getSvr = function(url, type, data, suc) {
		xhrCreate(url, type, data, suc);
	}

	var _wait;

	function openWaiting() {
		if(_wait) _wait.close();
		_wait = plus.nativeUI.showWaiting("处理中，请等待..."
			//		, {
			//			loading: {
			//				icon: "/img/waiting.png"
			//			}
			//		}
		);
	}

	function xhrCreate(showloading, url, type, data, suc) {
		var _type = type.toUpperCase();
		var xhr = new plus.net.XMLHttpRequest();
		xhr.onreadystatechange = function() {
			switch(xhr.readyState) {
				case 1:
					if(showloading) openWaiting();
					console.log("xhr请求已打开");
					break;
				case 4:
					if(showloading && _wait) _wait.close();
					if(xhr.status == 200) {
						console.log("xhr请求成功：" + xhr.responseText);
						if(suc) suc(xhr.responseText);
					} else {
						console.log("xhr请求失败：" + xhr.status);
					}
					break;
			}
		}
		xhr.open(_type, url);
		if(_type == "POST") {
			xhr.setRequestHeader('Content-Type', 'application/json');
			// 发送HTTP请求
			xhr.send(JSON.stringify(data));
		} else if(_type == "GET") {
			xhr.send();
		}
	}
	/**
	 * 请求服务器 结束------------------------------------------------------------------------------
	 */

	w.NConfirm = function(title, content, btns, callback) {
		if(btns == null) btns == ['确定'];
		plus.nativeUI.confirm(content, function(e) {
			var i = e.index;
			if(callback) callback(i);
		}, title, btns);
	}

	w.NAlert = function(title, content, callback) {
		plus.nativeUI.alert(content, function(e) {
			var i = e.index;
			if(callback) callback(i);
		}, title, '确定');
	}

})(window);