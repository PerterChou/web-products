function updateweather(){
	var appid=28643928;
	var appsecret='oBgnkA32';
	var city='';
	var url = 'https://tianqiapi.com/free/day?appid='+appid+"&appsecret="+appsecret;
	if(city!=''){
		url += "&city="+city;
	}
	$.ajax({
		type:'GET',
		url:url,
		dataType:'JSON',
		error:function(){
			// alert("网络错误");
			$("#city-temp").text("当前网络错误，无法获取数据");
		},
		success:function(re){
			var air = parseInt(re.air);
			var air_equal = "";
			if(air>=0 && air<=50){
				air_equal = "优";
			}else if(air>=51 && air<=100){
				air_equal = "良";
			}else if(air>=101 && air<=150){
				air_equal = "轻度污染";
			}else if(air>=151 && air<=200){
				air_equal = "中度污染";
			}else if(air>=201 && air<=300){
				air_equal = "重度污染";
			}else if(air>300){
				air_equal = "严重污染";
			}
			$("#city-temp").text(re.city+" - "+re.tem+" ℃");
			$("#temp-range").text(re.tem_night+" ℃ - "+re.tem_day+" ℃");
			$("#wind").text(re.win+" - "+re.win_speed);
			$("#air").text("空气 - "+air+"("+air_equal+")");
			$("#update-time").text("更新于 "+re.update_time);
			$(".weather-icon").css("background-image","url(img/"+re.wea_img+".png)");
			$(".weather-icon").attr("title",re.wea);
		}
	});
}
$(document).ready(function(){
	updateweather();
	setInterval(function(){
		updateweather();
	},1200000);
	$(".weather-box").on("click",function(){
		updateweather();
	});
});