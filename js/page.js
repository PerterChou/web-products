$(document).ready(function(){
	var pageSize = 7;
	var curPage = 1;
	var totalSize = $(".content-list .content-item").length;
	var totalPage = Math.round(totalSize/pageSize);
	$(".content-list .content-item:gt("+(pageSize-1)+")").hide();
	$(".totalpage").text(totalPage);
	$(".curpage").text(curPage);
	
	$(".page-next").on("click",function(){
		if(curPage == totalPage){
			return false;
		}else{
			$(".curpage").text(++curPage);
			var start = pageSize*(curPage-1);
			var end = pageSize*curPage;
			$(".content-list .content-item").each(function(index,item){
				if(index>=start && index<end){
					$(this).show();
				}else{
					$(this).hide();
				}
			});
		}
	});
	
	$(".page-prev").on("click",function(){
		if(curPage == 1){
			return false;
		}else{
			$(".curpage").text(--curPage);
			var start = pageSize*(curPage-1);
			var end = pageSize*curPage;
			$(".content-list .content-item").each(function(index,item){
				if(index>=start && index<end){
					$(this).show();
				}else{
					$(this).hide();
				}
			});
		}
	});
});