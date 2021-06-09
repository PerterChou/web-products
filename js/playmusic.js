$(document).ready(function(){

	$('.content-item').on("mousedown",function(){
			//拼接路径
			var src = "src/sources/doremi/"+parseInt($(this).attr("data-itemno"))%7+'.wav';
			//创建媒体对象
			var audio = new Audio(src);
			//调用play方法
			audio.play();
		})

});