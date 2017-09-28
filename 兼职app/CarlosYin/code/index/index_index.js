(function($) {
	//	//阻尼系数
	//	var deceleration = mui.os.ios ? 0.003 : 0.0009;
	//	
	//	
	//	var pageIndex = 0;
	//	var silderIndex = 0;
	//
	//	$('.mui-scroll-wrapper').scroll({
	//		deceleration: deceleration //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
	//	});
	//	$('.mui-control-content').scroll({
	//		deceleration: deceleration //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
	//	});
	//
	//	var _height = document.body.clientHeight - 65;
	//	document.body.querySelector('#discovery').style.height = _height + 'px';
	//	console.log(_height);
	//
	//	var _date = new Date();
	//	document.body.querySelector('.disc-topbtn-daily').innerHTML = _date.getDate();
	//
	//	$(document).imageLazyload({
	//		placeholder: '../Resources/cm2_blk_facemask@3x.png'
	//	});
	//
	//	$.ready(function() {
	//		$.init({
	//			pullRefresh: {
	//				container: '#item2wrapper',
	//				down: {
	//					contentdown: "下拉可以刷新", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
	//					contentover: "释放立即刷新", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
	//					contentrefresh: "正在刷新...",
	//					callback: pulldownRefresh
	//				},
	//				up: {
	//					contentdown: "下拉可以刷新", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
	//					contentover: "释放立即刷新", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
	//					contentrefresh: "正在刷新...",
	//					callback: pullupRefresh
	//				}
	//			}
	//		});
	//
	//		/**
	//		 * 下拉刷新具体业务实现
	//		 */
	//		function pulldownRefresh() {
	//			setTimeout(function() {
	//				//				var table = document.body.querySelector('.mui-table-view');
	//				//				var cells = document.body.querySelectorAll('.mui-table-view-cell');
	//				//				for(var i = cells.length, len = i + 3; i < len; i++) {
	//				//					var li = document.createElement('li');
	//				//					li.className = 'mui-table-view-cell';
	//				//					li.innerHTML = '<a class="mui-navigate-right">Item ' + (i + 1) + '</a>';
	//				//					//下拉刷新，新纪录插到最前面；
	//				//					table.insertBefore(li, table.firstChild); 
	//				//				}
	//				mui('#item2wrapper').pullRefresh().endPulldownToRefresh(); //refresh completed
	//			}, 1500);
	//		}
	//		var count = 0;
	//		/**
	//		 * 上拉加载具体业务实现
	//		 */
	//		function pullupRefresh() {
	//			setTimeout(function() {
	//				mui('#item2wrapper').pullRefresh().endPullupToRefresh((++count > 2)); //参数为true代表没有更多数据了。
	//				var table = document.body.querySelector('.mui-table-view');
	//				var cells = document.body.querySelectorAll('.mui-table-view-cell');
	//				for(var i = cells.length, len = i + 5; i < len; i++) {
	//					var li = document.createElement('li');
	//					li.className = 'mui-table-view-cell';
	//					li.innerHTML = '<a class="mui-navigate-right">Item ' + (i + 1) + '</a>';
	//					table.appendChild(li);
	//				}
	//			}, 1500);
	//		}
	//
	//		//		var html2 = '<ul class="mui-table-view"><li class="mui-table-view-cell">第二个选项卡子项-1</li><li class="mui-table-view-cell">第二个选项卡子项-2</li><li class="mui-table-view-cell">第二个选项卡子项-3</li><li class="mui-table-view-cell">第二个选项卡子项-4</li><li class="mui-table-view-cell">第二个选项卡子项-5</li></ul>';
	//		//		var html3 = '<ul class="mui-table-view"><li class="mui-table-view-cell">第三个选项卡子项-1</li><li class="mui-table-view-cell">第三个选项卡子项-2</li><li class="mui-table-view-cell">第三个选项卡子项-3</li><li class="mui-table-view-cell">第三个选项卡子项-4</li><li class="mui-table-view-cell">第三个选项卡子项-5</li></ul>';
	//		//		var item2 = document.getElementById('item2mobile');
	//		//		var item3 = document.getElementById('item3mobile');
	//		document.getElementById('slider').addEventListener('slide', function(e) {
	//			silderIndex = e.detail.slideNumber;
	//			console.log(e.detail.slideNumber);
	//			//			if(e.detail.slideNumber === 1) {
	//			//				if(item2.querySelector('.mui-loading')) {
	//			//					setTimeout(function() {
	//			//						item2.querySelector('.mui-scroll').innerHTML = html2;
	//			//					}, 500);
	//			//				}
	//			//			} else if(e.detail.slideNumber === 2) {
	//			//				if(item3.querySelector('.mui-loading')) {
	//			//					setTimeout(function() {
	//			//						item3.querySelector('.mui-scroll').innerHTML = html3;
	//			//					}, 500);
	//			//				}
	//			//			}
	//		});
	//
	//		var swiper = new Swiper('.swiper-container', {
	//			pagination: '.swiper-pagination',
	//			slidesPerView: 1,
	//			paginationClickable: true,
	//			loop: true,
	//			centeredSlides: true,
	//			autoplay: 2500,
	//			autoplayDisableOnInteraction: false
	//		});
	//
	//		var title = document.querySelector("#title");
	//		//选项卡点击事件
	//		mui('.mui-bar-tab').on('tap', 'a', function(e) {
	//			//更换标题
	//			title.innerHTML = this.querySelector('.mui-tab-label').innerHTML;
	//		});
	//		
	//		
	//		
	//		//监听手势左移
	//			document.body.querySelector('#main').addEventListener("swipeleft", function() {
	//				if(silderIndex<2) return;
	//				
	//				
	//				if(pageIndex < 4){
	//					console.log('切换页面');
	//					var link2 = document.body.querySelector('#mymusic');
	//					console.log(link2.id);
	//					link2.click("return false");
	//				}
	//				
	//			});
	//	});

	onload();

	document.addEventListener('plusready', function() {
		//console.log("所有plus api都应该在此事件发生后调用，否则会出现plus is undefined。"
		onload();
	});

	function onload() {
		var swiper = new Swiper('.swiper-container', {
			pagination: '.swiper-pagination',
			slidesPerView: 1,
			paginationClickable: true,
			loop: true,
			centeredSlides: true,
			autoplay: 2500,
			autoplayDisableOnInteraction: false
		});

		var group = new webviewGroup("index_index.html", {
			items: [{
				id: "index_index_recommend.html",
				url: "index_index_recommend.html",
				extras: {}
			}, {
				id: "index_index_hot.html",
				url: "index_index_hot.html",
				extras: {}
			}],
			onChange: function(obj) {
				var c = document.querySelector(".toptype-active");
				if(c) {
					c.classList.remove("toptype-active");
				}
				var nthNum = 1;
				if(obj.index > 0) nthNum = 3;
				document.querySelector(".toptype .toptype-item:nth-child(" + nthNum + ")").classList.add("toptype-active");
			}
		});
		mui(".toptype").on("tap", ".toptype-item", function(e) {
			var wid = this.getAttribute("data-wid");
			group.switchTab(wid);
		});
	}
})(mui);