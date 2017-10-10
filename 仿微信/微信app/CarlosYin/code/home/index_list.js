//type 0 普通好友聊天 1群聊 2新闻 3公众号 4系统消息 5微信支付
var listData = [{
	id: 7,
	name: '亲爱的徒儿',
	des: '7878 一天天的忙得要死',
	img: '../../Resources/home/tx/12.jpg',
	time: '上午10:20',
	type: 0,
	badge: 0
}, {
	id: 1,
	name: '%锅盖头%',
	des: '赶紧的，快来楼下永和吃早餐',
	img: '../../Resources/home/tx/0.jpg',
	time: '上午8:20',
	type: 0,
	badge: 0
}, {
	id: 2,
	name: '仙人掌',
	des: '来呀，晚上九宫格走起',
	img: '../../Resources/home/tx/3.jpg',
	time: '2017/9/30',
	type: 0,
	badge: 12
}, {
	id: 3,
	name: '腾讯新闻',
	des: '跨国上班：越南姑娘每天往返中国',
	img: '../../Resources/home/tx/timg.jpeg',
	time: '上午8:00',
	type: 2,
	badge: 7
}, {
	id: 4,
	name: '前端交流群',
	des: '[20条]Udacity-Vicky：加入新人...',
	img: '../../Resources/home/tx/ql.jpg',
	time: '上午11:10',
	type: 1,
	badge: 20
}, {
	id: 5,
	name: '鱼哥哥',
	des: '昨天老板发大脾气咯，听说..',
	img: '../../Resources/home/tx/10.jpg',
	time: '2017/9/30',
	type: 0,
	badge: 0
}, {
	id: 6,
	name: '微信支付',
	des: '零钱提现到账',
	img: '../../Resources/home/tx/wx.jpg',
	time: '2017/9/18',
	type: 5,
	badge: 1
}, {
	id: 8,
	name: '京东商城',
	des: '你要的家居，全都在这里！',
	img: '../../Resources/home/tx/jd.png',
	time: '上午7:00',
	type: 3,
	badge: 4
}, {
	id: 9,
	name: '徐',
	des: '这台电脑是谁的，知道密码不',
	img: '../../Resources/home/tx/1.jpg',
	time: '2017/9/30',
	type: 0,
	badge: 0
}, {
	id: 10,
	name: 'Helen',
	des: '国庆长假放假通知:',
	img: '../../Resources/home/tx/5.jpg',
	time: '2017/9/27',
	type: 0,
	badge: 0
}, {
	id: 11,
	name: '问心',
	des: '我搬新家了啊，周末出来聚餐',
	img: '../../Resources/home/tx/6.jpg',
	time: '2017/9/30',
	type: 0,
	badge: 0
}, {
	id: 12,
	name: '晨曦',
	des: '帮我看看我的电脑，开不了机了',
	img: '../../Resources/home/tx/8.jpg',
	time: '2017/9/30',
	type: 0,
	badge: 3
}, {
	id: 13,
	name: '微信团队',
	des: '欢迎再次回到微信',
	img: '../../Resources/home/tx/sys.png',
	time: '2017/9/30',
	type: 4,
	badge: 0
}];

(function(w) {
	mui('.mui-scroll-wrapper').scroll({
		deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
	});
	document.addEventListener('plusready', function() {

		reanderList();

	});

	//用户国际化语言设置，目前采取的是读取文件后回调，以后还需要想到更好的解决方案
	w.GlobalizotionReload = function() {
		//		document.body.querySelector('.choose-language').innerHTML = gloInfo.index.language;
		//		document.body.querySelector('.btn-login').innerHTML = gloInfo.index.btnLogin;
		//		document.body.querySelector('.btn-regist').innerHTML = gloInfo.index.btnRegist;
	}

	document.addEventListener('HomeDoubleTap', function(event) {
		console.log(event.detail.num);
	})

	function reanderList() {
		var E_list = document.querySelector('.mui-table-view');
		for(var i = 0; i < listData.length; i++) {
			var E_li = document.createElement('li');
			E_li.classList = "mui-table-view-cell mui-media";
			E_li.setAttribute('ltype', listData[i].type);
			E_li.setAttribute('lid', listData[i].id);
			var _html = '';
			_html += '<a href="javascript:;">';
			_html += '	<img class="mui-media-object mui-pull-left" src="' + listData[i].img + '">';
			if(listData[i].badge > 0)
				_html += '	<div class="mui-badge">' + listData[i].badge + '</div>';
			_html += '	<div class="mui-media-body">';
			var className = 'mui-name';
			if(listData[i].type > 1) className += ' sys-color';
			_html += '		<p class="' + className + '">' + listData[i].name + '<span class="time">' + listData[i].time + '</span></p>';
			_html += '		<p class="mui-ellipsis">' + listData[i].des + '</p>';
			_html += '	</div>';
			_html += '</a>';
			E_li.innerHTML = _html;
			E_list.appendChild(E_li);
		}

	}

})(window);