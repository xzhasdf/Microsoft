var mySwiper = new Swiper('.swiper-container', {
	direction: 'horizontal',
	loop: true,
	autoplay: true,
	speed:1000,
	//分页器
	pagination: {
		el: '.swiper-pagination',
		type: 'bullets',
		clickable: true
	},
	//前进后退按钮
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev'
	}
});

//头部导航栏登录名
if(localStorage.getItem('loginUser') != null) {
	$('.navbar-form ul #login a').text(localStorage.getItem('loginUser'));
	$('.navbar-form ul #login a').attr('href','../system/goodManager.html');
	$('.navbar-form ul #login').append($('<a href="#" onclick="quit()">退出</a>'));
	
} else if((localStorage.getItem('loginUser') == "")){
	$('.navbar-form ul #login a').text('登录');
	$('.navbar-form ul #login a').attr('href','login.html');
}
function quit() {
	localStorage.setItem('loginUser','');
	history.go(0);
	$('.navbar-form ul #login a:nth-child(2)').remove();
}

//主页商品添加
var indexGoodString = localStorage.getItem('indexGoodList'); //提取数据
var indexGoodList = eval('(' + indexGoodString + ')'); //将JSON格式的字符串转换为数组或对象
//创建商品并添加进页面
$.each(indexGoodList, function(i, item) {
	var newIndexGoodsObj = $('<div class="col-xs-12 col-sm-6 col-md-3 content-goods"><img src="'+ item.indexImgurl +'"><div class="content-goods-message"><h3>'+ item.indexList1 +'</h3><div class="c-paragraph">'+ item.indexList2 +'</div><div class="c-group"><a>立即购买</a><div class="glyphicon glyphicon-menu-right"></div></div></div></div>');
	$("." + item.indexClass).append(newIndexGoodsObj);
});


//响应式
window.onresize = function() {
		var browserWidth = document.body.clientWidth; //获取浏览器可视区域的宽度。  
		if (browserWidth < 1350) {
			//轮播图
			$('.LB01').attr('src', '../source/RWfUas (2).jpeg');
			$('.LB02').attr('src', '../source/RE1Eyde (2).jpeg');
			$('.LB03').attr('src', '../source/RE1EiPt (2).jpeg');
			$('.LB04').attr('src', '../source/RE1H6EA (2).jpeg');
			if (browserWidth < 1050) {
				$('.LB01').attr('src', '../source/RWfUas (1).jpeg');
				$('.LB02').attr('src', '../source/RE1Eyde (1).jpeg');
				$('.LB03').attr('src', '../source/RE1EiPt (1).jpeg');
				$('.LB04').attr('src', '../source/RE1H6EA (1).jpeg');
			}
		} else {
			$('.LB01').attr('src', '../source/RWfUas (4).jpeg');
			$('.LB02').attr('src', '../source/RE1Eyde (4).jpeg');
			$('.LB03').attr('src', '../source/RE1EiPt (4).jpeg');
			$('.LB04').attr('src', '../source/RE1H6EA (4).jpeg');
		}
    }