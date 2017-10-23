(function(w) {
	//构建底部聊天输入控件
	mui.init({
		gestureConfig: {
			longtap: true, //默认为false
		}
	});
	document.addEventListener('plusready', function() {
		var _TalkControl = new mui.TalkControl();
		document.querySelector('.mui-title').innerHTML = plus.storage.getItem('tu_name');
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

	var c = 10000;

	function pulldownRefresh() {
		setTimeout(function() {
			var table = document.body.querySelector('.mui-table-view');
			var cells = document.body.querySelectorAll('.mui-table-view-cell');
			

			var li2 = document.createElement('li');
			li2.classList = "ub my text";
			var _html = '';
			_html += '<span class="ub ub-f1 ub-pe text-panel">';
			_html += '	<span class="ub text">这是历史聊天记录' + c + '</span>';
			_html += '</span>';
			_html += '<span class="ub ub-img tx" style="background-image:url(../../Resources/home/tx/0.jpg)"></span>';
			c--;
			li2.innerHTML = _html;
			table.insertBefore(li2, table.firstChild);
			
			
			var li = document.createElement('li');
			li.classList = "ub to text";
			_html = '';
			_html += '<span class="ub ub-img tx" style="background-image:url(../../Resources/home/tx/3.jpg)"></span>';
			_html += '<span class="ub ub-f1 text-panel">';
			_html += '	<span class="ub text">这是历史聊天记录' + c + '</span>';
			_html += '</span>';
			c--;
			li.innerHTML = _html;
			table.insertBefore(li, table.firstChild);

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

	document.querySelector('.to-audio1').addEventListener('tap', function(e) {
		playWav(this);
	})
	document.querySelector('.to-audio2').addEventListener('tap', function(e) {
		playWav(this);
	})

	var p = null;
	var pi = null;
	var _ani = null;

	function playWav(event) {
		var wavurl = event.getAttribute('source');
		var _ani = event.parentNode.querySelector('.ainf');

		console.log(wavurl);
		stopPlay(_ani);
		var _url = '_www/CarlosYin/Resources/' + wavurl;
		p = plus.audio.createPlayer(_url);
		p.play(function() {
			// 播放完成
			stopPlay(_ani);
		}, function(e) {
			console.log('播放音频文件"' + url + '"失败：' + e.message);
		});

		// 获取总时长
		var d = p.getDuration();
		var _time = _ani.getAttribute('time');
		pi = setInterval(function() {
			_time--;
			_ani.innerText = _time + "''";
		}, 1000);

	}

	function stopPlay(_ani) {
		if(p) {
			clearInterval(pi);
			pi = null;
			p.stop();
			p = null;
			setTimeout(resetPlay, 500);
		}

		function resetPlay() {
			var _time = _ani.getAttribute('time');
			_ani.innerText = _time + "''";
		}
	}

})(window);

function sendMsg(){
	
}
