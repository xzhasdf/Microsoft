//复选框判断
$('.groups-list-container input').click(function() {
	if($(this)[0].bol == 1) {
		$(this).prev().css('background-image', 'url(../source/checkbox-off.svg)');
		$(this)[0].bol = 0;
	} else if($(this)[0].bol == 0 || $(this)[0].bol == undefined) {
		$(this).prev().css('background-image', 'url(../source/checkbox-on.svg)');
		$(this)[0].bol = 1;
	}
});

//复选框清空
$('.screen-clear').click(function() {
	$('.checkbox-inline div').css('background-image', 'url(../source/checkbox-off.svg)');
	$('.groups-list-container input').bol == 0;
});

//商品类型
//取出数据
var goodString1 = localStorage.getItem('productsList1');
var goodList1 = eval('(' + goodString1 + ')'); //将JSON格式的字符串转换为数组或对象
//创建商品类型模块并添加进页面
$.each(goodList1, function(i, item) {
	var newObj1 = $('<section class="' + item.typeClass + '"><div class="heading-show-all"style="padding-top: 120px;"><h1>' + item.typeName + '<small style="font-size: 1.5rem;">(' + item.typeNum + ')</small></h1><div class="btn-show"><button class="screen">显示所有筛选器<span>+</span></button></div></div><hr><div class="intro-message"><div class="intro-left col-xs-6"><p>' + item.typeList + '</p></div><div class="rank-right col-xs-6"><div class="dropdown"style="position: relative;"><button class="btn btn-default dropdown-toggle"type="button"id="dropdownMenu1"data-toggle="dropdown"aria-haspopup="true"aria-expanded="true">特别推荐<span class="caret"></span></button><ul class="dropdown-menu price-type"aria-labelledby="dropdownMenu1"><li class="active"><a href="#">特别推荐</a></li><li><a href="#">价格由高到低</a></li><li><a href="#">价格由低到高</a></li></ul></div><p>排序依据:</p></div></div><div class="goods"></div></section>');
	$('.aaaaa').append(newObj1);
});

//商品
//取出数据
var goodString = localStorage.getItem('productsList');
var goodList = eval('(' + goodString + ')'); //将JSON格式的字符串转换为数组或对象
//创建商品框并添加进页面
$.each(goodList, function(i, item) {
	var newObj = $('<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 goodsDiv"><img src="' + item.imgurl + '"><div><h4>' + item.name + '</h4><p style="font-weight:700;"><strong>' + item.price + '<span></span></strong></p><ul class="c-list"style="height: 288px"><li>' + item.list1 + '</li><li>' + item.list2 + '</li><li>' + item.list3 + '</li><li>' + item.list4 + '</li><li>' + item.list5 + '</li></ul><div class="c-group"><button>立即购买<span class="glyphicon glyphicon-menu-right"></span></button><button>了解详情<span class="glyphicon glyphicon-menu-right"></span></button></div></div></div>');
	$("." + item.parentClass + " .goods").append(newObj);
});

//商品描述小圆点显示判断
var arr = $('.aaaaa .goods li');
$.each(arr, function(i, item) {
	if(item.innerText == '') {
		item.style.listStyle = 'none';
	}
});

//头部导航栏登录名
if(localStorage.getItem('loginUser') != "") {
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