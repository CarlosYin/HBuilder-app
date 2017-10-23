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
			self.el.type = 0;
			var _voice = document.createElement('div');
			_voice.classList = "ub ub-img voice";
			_voice.addEventListener($.EVENT_CLICK, function(e) {
				if(self.el.type == 0) {
					self.el.input.remove();
					self.el.face.remove();
					self.el.more.remove();
					self.el.footer.append(self.el.voicepanel);
					self.el.footer.append(self.el.face);
					self.el.footer.append(self.el.more);
					self.el.type = 1;
				}else{
					self.el.voicepanel.remove();
					self.el.face.remove();
					self.el.more.remove();
					self.el.footer.append(self.el.input);
					self.el.footer.append(self.el.face);
					self.el.footer.append(self.el.more);
					self.el.type  = 0;
				}
			})
			_footer.appendChild(_voice);
			self.el.voice = _voice;

			var _input = document.createElement('div');
			_input.classList = "ub ub-f1";

			var _input_form = document.createElement('form');
			_input_form.classList = "ub ub-f1";
			_input_form.setAttribute('action', 'javascript:sendMsg();');

			var _input_i = document.createElement('input');
			_input_i.classList = "ub";
			_input_i.id = 'sendMsg';
			_input_i.setAttribute('type', 'text');
			_input_i.addEventListener("keyup", function(e) {
				var keyword = this.value; //13
				if(e.keyCode == 13) {
					self.sendMsg(keyword);
					this.value = '';
				}

			}, false);
			_input_form.appendChild(_input_i);
			_input.appendChild(_input_form);
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

		sendMsg: function(Msg) {
			if(Msg == '') return;
			var eul = document.querySelector('.mui-table-view');
			var li = document.createElement('li');
			li.classList = "ub my text";
			var _html = '';
			_html += '<span class="ub ub-f1 ub-pe text-panel">';
			_html += '	<span class="ub text">' + Msg + '</span>';
			_html += '</span>';
			_html += '<span class="ub ub-img tx" style="background-image:url(../../Resources/home/tx/0.jpg)"></span>';
			li.innerHTML = _html;
			eul.appendChild(li);
			mui('.mui-scroll-wrapper').scroll().refresh();
			mui('.mui-scroll-wrapper').scroll().scrollToBottom(100);
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
			self.createDom();

			self.gentry = null;
			self.er = document.querySelector('#record');

			self.record = {};
			self.docUrl = null;
			self.record.r = null;
			self.record.t = null;
			self.record.ri = null;
			self.record.rt = null;
			self.record.er = document.querySelector('#record');
			self.EUl = document.querySelector('.mui-table-view');
			self.record.r = plus.audio.getRecorder();

			self.audio = {};
			self.audio.p = null;
			self.audio.pi = null;

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
			var E_div = document.createElement('div');
			E_div.classList = 'rp';
			E_div.id = 'record';
			var _html = '';
			_html += '<div class="ub ub-pc ub-ac ub-fh ub-fv">';
			_html += '	<div class="ub ub-ver ub-ac record-panel">';
			_html += '		<div class="ub ub-f1 ub-pc ub-ac">';
			_html += '			<div class="ub ub-img img-voice"></div>';
			_html += '			<div class="ub voice-lev lev1"></div>';
			_html += '		</div>';
			_html += '		<div class="ub r-text">手指上滑，取消发送</div>';
			_html += '	</div>';
			_html += '</div>';
			E_div.innerHTML = _html;
			document.querySelector('.mui-content').appendChild(E_div);
		},

		startRecord: function() {
			var self = this;
			if(self.record.r == null) {
				self.record.r = plus.audio.getRecorder();
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
			self.record.rt = document.querySelector('.voice-lev');
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

			var li = document.createElement('li');
			li.classList = 'ub my audio';

			li.entry = entry;

			// 设置空项不可见
			self.EUl.appendChild(li);
			var _url = '_doc/audio/' + entry.name;
			self.audio.p = plus.audio.createPlayer(_url);

			var _time = Math.ceil(self.audio.p.getDuration());
			var _width = (_time / 60) * 70;
			if(_width < 30) _width = 30;
			li.innerHTML = '<span class="ub ub-f1 ub-pe audio-panel"><span class="ub ub-ac ainf"></span><span class="ub audio" style="width: ' + _width + '%"></span></span><span class="ub ub-img tx" style="background-image:url(../../Resources/home/tx/0.jpg)"></span>';

			li.querySelector('.ainf').setAttribute('time', _time);
			li.querySelector('.ainf').innerText = _time + "''";
			//界面点击播放录音
			li.addEventListener('tap', function(e) {
				if(!this || !this.entry) {
					alert('不存在播放对象!');
					return;
				}

				self.startPaly(li, '_doc/audio/' + this.entry.name);
			})

		},

		//播放录音的实现
		startPaly: function(li, url) {
			var self = this;
			self.stopPlay(li);

			self.audio.p = plus.audio.createPlayer(url);
			self.audio.p.play(function() {
				// 播放完成
				self.stopPlay(li);
			}, function(e) {
				console.log('播放音频文件"' + url + '"失败：' + e.message);
			});
			// 获取总时长
			var d = self.audio.p.getDuration();
			var E_ainf = li.querySelector('.ainf');
			var _time = E_ainf.getAttribute('time');
			self.audio.pi = setInterval(function() {
				_time--;
				E_ainf.innerText = _time + "''";
			}, 1000);
		},
		stopPlay: function(li) {
			var self = this;
			if(self.audio.p) {
				clearInterval(self.audio.pi);
				self.audio.pi = null;
				self.audio.p.stop();
				self.audio.p = null;
				setTimeout(resetPlay, 500);
			}
			var _li = li;

			function resetPlay() {
				var E_ainf = li.querySelector('.ainf');
				var _time = E_ainf.getAttribute('time');
				E_ainf.innerText = _time + "''";

			}
		}
	});
})(mui, window, document);