(function($) {
	var subpages = ['index_index.html', 'index_rank.html', 'index-tellus.html', 'index-about.html'];
	var subpage_style = {
		top: '60px',
		bottom: '51px'
	};
	var aniShow = {};
	document.addEventListener('plusready', function() {
		//console.log("所有plus api都应该在此事件发生后调用，否则会出现plus is undefined。"
		onload();
	});

	function onload() {
		var self = plus.webview.currentWebview();
		for(var i = 0; i < 4; i++) {
			var temp = {};
			var sub = plus.webview.create(subpages[i], subpages[i], subpage_style);
			if(i > 0) {
				sub.hide();
			} else {
				temp[subpages[i]] = "true";
				mui.extend(aniShow, temp);
			}
			self.append(sub);
		}
	}

	//当前激活选项
	var activeTab = subpages[0];
	var title = document.querySelector(".mui-title");
	//选项卡点击事件
	mui('.mui-bar-tab').on('tap', 'a', function(e) {
		var targetTab = this.getAttribute('href');
		ShowPage(targetTab, this.querySelector('.mui-tab-label').innerHTML);
	});

	function ShowPage(targetTab, _title) {
		if(targetTab == activeTab) {
			return;
		}
		//更换标题
		title.innerHTML = _title;
		//显示目标选项卡
		//若为iOS平台或非首次显示，则直接显示
		if(mui.os.ios || aniShow[targetTab]) {
			plus.webview.show(targetTab);
		} else {
			//否则，使用fade-in动画，且保存变量
			var temp = {};
			temp[targetTab] = "true";
			mui.extend(aniShow, temp);
			plus.webview.show(targetTab, "fade-in", 300);
		}
		//隐藏当前;
		plus.webview.hide(activeTab);
		//更改当前活跃的选项卡
		activeTab = targetTab;
	}
	//自定义事件，模拟点击“首页选项卡”
	document.addEventListener('gohome', function() {
		var defaultTab = document.getElementById("defaultTab");
		//模拟首页点击
		mui.trigger(defaultTab, 'tap');
		//切换选项卡高亮
		var current = document.querySelector(".mui-bar-tab>.mui-tab-item.mui-active");
		if(defaultTab !== current) {
			current.classList.remove('mui-active');
			defaultTab.classList.add('mui-active');
		}
	});

})(mui);