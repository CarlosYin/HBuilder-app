(function(w) {
	document.addEventListener('plusready', function() {
		init();
		mui.init({
			gestureConfig: {
				tap: true, //默认为true
				doubletap: true //默认为false
			}
		});
		onload();
	});


	document.body.querySelector('.home-list').addEventListener('doubletap', function() {
		var wv_index_list = plus.webview.getWebviewById('index_list.html');
		var _data = {
			num: badge_index
		};
		mui.fire(wv_index_list, 'HomeDoubleTap', _data);

	})

	var badge_index = 0;
	var badge_faxian = 0;

	badge_index = Math.floor(Math.random() * 60);
	document.querySelector('.mui-title').innerHTML = "微信(" + badge_index + ")";;
	document.querySelector('.icon-message').querySelector('.mui-badge').innerHTML = badge_index;

	badge_faxian = Math.floor(Math.random() * 25);
	document.querySelector('.icon-faxian1').querySelector('.mui-badge').innerHTML = badge_faxian;

	//用户国际化语言设置，目前采取的是读取文件后回调，以后还需要想到更好的解决方案
	w.GlobalizotionReload = function() {
		//		document.body.querySelector('.choose-language').innerHTML = gloInfo.index.language;
		//		document.body.querySelector('.btn-login').innerHTML = gloInfo.index.btnLogin;
		//		document.body.querySelector('.btn-regist').innerHTML = gloInfo.index.btnRegist;
	}

	function init() {
		lightStyle();
	}

	var subpages = ['index_list.html', 'index_contacts.html', 'index_find.html', 'index_me.html'];
	var subpage_style = {
		top: '60px',
		bottom: '51px'
	};
	var aniShow = {};

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

	//选项卡点击事件
	mui('.mui-bar-tab').on('tap', 'a', function(e) {
		var targetTab = this.getAttribute('href');

		ShowPage(targetTab, this.querySelector('.mui-tab-label').innerHTML, this.querySelector('.iconfont').classList);
	});

	function ShowPage(targetTab, _title, icon) {
		if(targetTab == activeTab) {
			return;
		}

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

		if(icon.contains('icon-xiaoxi')) {
			icon.remove('icon-xiaoxi');
			icon.add('icon-message');
			reloadIcon(2);
			reloadIcon(3);
			reloadIcon(4);
			showBtn(1, _title);
		} else if(icon.contains('icon-tongxunlu')) {
			icon.remove('icon-tongxunlu');
			icon.add('icon-icon161607');
			reloadIcon(1);
			reloadIcon(3);
			reloadIcon(4);
			showBtn(2, _title);
		} else if(icon.contains('icon-faxian1')) {
			icon.remove('icon-faxian1');
			icon.add('icon-faxian');
			reloadIcon(1);
			reloadIcon(2);
			reloadIcon(4);
			showBtn(3, _title);
		} else if(icon.contains('icon-me-copy')) {
			icon.remove('icon-me-copy');
			icon.add('icon-wo');
			reloadIcon(1);
			reloadIcon(2);
			reloadIcon(3);
			showBtn(4, _title);
		}

		//更改当前活跃的选项卡
		activeTab = targetTab;
	}

	//恢复其他图标
	function reloadIcon(type) {
		var e1 = null;
		switch(type) {
			case 1:
				e1 = document.querySelector('.icon-message');
				if(e1) {
					e1.classList.add('icon-xiaoxi');
					e1.classList.remove('icon-message');
				}
				break;
			case 2:
				e1 = document.querySelector('.icon-icon161607');
				if(e1) {
					e1.classList.add('icon-tongxunlu');
					e1.classList.remove('icon-icon161607');
				}
				break;
			case 3:
				e1 = document.querySelector('.icon-faxian');
				if(e1) {
					e1.classList.add('icon-faxian1');
					e1.classList.remove('icon-faxian');
				}
				break;
			case 4:
				e1 = document.querySelector('.icon-wo');
				if(e1) {
					e1.classList.add('icon-me-copy');
					e1.classList.remove('icon-wo');
				}
				break;
		}

	}

	function showBtn(type, _title) {

		var e_header = document.querySelector('header');
		e_header.innerHTML = "";
		var h1 = document.createElement('h1');
		h1.classList = "mui-title";

		var btn_wx = document.createElement('a');

		h1.innerHTML = _title;
		switch(type) {
			case 1:
				h1.innerHTML = "微信(" + badge_index + ")";
				e_header.appendChild(h1);
				btn_wx.classList = "mui-icon mui-icon mui-icon-closeempty mui-pull-right";
				e_header.appendChild(btn_wx);
				break;
			case 2:
				e_header.appendChild(h1);
				btn_wx.classList = "mui-icon mui-icon mui-icon mui-icon-refreshempty mui-pull-right";
				e_header.appendChild(btn_wx);
				break;
			case 3:
				e_header.appendChild(h1);
				break;
			case 4:
				e_header.appendChild(h1);
				break;
		}
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

})(window);