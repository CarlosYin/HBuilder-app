(function($) {

	document.addEventListener('plusready', function() {
		//console.log("所有plus api都应该在此事件发生后调用，否则会出现plus is undefined。"
		onload();
	});

	function onload() {
		var group = new webviewGroup("index_rank.html", {
			items: [{
				id: "index_rank_comment.html",
				url: "index_rank_comment.html",
				extras: {}
			}, {
				id: "index_rank_score.html",
				url: "index_rank_score.html",
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