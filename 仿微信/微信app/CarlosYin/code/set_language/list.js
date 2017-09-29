(function(w) {
	mui.init({
		pullRefresh: {
			container: '#pullrefresh',
			down: {
				contentdown: "", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
				contentover: "", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
				contentrefresh: "",
				callback: pulldownRefresh
			},
			up: {
				contentrefresh: "", //可选，正在加载状态时，上拉加载控件上显示的标题内容
				contentnomore: '',
				contentover: "",
				callback: pullupRefresh
			}
		}
	});
	/**
	 * 下拉刷新具体业务实现
	 */
	function pulldownRefresh() {
		mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
	}
	var count = 0;
	/**
	 * 上拉加载具体业务实现
	 */
	function pullupRefresh() {
		mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
	}
})(window);