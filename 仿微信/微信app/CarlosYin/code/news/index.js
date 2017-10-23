(function(w) {
	document.addEventListener('plusready', function() {
		init();
		mui.init({
			gestureConfig: {
				tap: true, //默认为true
				doubletap: true //默认为false
			}
		});
		mui('.mui-scroll-wrapper').scroll().scrollToBottom();
	});

	//用户国际化语言设置，目前采取的是读取文件后回调，以后还需要想到更好的解决方案
	w.GlobalizotionReload = function() {
		//		document.body.querySelector('.choose-language').innerHTML = gloInfo.index.language;
		//		document.body.querySelector('.btn-login').innerHTML = gloInfo.index.btnLogin;
		//		document.body.querySelector('.btn-regist').innerHTML = gloInfo.index.btnRegist;
	}

	function init() {
		lightStyle();
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

	var _day = null;

	function pulldownRefresh() {
		setTimeout(function() {
			var table = document.body.querySelector('.mui-table-view');
			var cells = document.body.querySelectorAll('.mui-table-view-cell');

			var li = document.createElement('div');
			li.classList = "mui-card";
			_html = '';
			_html += '<div class="mui-card-header mui-card-media openurl" href="https://xw.qq.com/cmsid/20171023A03WCZ00" style="height:40vw;background-image:url(http://inews.gtimg.com/newsapp_bt/0/2195997276/1000)">';
			_html += '	<div class="mui-card-text">甄子丹13岁女儿发育太快过于早熟</div>';
			_html += '</div>';
			_html += '<div class="mui-card-content">';
			_html += '	<div class="mui-card-content-inner">';
			_html += '		<ul class="mui-table-view">';
			_html += '			<li class="ub ub-ac mui-table-view-cell openurl" href="https://xw.qq.com/cmsid/20171023A04EX500">';
			_html += '				<span class="ub ub-f1">张国立邓婕合体撒狗粮，结婚29年合作16部戏</span>';
			_html += '				<span class="ub smallimg ub-img" style="background-image:url(../../Resources/home/tx/10.jpg) ;"></span>';
			_html += '			</li>';
			_html += '			<li class="ub ub-ac mui-table-view-cell openurl" href="https://xw.qq.com/cmsid/20171023A04EX500">';
			_html += '				<span class="ub ub-f1">张国立邓婕合体撒狗粮，结婚29年合作16部戏</span>';
			_html += '				<span class="ub smallimg ub-img" style="background-image:url(../../Resources/home/tx/10.jpg) ;"></span>';
			_html += '			</li>';
			_html += '			<li class="ub ub-ac mui-table-view-cell openurl" href="https://xw.qq.com/cmsid/20171023A04EX500">';
			_html += '				<span class="ub ub-f1">张国立邓婕合体撒狗粮，结婚29年合作16部戏</span>';
			_html += '				<span class="ub smallimg ub-img" style="background-image:url(../../Resources/home/tx/10.jpg) ;"></span>';
			_html += '			</li>';
			_html += '		</ul>';
			_html += '	</div>';
			_html += '</div>';
			li.innerHTML = _html;
			table.insertBefore(li, table.firstChild);

			var li2 = document.createElement('li');
			li2.classList = "ub ub-pc";

			var _date = new Date();
			if(!_day) _day = _date.getDate() - 1;
			else _day--;
			if(_day <= 1) _day = 1;

			var str_date = _date.getFullYear() + '-' + (_date.getMonth() + 1) + '-' + _day;
			li2.innerHTML = '<span class="ub ub-pc ub-ac dtime">' + str_date + '</span>';
			table.insertBefore(li2, table.firstChild);

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

	//列表项的选择
	document.body.querySelector('.mui-table-view').addEventListener('tap', function(e) {
		var ev = ev || window.event;
		var target = ev.target || ev.srcElement;

		while(target.classList) {
			if(target.classList.contains('openurl')) {
				var ourl = target.getAttribute('href');
				plus.storage.setItem('openurl', ourl);
				clicked('/CarlosYin/code/openurl/index.html', false, false, null, 'slide-in-right');
				break;
			}
			target = target.parentNode;
		}
	});

})(window);