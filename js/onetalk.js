function updatetalk(){
	$.ajax({
	  type: 'GET',
	  url: 'https://v1.hitokoto.cn',
	  dataType: 'JSON',
	  success:function(data) {
	    $('#hitokoto_text').text(data.hitokoto);
			var name = "";
			if(data.from_who==null){
				name = "佚名";
			}else{
				name = data.from_who;
			}
			$("#author").text("----"+name);
	  },
	  error:function(jqXHR, textStatus, errorThrown) {
	    // 错误信息处理
	    console.error(textStatus, errorThrown);
	  }
	})
}
$(document).ready(function(){
	updatetalk();
	setInterval(function(){
		updatetalk();
	},1200000);
	$(".asay-box").on("click",function(){
		updatetalk();
	});
});