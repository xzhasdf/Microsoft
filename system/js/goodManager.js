//侧边栏绑定点击事件
$('.manager-btn .btn').click(function() {
	//改变按钮自身的颜色变化
	$('.manager-btn .btn').removeClass('btn-warning');
	$(this).addClass('btn-warning');
	//获取data-class
	var divClass = $(this).attr('data-class');
	console.log(divClass);
	$('.manager>div').hide();
	$("." + divClass).show();
});

//头部导航栏登录名
$('.container-fluid .navbar-collapse ul li a').text(localStorage.getItem('loginUser'));
$('.container-fluid .navbar-collapse ul li').append($('<a href="../web/login.html" onclick="quit()">退出</a>'));
function quit() {
	localStorage.setItem('loginUser','');
}
//添加模态框按钮
$('#addbtn').click(function() {
	$('.modal-body input').val("");
	$('.modal-footer .btn-primary').text("添加");
});


//展示列表
//商品
var goodString = localStorage.getItem('productsList');
var goodArr = eval('(' + goodString + ')');

$.each(goodArr, function(i, item) {
	//创建新的列表
	var newObj = $('<tr><td><img src="'+ item.imgurl +'"style="width: 100px;"></td><td>'+ item.name +'</td><td>'+ item.price +'</td><td>'+ item.list1 +'</td><td>'+ item.list2 +'</td><td>'+ item.list3 +'</td><td>'+ item.list4 +'</td><td>'+ item.list5 +'</td><td>'+ item.parentClass +'</td><td style="text-align: center;"><button class="btn btn-info" onclick="changeGood(this)" data-id="' + i + '">修改</button><button class="btn btn-danger" onclick="delGood(this)" data-id="' + i + '">删除</button></td></tr>');
	$('.goodManager table').append(newObj); //添加进页面
});

//提交按钮的点击事件
$('#subGood').click(function () {
	//获取新信息(要对信息做过滤:正则)
	var g_imgurl = $('#gimg').val(); //图片
	var g_name = $('#gname').val(); //名称
	var g_price = $('#gprice').val(); //价格
	var g_list1 = $('#glist1').val(); //描述1
	var g_list2 = $('#glist2').val(); //描述2
	var g_list3 = $('#glist3').val(); //描述3
	var g_list4 = $('#glist4').val(); //描述4
	var g_list5 = $('#glist5').val(); //描述5
	var g_class = $('#gclass').val(); //class名
	var newGoodObj = {
		imgurl: g_imgurl,
		name: g_name,
		price: g_price,
		list1: g_list1,
		list2: g_list2,
		list3: g_list3,
		list4: g_list4,
		list5: g_list5,
		parentClass: g_class
	}
	if($('.modal-footer .btn-primary:first').text() == "添加") {
		goodArr.push(newGoodObj); //将新增加的信息添加进信息存储的数组
		//将goodArr转为字符串,更新localStorage
		var newString = JSON.stringify(goodArr);
		localStorage.setItem('productsList', newString);
		history.go(0); //刷新页面
		$('.form-group input').val(""); //清空输入的值
	}
	
});

//商品删除函数
function delGood(x) { //x表示所点击的删除按钮的本身
	$(x).attr('data-toggle','modal');
	$(x).attr('data-target','#myModalDel');
	$('#myModalDel .modal-footer button:nth-child(1)').click(function() {
		//获取所删除的信息在goodArr里的位置
		var index = $(x).attr('data-id');
		//从数组中删除当前信息
		goodArr.splice(index, 1);
		//将goodArr转为字符串
		var newString2 = JSON.stringify(goodArr);
		localStorage.setItem('productsList', newString2);
		history.go(0); //刷新页面
	});
}
//修改函数
function changeGood(X) {
	$(X).attr('data-toggle','modal');
	$(X).attr('data-target','#myModal');
	var index = $(X).attr('data-id'); //获取信息所在的位置
	var infor = goodArr[index]; //提取数据 
	console.log(infor);
	//将提取出的数据显示在输入框
	$('#gimg').val(infor.imgurl);
	$('#gname').val(infor.name);
	$('#gprice').val(infor.price);
	$('#glist1').val(infor.list1);
	$('#glist2').val(infor.list2);
	$('#glist3').val(infor.list3);
	$('#glist4').val(infor.list4);
	$('#glist5').val(infor.list5);
	$('#gclass').val(infor.parentClass);
	//修改按钮
	$('#subGood').text('修改');
	$('#subGood').click(function() {
		//修改数组里的值
		goodArr[$(X).attr('data-id')].imgurl = $('#gimg').val();
		goodArr[$(X).attr('data-id')].name = $('#gname').val();
		goodArr[$(X).attr('data-id')].price = $('#gprice').val();
		goodArr[$(X).attr('data-id')].list1 = $('#glist1').val();
		goodArr[$(X).attr('data-id')].list2 = $('#glist2').val();
		goodArr[$(X).attr('data-id')].list3 = $('#glist3').val();
		goodArr[$(X).attr('data-id')].list4 = $('#glist4').val();
		goodArr[$(X).attr('data-id')].list5 = $('#glist5').val();
		goodArr[$(X).attr('data-id')].parentClass = $('#gclass').val();
		var goodString = JSON.stringify(goodArr); //转为JSON字符串
		localStorage.setItem('productsList', goodString); //更新数据
		history.go(0);
	});
}

/****************************************************************************************/
//商品类型
var goodString1 = localStorage.getItem('productsList1');
var goodArr1 = eval('(' + goodString1 + ')');

$.each(goodArr1, function(i, item) {
	//创建新的列表
	var newObj1 = $('<tr><td>'+ item.typeName +'</td><td>'+ item.typeNum +'</td><td>'+ item.typeList +'</td><td>'+ item.typeClass +'</td><td style="text-align: center;"><button class="btn btn-info" onclick="changeGoodType(this)" data-id="' + i + '">修改</button><button class="btn btn-danger" onclick="delGoodStyle(this)" data-id="' + i + '">删除</button></td></tr>');
	$('.goodTypeManager table').append(newObj1); //添加进页面
});

//提交按钮的点击事件
$('#subGood1').click(function() {
	//获取新信息
	var g_typeName = $('#gtypeName').val(); //名称
	var g_typeNum = $('#gtypeNum').val(); //名称
	var g_typeList = $('#gtypeList').val(); //描述
	var g_typeClass = $('#gtypeClass').val(); //class名
	var newGoodObj1 = {
		typeName: g_typeName,
		typeNum: g_typeNum,
		typeList: g_typeList,
		typeClass: g_typeClass
	}
	if($('.modal-footer #subGood1').text() == "添加") {
		goodArr1.push(newGoodObj1); //将新增加的信息添加进信息存储的数组
		//将goodArr1转为字符串,更新localStorage
		var newString1 = JSON.stringify(goodArr1);
		localStorage.setItem('productsList1', newString1);
		history.go(0); //刷新页面
		$('.form-group input').val(""); //清空输入的值
	}
});
//商品删除函数
function delGoodStyle(y) { //y表示所点击的删除按钮的本身
	$(y).attr('data-toggle','modal');
	$(y).attr('data-target','#myModalDel');
	$('#myModalDel .modal-footer button:nth-child(1)').click(function() {
		//获取所删除的信息在数组里的位置
		var index = $(y).attr('data-id');
		//从数组中删除当前信息
		goodArr1.splice(index, 1);
		//将数组转为字符串
		var newString21 = JSON.stringify(goodArr1);
		localStorage.setItem('productsList1', newString21);
		history.go(0); //刷新页面
	});
}

//修改函数
function changeGoodType(Y) {
	$(Y).attr('data-toggle','modal');
	$(Y).attr('data-target','#myModal1');
	var index = $(Y).attr('data-id'); //获取信息所在的位置
	var infor = goodArr1[index]; //提取数据 
	//将提取出的数据显示在输入框
	$('#gtypeName').val(infor.typeName);
	$('#gtypeNum').val(infor.typeNum);
	$('#gtypeList').val(infor.typeList);
	$('#gtypeClass').val(infor.typeClass);
	//修改按钮
	$('#subGood1').text('修改');
	$('#subGood1').click(function() {
		//修改数组里的值
		goodArr1[$(Y).attr('data-id')].typeName = $('#gtypeName').val();
		goodArr1[$(Y).attr('data-id')].typeNum = $('#gtypeNum').val();
		goodArr1[$(Y).attr('data-id')].typeList = $('#gtypeList').val();
		goodArr1[$(Y).attr('data-id')].typeClass = $('#gtypeClass').val();
		var goodString1 = JSON.stringify(goodArr1); //转为JSON字符串
		localStorage.setItem('productsList1', goodString1); //更新数据
		history.go(0);
	});
}


/****************************************************************************************/
//用户管理
var userString = localStorage.getItem('username');
var userArr = userString.split(',');
var pswdString = localStorage.getItem('pswd');
var pswdArr = pswdString.split(',');
$.each(userArr, function(j, item) {
	//创建新列表
	var userPswdObj = $('<tr><td>'+ userArr[j] +'</td><td>'+ pswdArr[j] +'</td></tr>');
	$('.userManager table').append(userPswdObj);
});
/****************************************************************************************/
//主页商品
var indexGoodString = localStorage.getItem('indexGoodList');
var indexGoodArr = eval('(' + indexGoodString + ')');

$.each(indexGoodArr, function(i, item) {
	//创建新的列表
	var indexGoodObj = $('<tr><td><img src="'+ item.indexImgurl +'" style="width: 100px;"></td><td>'+ item.indexList1 +'</td><td>'+ item.indexList2 +'</td><td>'+ item.indexClass +'</td><td style="text-align: center;"><button class="btn btn-info" onclick="changeIndexGood(this)" data-id="' + i + '">修改</button><button class="btn btn-danger" onclick="delIndexGoods(this)" data-id="' + i + '">删除</button></td></tr>');
	$('.indexGoodsManager table').append(indexGoodObj); //添加进页面
});

//提交按钮的点击事件
$('#subIndexGood').click(function() {
	//获取新信息
	var g_indexUrl = $('#gindexUrl').val(); //图片路径
	var g_indexList1 = $('#gindexList1').val(); //描述1
	var g_indexList2 = $('#gindexList2').val(); //描述2
	var g_indexClass = $('#gindexClass').val(); //class名
	var newIndexGoodObj = {
		indexImgurl: g_indexUrl,
		indexList1: g_indexList1,
		indexList2: g_indexList2,
		indexClass: g_indexClass
	}
	if($('.modal-footer #subIndexGood').text() == "添加") {
		indexGoodArr.push(newIndexGoodObj); //将新增加的信息添加进信息存储的数组
		//将goodArr转为字符串,更新localStorage
		var newIndexGoodString = JSON.stringify(indexGoodArr);
		localStorage.setItem('indexGoodList', newIndexGoodString);
		history.go(0); //刷新页面
		$('.form-group input').val(""); //清空输入的值
	}
	
});
//商品删除函数
function delIndexGoods(a) { //a表示所点击的删除按钮的本身
	$(a).attr('data-toggle','modal');
	$(a).attr('data-target','#myModalDel');
	$('#myModalDel .modal-footer button:nth-child(1)').click(function() {
		//获取所删除的信息在数组里的位置
		var index = $(a).attr('data-id');
		//从数组中删除当前信息
		indexGoodArr.splice(index, 1);
		//将数组转为字符串
		var newindexGoodString = JSON.stringify(indexGoodArr);
		localStorage.setItem('indexGoodList', newindexGoodString);
		history.go(0); //刷新页面
	});
}

//修改函数
function changeIndexGood(A) {
	$(A).attr('data-toggle','modal');
	$(A).attr('data-target','#myIndexModal');
	var index = $(A).attr('data-id'); //获取信息所在的位置
	var infor = indexGoodArr[index]; //提取数据 
	//将提取出的数据显示在输入框
	$('#gindexUrl').val(infor.indexImgurl);
	$('#gindexList1').val(infor.indexList1);
	$('#gindexList2').val(infor.indexList2);
	$('#gindexClass').val(infor.indexClass);
	//修改按钮
	$('#subIndexGood').text('修改');
	$('#subIndexGood').click(function() {
		//修改数组里的值
		indexGoodArr[$(A).attr('data-id')].indexImgurl = $('#gindexUrl').val();
		indexGoodArr[$(A).attr('data-id')].indexList1 = $('#gindexList1').val();
		indexGoodArr[$(A).attr('data-id')].indexList2 = $('#gindexList2').val();
		indexGoodArr[$(A).attr('data-id')].indexClass = $('#gindexClass').val();
		var indexGoodString = JSON.stringify(indexGoodArr); //转为JSON字符串
		localStorage.setItem('indexGoodList', indexGoodString); //更新数据
		history.go(0);
	});
}