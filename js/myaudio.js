var LRCList = new Array();
var SongList = new Array();
var audioInfo = {
	songNames: ['アイロコ(反语)-H△G', 'Lemon-米津玄师', '破晓-骑骑一跃', '念念-汪晨蕊', 'Rain-秦基博','心做し-AKANE','君の知らない物語-Supercell','Stay Alive-高桥李依','夜航星-不才'],
	songLics: LRCList,
	songSrcs: ['src/sources/songs', 'src/sources/songs']
}
$(document).ready(function() {
	var myaudio = document.getElementById("audio-player");
	var audioPlay = false;
	realLoadLRC();
	var audioLicSing = audioInfo.songLics[0].split('[');
	var audioLic = new Array();
	var audioTime = new Array();
	var songs = audioInfo.songNames;
	var audioIndex = 0;
	var audioText = new Array();
	var audioBasis = audioInfo.songSrcs[0] + '/';
	var randomStatus = false;
	for (let i = 1; i < audioLicSing.length; i++) {
		var item = audioLicSing[i].split(']');
		audioLic.push(item);
	}
	for (let i = 0; i < audioLic.length; i++) {
		var t = audioLic[i][0].split('.');
		audioTime.push(t[0]); //获取所有的时间点
	}
	audioText = audioInfo.songNames[0].split("-"); //获取第一首歌名
	myaudio.src = audioBasis + songs[0] + ".mp3"; //第一首歌的位置
	$("#songs-info .songName").text("1." + audioText[0] + " " + audioText[1]);

	function playAudio() {
		// $("#audio-pointer").addClass("audio-play-on");
		if (myaudio.paused || myaudio.ended) {
			audioPlay = true;
			myaudio.play();
			$("#audio-pointer").removeClass("audio-play-off").addClass("audio-play-on");
			$("#audio-pad").addClass("audio-pad-on");
		} else {
			audioPlay = false;
			myaudio.pause();
			$("#audio-pointer").removeClass("audio-play-on").addClass("audio-play-off");
			$("#audio-pad").removeClass("audio-pad-on");
		}
	}

	function timeFormat(seconds) {
		var minite = Math.floor(seconds / 60);
		if (minite < 10) {
			minite = "0" + minite;
		}
		var second = Math.floor(seconds % 60);
		if (second < 10) {
			second = "0" + second;
		}
		return minite + ":" + second;
	}

	function createLyric() {
		$(".songLyricList").empty();
		for (let i = 0; i < audioLic.length; i++) {
			var newL = '<li>' + audioLic[i][1] + '</li>';
			$(".songLyricList").append(newL);
		}
	}
	createLyric();

	function audioPlayUpdate() {
		var curTime = myaudio.currentTime;
		var dur = myaudio.duration;
		var percent = curTime / dur * 100;
		for (let i = 0; i < audioTime.length; i++) {
			if (timeFormat(curTime) == audioTime[i]) {
				if (audioLic[i][1] != []) {
					$(".songLyricList li").removeClass("active");
					$(".songLyricList li").eq(i).addClass("active");
					if (i > 0) {
						$(".songLyricList li").eq(i - 1).fadeOut();
					}
				}
			}
		}
	}

	function changeSong() {
		if (audioIndex == songs.length) {
			audioIndex = 0;
		}
		if (audioIndex == -1) {
			audioIndex = songs.length - 1;
		}
		if (randomStatus) {
			audioIndex = Math.floor(Math.random() * (songs.length));
		}

		audioLic = new Array();
		audioTime = new Array();
		audioLicSing = audioInfo.songLics[audioIndex].split('[');
		for (let i = 1; i < audioLicSing.length; i++) {
			var item = audioLicSing[i].split(']');
			audioLic.push(item);
		}
		for (let i = 0; i < audioLic.length; i++) {
			var t = audioLic[i][0].split('.');
			audioTime.push(t[0]); //获取所有的时间点
		}
		audioText = audioInfo.songNames[audioIndex].split("-");
		myaudio.src = audioBasis + songs[audioIndex] + ".mp3";
		if (audioPlay) {
			myaudio.play();
		}
		createLyric();

		$("#songs-info .songName").text((audioIndex + 1) + "." + audioText[0] + " " + audioText[1]);
	}
	//暂未实现
	function searchLyric(songId) {
		var songId = 536622304;
		var url = 'http://music.163.com/api/song/lyric?id=' + songId;
		var lrcSrc = '';
		var lrc = '';
		$.ajax({
			type: 'GET',
			url: url,
			dataType: 'JSON',
			error: function() {
				alert("网络错误");
			},
			success: function(re) {
				// lrcSrc = re[0].result.lrc;
				// $.ajax({
				// 	url:lrcSrc,
				// 	dataType:'JSON',
				// 	error:function(){
				// 		alert("网络错误");
				// 	},
				// 	success:function(re){
				// 		lrc = re;
				// 	}
				// });
				console.log(re);
			}
		});

		return lrc;
	}

	function loadLRC(songName) {
		var lrc = '';
		var url = 'src/sources/lyrics/' + songName + '.lrc'
		$.ajax({
			type: 'GET',
			url: url,
			async: false, //必须设置该参数，否则lrc的值无法改变，
			error: function() {
				// 不能直接给外部变量赋值
				// audioInfo.songLics.push('[00:00.0]未找到歌词');
				lrc = '[00:00.0]未找到歌词';
			},
			success: function(re) {
				lrc = re;
				if (re.indexOf('[00:00]') >= 0) {
					lrc = re;
				} else {
					lrc = '[00:00.0]未找到歌词';
				}
				// 不能直接给外部变量赋值
				// audioInfo.songLics.push(lrc);
			}
		});
		return lrc;
	}

	function realLoadLRC() {
		for (let i = 0; i < audioInfo.songNames.length; i++) {
			let lrc = loadLRC(audioInfo.songNames[i]);
			audioInfo.songLics.push(lrc);
		}
	}
	$("#audio-player").on('timeupdate', function() {
		audioPlayUpdate();
	});
	$("#audio-model").on('click', function() {
		if (!randomStatus) {
			$("#audio-model").addClass("random");
			randomStatus = true;
		} else {
			$("#audio-model").removeClass("random");
			randomStatus = false;
		}

	});
	$("#audio-prev").on('click', function() {
		audioIndex -= 1;
		changeSong();
		console.log(audioIndex);
	});
	$("#audio-next").on('click', function() {
		audioIndex += 1;
		changeSong();
		console.log(audioIndex);

	});

	$("#audio-pointer").on("click", function() {
		playAudio();
	});
	$("#audio-player").on("ended", function() {
		audioIndex += 1;
		changeSong();
	});
	// 功能测试
	//莫名其妙，这里在hbuiderx中没反应，可能是我的问题
	$(document).keypress(function(event){
		if(event.keyCode == 32){ //空格键
			playAudio();
		}
	 
	});
}); 