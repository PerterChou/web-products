$(document).ready(function(){
	$(".header .list-item").on("click",function(){
		$(".header .list-item").removeClass("active");
		$(this).addClass("active");
	});
	$(".wallpaper-menu .menu-item").on("click",function(){
		$(".wallpaper-menu .menu-item").removeClass("active");
		$(".menu-item-list").hide();
		$(this).addClass("active");
		$(this).find(".menu-item-list").show();
	});
	$(".menu-item-list .menu-item-liste-item").on("click",function(event){
		$(this).siblings().removeClass("active");
		$(this).addClass("active");
		$(this).parents(".menu-item").find(".menu-value").text($(this).text());
		$(this).parent().hide();
		$(".wallpaper-menu .menu-item").removeClass("active");
		
		//禁止事件冒泡
		event.stopPropagation();
	});
	$("body").on("click",function(event){
		var target = $(".menu-item");
		if(!target.is(event.target)&&target.has(event.target).length===0){
			$(".menu-item-list").hide();
			$(".wallpaper-menu .menu-item").removeClass("active");
		}
	});
	$(".close-btn").on("click",function(){
		let _this = $(this);
		_this.parent().fadeOut(1000);
		showMessage("5秒内将不再显示该广告");
		setTimeout(function(){
			_this.parent().fadeIn(1000);
		},5000,_this);
	});
	// function showMessage(msg){
	// 	let _msg = $(".message");
	// 	_msg.children().text(msg);
	// 	_msg.css("top","120px");
	// 	setTimeout(function(){
	// 		_msg.css("top","-200px");
	// 	},3000,_msg);
	// }
	function showMessage(msg){
		let _msgbox = $(".message-box");
		let newItem = $("<div class='message'><span></span></div>");
		if(_msgbox.children().length>10){
			_msgbox.children().remove();
		}
		newItem.children().text(msg);
		_msgbox.append(newItem);
		setTimeout(function(){
			newItem.fadeOut(1000);
		},1000,newItem);
	}
});