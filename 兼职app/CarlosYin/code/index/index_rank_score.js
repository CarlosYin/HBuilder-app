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
				_htmltemp += '<div class="mui-card-header mui-card-media">';
				_htmltemp += '	<div class="mui-media-body">';
				_htmltemp += '		<p class="c1 title"><span>java初级开发工程师' + i + '</span><span class="money c3">¥100</span></p>';
				_htmltemp += '		<p class="mr-t-10"><span class="iconfont icon-chengshi"></span>北京<span class="iconfont mr-l-10 icon-nianxian"></span>1年以下<span class="iconfont mr-l-10 icon-xueli"></span>本科</p>';
				_htmltemp += '	</div>';
				_htmltemp += '</div>';
				_htmltemp += '<div class="mui-card-content">';
				_htmltemp += '	<div class="ub-img1 company-img" style="background-image: url(CarlosYin/Resources/cm2_discover_banner_kr@3x.jpg);"></div>';
				_htmltemp += '	<div class="mui-card-content-inner">';
				_htmltemp += '		<p class="c1"><span>美团</span> | <span>李一男</span></p>';
				_htmltemp += '		<p class="c2 ft12">这里显示文章摘要，让读者对文章内容有个粗略的概念...</p>';
				_htmltemp += '	</div>';
				_htmltemp += '</div>';
				_htmltemp += '<div class="mui-card-footer">';
				_htmltemp += '	<a class="mui-card-link"></a>';
				_htmltemp += '	<a class="mui-card-link"><span class="link-l">评论数:8</span><span class="link-r">推荐等级3星</span></a>';
				_htmltemp += '</div>';
				_div.innerHTML = _htmltemp;
				table.appendChild(_div);
			}
		}, 1000);
	}
	
	document.querySelector('.mui-scroll').addEventListener('tap', function(ev) {
		var ev = ev || window.event;
		var target = ev.target || ev.srcElement;
		
		while(target.classList !== 'mui-card' ){
            if(target.classList == 'mui-card'){
                clicked('job_detail.html',false);
                break;
            }
            target = target.parentNode;
        }
	});
})(mui);