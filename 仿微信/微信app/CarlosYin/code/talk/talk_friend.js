(function(w) {
	//构建底部聊天输入控件
	mui.init({
		gestureConfig: {
			longtap: true, //默认为false
		}
	});
	var _TalkControl = new mui.TalkControl();
	document.addEventListener('plusready', function() {

	});

	//用户国际化语言设置，目前采取的是读取文件后回调，以后还需要想到更好的解决方案
	w.GlobalizotionReload = function() {
		//		document.body.querySelector('.choose-language').innerHTML = gloInfo.index.language;
		//		document.body.querySelector('.btn-login').innerHTML = gloInfo.index.btnLogin;
		//		document.body.querySelector('.btn-regist').innerHTML = gloInfo.index.btnRegist;
	}

	mui.init({
		pullRefresh: {
			container: '#pullrefresh',
			down: {
				callback: pulldownRefresh
			},
			up: {
				contentrefresh: '正在加载...',
				callback: pullupRefresh
			}
		}
	});
	/**
	 * 下拉刷新具体业务实现
	 */
	function pulldownRefresh() {
		setTimeout(function() {
			var table = document.body.querySelector('.mui-table-view');
			var cells = document.body.querySelectorAll('.mui-table-view-cell');
			for(var i = cells.length, len = i + 3; i < len; i++) {
				var li = document.createElement('li');
				li.className = 'mui-table-view-cell';
				li.innerHTML = '<a class="mui-navigate-right">Item ' + (i + 1) + '</a>';
				//下拉刷新，新纪录插到最前面；
				table.insertBefore(li, table.firstChild);
			}
			mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
		}, 500);
	}
	var count = 0;
	/**
	 * 上拉加载具体业务实现
	 */
	function pullupRefresh() {
		mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
	}

})(window);

// 播放音频文件
function playAudio(li) {
	if(!li || !li.entry) {
		ouSet('无效的音频文件');
		return;
	}
	console.log('播放音频文件：' + li.entry.name);
	startPlay('_doc/audio/' + li.entry.name);
}

// 播放文件相关对象
var p = null,
	pt = null,
	pp = null,
	ps = null,
	pi = null;
// 开始播放
function startPlay(url) {
	p = plus.audio.createPlayer(url);
	p.play(function() {
		// 播放完成
		stopPlay();
	}, function(e) {
		console.log('播放音频文件"' + url + '"失败：' + e.message);
	});
	// 获取总时长
	var d = p.getDuration();
//	if(!d) {
//		pt.innerText = '00:00:00/' + timeToStr(d);
//	}
	pi = setInterval(function() {
//		if(!d) { // 兼容无法及时获取总时长的情况
//			d = p.getDuration();
//		}
//		var c = p.getPosition();
//		if(!c) { // 兼容无法及时获取当前播放位置的情况
//			return;
//		}
//		pt.innerText = timeToStr(c) + '/' + timeToStr(d);
//		var pct = Math.round(L * c / d);
//		if(pct < 8) {
//			pct = 8;
//		}
//		ps.style.width = pct + 'px';
	}, 1000);
}
// 停止播放
function stopPlay() {
	clearInterval(pi);
	pi = null;
	setTimeout(resetPlay, 500);
	// 操作播放对象
	if(p) {
		p.stop();
		p = null;
	}
}

			// 重置播放页面内容
			function resetPlay() {
				ep.style.display = 'none';
				ps.style.width = '8px';
				ps.style.webkitTransition = 'all 1s linear';
				pt.innerText = '00:00:00/00:00:00';
			}