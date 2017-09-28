(function($) {

	//	//阻尼系数
	//	var deceleration = mui.os.ios ? 0.003 : 0.0009;
	//
	//	$('.mui-content').scroll({
	//		deceleration: deceleration //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
	//	});

	document.body.querySelector('#openComment').addEventListener('tap', function(e) {
		clicked('comment_list.html',false);
	})

	document.body.querySelector('.btn-comment').addEventListener('tap', function(e) {
		clicked('review.html',false);
	})

	document.body.querySelector('.btn-pluralism').addEventListener('tap', function(e) {
		plus.runtime.openURL('https://www.baidu.com');
	})
})(mui);