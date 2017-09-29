(function(w) {
	document.addEventListener('plusready', function() {
		init();
	});

	//用户国际化语言设置，目前采取的是读取文件后回调，以后还需要想到更好的解决方案
	w.GlobalizotionReload = function() {
		//		document.body.querySelector('.choose-language').innerHTML = gloInfo.index.language;
		//		document.body.querySelector('.btn-login').innerHTML = gloInfo.index.btnLogin;
		//		document.body.querySelector('.btn-regist').innerHTML = gloInfo.index.btnRegist;
	}

	function init() {
		lightStyle();
		GetArea();
		var header = document.querySelector('header.mui-bar');
		var list = document.getElementById('list');
		//calc hieght
		list.style.height = (document.body.offsetHeight - header.offsetHeight) + 'px';
		//create
		window.indexedList = new mui.IndexedList(list);
	}

	//读取国家JSon文件
	function GetArea() {
		var file_url = '_www/CarlosYin/code/login/area.json';
		plus.io.resolveLocalFileSystemURL(file_url, function(entry) {
			entry.file(function(file) {
				var fileReader = new plus.io.FileReader();
				fileReader.readAsText(file, 'utf-8');
				fileReader.onloadend = function(evt) {
					var _fileInfo = JSON.parse(evt.target.result);
					//读取完成后回调
					ReaderArea(_fileInfo);
				}
			});
		}, function(e) {
			NAlert("错误", '读取国家文件失败！');
		});
	}

	//构造页面需要的Dom
	function ReaderArea(areasGroup) {
		var E_bar = document.body.querySelector('.mui-indexed-list-bar');
		var E_list = document.body.querySelector('#elist');
		for(var i = 0; i < areasGroup.length; i++) {
			var _group = areasGroup[i].group;
			var bar_a = document.createElement('a');
			bar_a.innerHTML = _group;
			E_bar.appendChild(bar_a);

			var list_group = document.createElement('li');
			list_group.innerHTML = _group;
			list_group.classList = 'mui-table-view-divider mui-indexed-list-group';
			list_group.setAttribute('data-group', _group);
			E_list.appendChild(list_group);

			var _areas = areasGroup[i].areas;
			for(j = 0; j < _areas.length; j++) {
				var _area = _areas[j].area;
				var _phone = _areas[j].phone;
				var _datavalue = _areas[j].datavalue;
				var _datatags = _areas[j].datatags;
				var list_area = document.createElement('li');
				list_area.innerHTML = '<span class="area">' + _area + '</span><span class="phone">+' + _phone + '</span>';
				list_area.classList = 'mui-table-view-cell mui-indexed-list-item';
				list_area.setAttribute('data-value', _datavalue);
				list_area.setAttribute('data-tags', _datatags);
				E_list.appendChild(list_area);
			}

		}
	}

	//动画持续时间
	var AniDec = 0.3;

	document.body.querySelector('#search').addEventListener('focus', function(e) {
		darkStyle();
		document.body.querySelector('.cover').classList.remove('mui-hidden');
		JT.to('.mui-content', AniDec, {
			paddingTop: "0",
			onEnd: AniEnd
		});

		JT.to('.mui-search', AniDec, {
			height: "65px",
			onEnd: AniEnd
		});

		JT.to('#search', AniDec, {
			marginTop: "25px",
			onEnd: AniEnd
		});

		JT.to('.mui-bar', AniDec, {
			opacity: 0,
			onEnd: AniEnd
		});

		JT.fromTo('.cover', AniDec, {
			opacity: 0,
			top: '40px',
		}, {
			opacity: 1,
			top: '65px',
			onEnd: AniEnd
		});

		function AniEnd() {
			document.body.querySelector('.mui-bar-nav').classList.add('mui-hidden');
		}
	})

	document.body.querySelector('#search').addEventListener('blur', function(e) {
		JT.to('.mui-content', AniDec, {
			paddingTop: "65px",
			onEnd: AniEnd
		});

		JT.to('.mui-search', AniDec, {
			height: "40px",
			onEnd: AniEnd
		});

		JT.to('#search', AniDec, {
			marginTop: "0",
			onEnd: AniEnd
		});

		JT.to('.mui-bar', AniDec, {
			opacity: 1,
			onEnd: AniEnd
		});

		JT.fromTo('.cover', AniDec, {
			opacity: 1,
			top: '65px',
		}, {
			opacity: 0,
			top: '40px',
			onEnd: AniEnd
		});

		function AniEnd() {
			document.body.querySelector('.mui-bar-nav').classList.remove('mui-hidden');
			document.body.querySelector('.cover').classList.add('mui-hidden');
			lightStyle();
		}
	})

	//列表项的选择
	document.body.querySelector('.mui-table-view').addEventListener('tap', function(e) {
		var ev = ev || window.event;
		var target = ev.target || ev.srcElement;
		var _classList, _idx;
		while(target.classList) {
			_classList = '' + target.classList;
			_idx = _classList.indexOf('mui-indexed-list-item');
			if(_idx >= 0) {

				var _area = {
					area: target.querySelector('.area').innerHTML,
					phone: target.querySelector('.phone').innerHTML,
					datavalue: target.getAttribute('data-value'),
					datatags: target.getAttribute('data-tags')
				};

				var wv_loginindex = plus.webview.getWebviewById('/CarlosYin/code/login/index.html');
				mui.fire(wv_loginindex, 'changeArea', _area);
				var wv_curr = plus.webview.currentWebview();
				wv_curr.close();
				break;
			}
			target = target.parentNode;
		}
	});

})(window);