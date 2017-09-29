(function(w) {
	document.addEventListener('plusready', function() {
		init();
	});

	//用户国际化语言设置，目前采取的是读取文件后回调，以后还需要想到更好的解决方案
	w.GlobalizotionReload = function() {
		document.querySelector('.mui-pull-text').innerHTML = gloInfo.setLanguage.header.back;
		document.querySelector('.mui-title').innerHTML = gloInfo.setLanguage.header.h1;
		document.querySelector('.btn-success').innerHTML = gloInfo.setLanguage.header.btnSuccess;
	}
	var _self;

	function init() {

		mui.init({
			gestureConfig:{
				doubletap:true
			},
			subpages:[{
				url:'list.html',
				id:'list.html',
				styles:{
					top: '65px',
					bottom: '0px',
				}
			}]
		});

		function pulldownRefresh() {
			setTimeout(function() {
				_self.endPullToRefresh();
			}, 1500);
		}

		var _language = GLOBALIZOTION;
		console.log('当前运行中的语言:' + _language);
		//完成按钮事件
		document.querySelector('.btn-success').addEventListener('tap', function(e) {
			//是否有设置语言
			var isChanage = ('' + this.classList).indexOf('btn-success-disabled') >= 0 ? false : true;
			//如果没有改变语言
			if(!isChanage) return;

			console.log('开始改变语言');
		})
	}

})(window);