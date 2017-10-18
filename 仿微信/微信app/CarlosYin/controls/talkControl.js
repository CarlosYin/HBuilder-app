(function($, window, document) {

	//聊天控件
	var TalkControl = $.TalkControl = $.Class.extend({
		/**
		 * 构造 TalkControl 实例
		 **/
		init: function() {
			var self = this;
			self.el = {};
			self.voice = {};
			self.isShowMorePanel = false;
			self.voice.record = new mui.TalkAudio();
			self.createDom();
		},
		createDom: function() {
			var self = this;
			var _footer = document.createElement('footer');
			_footer.classList = "ub ub-pc ub-ac talk-control";

			var _voice = document.createElement('div');
			_voice.classList = "ub ub-img voice";
			_voice.addEventListener($.EVENT_CLICK, function(e) {
				self.el.input.remove();
				self.el.face.remove();
				self.el.more.remove();
				self.el.footer.append(self.el.voicepanel);
				self.el.footer.append(self.el.face);
				self.el.footer.append(self.el.more);
			})
			_footer.appendChild(_voice);
			self.el.voice = _voice;

			var _input = document.createElement('div');
			_input.classList = "ub ub-f1";
			_input.innerHTML = "<input />";
			_footer.appendChild(_input);
			self.el.input = _input;

			var _voicepanel = document.createElement('div');
			_voicepanel.classList = "ub ub-f1 voicepanel";
			var _btn_voice = document.createElement('div');
			_btn_voice.classList = "ub ub-pc ub-ac btn-voice";
			_btn_voice.innerHTML = "按住 说话";

			//开始录音
			_btn_voice.addEventListener('longtap', function(e) {
				self.voice.beginTime = new Date();
				self.showTape();
				self.voice.record.startRecord();
			})

			//录音结束
			_btn_voice.addEventListener($.EVENT_END, function(e) {
				console.log('EVENT_END' + e.pageX + e.pageY);
				self.voice.endTime = new Date();
				console.log(parseInt(self.voice.endTime - self.voice.beginTime) / 1000);

				self.voice.record.stopRecord();

			})

			_voicepanel.appendChild(_btn_voice);
			self.el.btn_voice = _btn_voice;

			self.el.voicepanel = _voicepanel;

			var _face = document.createElement('div');
			_face.classList = "ub face";
			_face.innerHTML = "face";
			_footer.appendChild(_face);
			self.el.face = _face;

			var _more = document.createElement('div');
			_more.classList = "ub more";
			_more.innerHTML = "more";
			_more.addEventListener($.EVENT_CLICK, function(e) {
				self.showMorePanel();
			})
			_footer.appendChild(_more);
			self.el.more = _more;

			document.body.appendChild(_footer);
			self.el.footer = _footer;

			//失去焦点 更多面板自动隐藏
			document.body.addEventListener($.EVENT_CLICK, function(event) {
				var ev = ev || window.event;
				var target = ev.target || ev.srcElement;
				var isTalkInputPanle = false,
					_classList;
				while(target.classList) {
					_classList = target.classList;
					isTalkInputPanle = _classList.contains('more') | _classList.contains('more-panel');
					if(isTalkInputPanle == 1) break;
					target = target.parentNode;
				}
				//如果触点没有在btnmore和morepanel中，并且morepanel处于展示中，则关闭morepanel
				if(isTalkInputPanle == 0 && self.isShowMorePanel) {
					self.showMorePanel();
				}
			})

			TalkMore = new mui.TalkMore();
			self.el.TalkMore = TalkMore;

		},

		showTape: function() {

		},

		//更多界面的显示/隐藏
		showMorePanel: function() {
			var self = this;
			var AniDec = 0.2;
			if(self.isShowMorePanel) {
				JT.to('.talk-control', AniDec, {
					bottom: 0
				});
				JT.to('.more-panel', AniDec, {
					bottom: -225,
					onEnd: AniEnd
				});

				function AniEnd() {
					self.el.TalkMore.el.morePanel.classList.add('mui-hidden');
				}
				self.el.TalkMore.el.morePanel.classList.remove('ub');

			} else {
				JT.to('.talk-control', AniDec, {
					bottom: 225
				});
				JT.to('.more-panel', AniDec, {
					bottom: 0,
					onEnd: AniEnd
				});

				function AniEnd() {
					self.el.TalkMore.el.morePanel.classList.add('ub');
				}
				self.el.TalkMore.el.morePanel.classList.remove('mui-hidden');
			}
			self.isShowMorePanel = !self.isShowMorePanel;
		}

	});

	//更多
	var TalkMore = $.TalkMore = $.Class.extend({
		init: function() {
			var self = this;
			self.el = {};
			self.isShowMorePanel = false;
			self.createDom();
		},
		createDom: function() {
			var self = this;
			var _morePanel = document.createElement('div');
			_morePanel.classList = "more-panel mui-hidden";
			document.body.appendChild(_morePanel);
			self.el.morePanel = _morePanel;
		}
	});

	//录音实现
	var TalkAudio = $.TalkAudio = $.Class.extend({
		init: function() {
			var self = this;
			self.gentry = null;
			self.er = document.querySelector('#record');

			plus.io.resolveLocalFileSystemURL('_doc/', function(entry) {
				entry.getDirectory('audio', {
					create: true
				}, function(dir) {
					self.gentry = dir;
				}, function(e) {
					console.log('Get directory "audio" failed: ' + e.message);
				});
			}, function(e) {
				console.log('Resolve "_doc/" failed: ' + e.message);
			});

			self.createDom();
		},
		createDom: function() {

		},
		startRecord: function() {
			var self = this;
			self.record = {};
			self.docUrl = null;
			self.record.r = null;
			self.record.t = null;
			self.record.ri = null;
			self.record.rt = null;
			self.record.er = document.querySelector('#record');
			self.record.rt = document.querySelector('.voice-lev');
			self.EUl = document.querySelector('.mui-table-view');
			self.record.r = plus.audio.getRecorder();
			if(self.record.r == null) {
				return;
			}
			self.record.r.record({
				filename: '_doc/audio/'
			}, function(p) {
				self.docUrl = p;
				plus.io.resolveLocalFileSystemURL(p, function(entry) {
					self.showRecord(entry);
				}, function(e) {
					console.log('读取录音文件错误：' + e.message);
				});
			}, function(e) {
				console.log('录音失败：' + e.message);
			});
			self.record.er.style.display = 'block';
			self.record.t = 0;
			self.record.ri = setInterval(function() {
				self.record.t++;
				var _levnum = (self.record.t % 4) + 1;
				var _levnum2 = 4;
				if(_levnum != 1) _levnum2 = _levnum - 1;
				var _lc = 'lev' + _levnum;
				var _lc2 = 'lev' + _levnum2;
				self.record.rt.classList.remove(_lc2);
				self.record.rt.classList.add(_lc);
			}, 1000);
		},

		// 停止录音
		stopRecord: function() {
			var self = this;
			self.record.er.style.display = 'none';
			clearInterval(self.record.ri);
			self.record.ri = null;
			self.record.r.stop();
			self.record.r = null;
			self.record.t = 0;
		},
		//添加录音到界面
		showRecord: function(entry) {
			var self = this;
			console.log('showRecord:' + entry);

			var li = document.createElement('li');
			li.className = 'ditem';
			li.innerHTML = '<span class="iplay"><font class="aname"></font><br/><font class="ainf"></font></span>';
			li.setAttribute('onclick', 'playAudio(this)');
//			hl.insertBefore(li, le.nextSibling);
			li.querySelector('.aname').innerText = entry.name;
			li.querySelector('.ainf').innerText = '...';
			li.entry = entry;
			self.updateInformation(li);
			// 设置空项不可见
			self.EUl.appendChild(li);
		},

		updateInformation: function(li) {
			if(!li || !li.entry) {
				return;
			}
			var entry = li.entry;
			entry.getMetadata(function(metadata) {
				li.querySelector('.ainf').innerText = dateToStr(metadata.modificationTime);
			}, function(e) {
				outLine('获取文件"' + entry.name + '"信息失败：' + e.message);
			});
		}

	});

})(mui, window, document);