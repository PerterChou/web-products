const wyinjie = ['C','D','E','F','G','A','B'];
const byinjie = ['C','D','F','G','A'];
const basePitch = 2;

$(document).ready(function(){
	$(".black-key,.white-key").on("click",function(){
		let base = "sources/绝对音高/";
		let pitch = $(this).data("pitch");
		let src = base + pitch.replace(/[0-9]/,"/").replace(/#/,"b")+pitch.replace(/#/,"b")+".mp3";
		var audio = new Audio(src);
		audio.play();
		$(this).addClass("active");
		
		console.log(src);
	});
	$(".black-key,.white-key").on("mouseup",function(){
		$(this).removeClass("active");
	});
	$(".black-key,.white-key").on("mouseout",function(){
		$(this).removeClass("active");
	});
	$(".white-key").each(function(index){
		let m = parseInt(index/wyinjie.length)+1+basePitch;
		let n = wyinjie[index%wyinjie.length];
		$(this).data("pitch",n+m);
	});
	$(".black-key").each(function(index){
		let j = parseInt(index/byinjie.length)+1+basePitch;
		let k = byinjie[index%byinjie.length];
		$(this).data("pitch","#"+k+j);
	});
});
