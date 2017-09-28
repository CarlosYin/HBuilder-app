(function($) {
	mui.init({
		swipeBack: false,
		keyEventBind: {
			backbutton: false //关闭back按键监听
		},
		pullRefresh: {
			container: '#pullrefresh',
			up: {
				contentrefresh: '正在加载...',
				callback: pullupRefresh
			}
		}
	});
	var count = 0;
	/**
	 * 上拉加载具体业务实现
	 */
	function pullupRefresh() {
		setTimeout(function() {
			mui('#pullrefresh').pullRefresh().endPullupToRefresh((++count > 2)); //参数为true代表没有更多数据了。
			var table = document.body.querySelector('.mui-table-view');
			var cells = document.body.querySelectorAll('.mui-table-view-cell');
			for(var i = cells.length, len = i + 20; i < len; i++) {

				var _htmltemp = '';

				var _div = document.createElement('div');
				_div.classList = 'mui-card';
				_htmltemp += '<div class="mui-card-header">';
				_htmltemp += '	<div class="mui-media-body ub-fh">';
				_htmltemp += '		<p class="c1 list-title"><span>java初级开发工程师</span><span class="datetime">9月21日 20:31</span></p>';
				_htmltemp += '		<p>';
				_htmltemp += '			<span class="mui-icon iconfont icon-dianzan dianzan-active"></span>';
				_htmltemp += '			<span class="mui-icon iconfont icon-dianzan dianzan-active"></span>';
				_htmltemp += '			<span class="mui-icon iconfont icon-dianzan dianzan-active"></span>';
				_htmltemp += '			<span class="mui-icon iconfont icon-dianzan dianzan-active"></span>';
				_htmltemp += '			<span class="mui-icon iconfont icon-dianzan"></span>';
				_htmltemp += '		</p>';
				_htmltemp += '	</div>';
				_htmltemp += '</div>';
				_htmltemp += '<div class="mui-card-content">';
				_htmltemp += '	<div class="mui-card-content-inner">如果水电费水电费时代上的根深蒂固为二锅头个人陶羿</div>';
				_htmltemp += '</div>';
				_htmltemp += '<div class="mui-card-footer">';
				_htmltemp += '	<a class="mui-card-link"></a>';
				_htmltemp += '	<a class="mui-card-link link-agree">同意</a>';
				_htmltemp += '</div>';
				_div.innerHTML = _htmltemp;
				table.appendChild(_div);
			}
		}, 1000);
	}

	document.querySelector('.mui-scroll').addEventListener('tap', function(ev) {
		var ev = ev || window.event;
		var target = ev.target || ev.srcElement;
		var _list = '' + target.classList;
		var _index = parseInt(_list.indexOf('link-agree'));
		if(_index > 0) {
			alert('同意');
		}
	});
})(mui);