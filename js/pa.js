$(document).ready(function(){
	$.ajax({
		url:'https://img.xjh.me/random_img.php?type=bg',
		type:'POST',
		success:function(res){
			let arr = new Array();
			arr = res.split('"');
			// let url = $(res).find("img").attr("src");
			let url = "https:"+arr[1];
			console.log(url);
		}
	});
});