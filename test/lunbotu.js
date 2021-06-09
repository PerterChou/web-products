$(document).ready(function() {
	var width = 500;
	var height = 300;
	var iwidth = 100;
	var iheight = 60;
	var wlength = 3;
	for (let i = 0; i < width / iwidth; i++) {
		for (let j = 0; j < height / iheight; j++) {
			let newItem = $("<div class='little-item'><div class='qian'></div><div class='hou'></div></div>");
			$(".lunbocontainer").append(newItem);
			//             if(j==height/iheight-1){
			//                 newItem.css("background-color","blue");
			//             }
			newItem.find(".hou").css({
				"background-position": `${-j*iwidth}px ${-i*iheight}px`
			});
			newItem.find(".qian").css({
				"background-position": `${-j*iwidth}px ${-i*iheight}px`
			});
			newItem.css({
				"transition": `all 1s linear ${(i+j)*0.1}s`
			});
			newItem.find(".qian").css({
				"transition": `all 1s linear ${(i+j)*0.1}s`
			});
			newItem.find(".hou").css({
				"transition": `all 1s linear ${(i+j)*0.1}s`
			});
			// newItem.css({
			// 	"animation":`${(i+j)*0.1}s`
			// });
		}
	}
	for (let i = 0; i < wlength; i++) {
		let newItem = $("<div class='lunbotufooter-item'>" + (i + 1) + "</div>");
		$(".lunbotufooter").append(newItem);
		if (i == 0) {
			newItem.addClass("active");
		}
	}
	var index = 1;
	setInterval(function() {

		// $(".little-item").each(function(index) {
		// 	$(this).css({
		// 		"transform": `rotateY(${(index%2)*180}deg)`
		// 	});
		// 	// $(".lunbotufooter-item").removeClass("active");
		// 	// $(".lunbotufooter-item").eq(index).addClass("active");
		// });
		if (index % 2 == 1) {
			$(".little-item .hou").css({
				"background-image": `url(../src/sources/wallpaper/w${index%wlength}.jpg)`
			});
		} else {
			$(".little-item .qian").css({
				"background-image": `url(../src/sources/wallpaper/w${index%wlength}.jpg)`
			});
		}
		$(".lunbotufooter-item").removeClass("active");
		$(".lunbotufooter-item").eq(index % wlength).addClass("active");
		$(".little-item").css({
			"transform": `rotateY(${(index%2)*180}deg)`
		});
		index++;
	}, 5000);

	// $(".lunbotufooter").on("click", ".lunbotufooter-item", function() {
	// 	//         alert($(this).text());
	// 	//         $(".text").text($(this).text());
	// 	$(".lunbotufooter-item").removeClass("active");
	// 	$(this).addClass("active");
	// 	$(".little-item").css({
	// 		"transform": `rotateY(${180}deg)`
	// 	});
	// });
});
