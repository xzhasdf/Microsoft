var w = $(window).width();
var h = $(window).height();
//创建一个蒙版
var newMark = $('<div></div>');
$('body').prepend(newMark);
newMark.addClass('newMark');
//背景设置函数
function bgImage() {
	$('.bgPic').css({
		'width': w,
		'height': h,
		'display': 'block'
	});
	$('.newMark').css({
		'width': w,
		'height': h,
		'background-color': 'rgba(0,0,0,0.7)',
		'position': "absolute",
		'top': "0",
		'left': '0',
	});
}
bgImage();
//拖动浏览器改变样式
$(window).resize(function() {
	//获取浏览器可视窗口宽高
	w = $(window).width();
	h = $(window).height();
	if(w <= '600' || h <= '450') {
		$('.bgPic').css(
			'display', 'none'
		);
		$('.newMark').css(
			'background-color', 'rgba(0,0,0,0)'
		);
	} else {
		bgImage();
	}
});
//底部样式
$('footer').children().css({
	'padding-right': '10px',
	'color': 'white',
	'text-decoration': 'none'
});

//注册
//创建按钮绑定点击事件
$('.text a').click(function() {
	//清除提醒框
	$('.warn').remove();
	if($('.text a').text() == '返回') {
		history.go(0);
	} else {
		//清空input里的value
		$('.login input:nth-of-type(1)').val('');
		$('.login input:nth-of-type(2)').val('');
		//修改相应样式
		$('.login p').text('创建账户');
		$('.login span:nth-child(3)').text('输入想为帐户使用的密码。');
		$('.login input:nth-of-type(1)').attr('placeholder', '电子邮箱或手机号码');
		$('.login input:nth-of-type(2)').attr('placeholder', '6-18位非纯数字或字母,须包含数字字母_? @$*')
		$('.login button').text('注册');
		$('.text a').text("返回");
		$('.text span').css('display', 'none');
	}
});

//注册操作
$('.login button').click(function() {
	if($('.login button').text() == '注册') {
		//清除提醒框
		$('.warn').remove();
		//获取input的value
		var nameValReg = $('.login input:nth-of-type(1)').val();
		var pswdValReg = $('.login input:nth-of-type(2)').val();
		//判断注册账户是否符合规则,调用函数
		account(nameValReg, pswdValReg);
	}
});

//账户判断正则
//邮箱和手机号匹配
var reg1 = /(^[a-z0-9A-Z_-]+@([a-zA-Z0-9_-])+(.[(com)|(cn)|(net)]{2,3}))|(^1[^012][0-9]{9})/g;
//密码匹配(包括数字字母下划线? ! @ $ *,一共6-18位,不能纯由数字和字母或两者一起组成)
var reg2 = /^([?!a-z0-9A-Z])([?!a-z0-9A-Z\_\$@\*]){5,18}$/g;
//账户注册判断函数(x:账户名 y:密码)
function account(x, y) {
	//账号密码判断
	if(reg1.test(x) && reg2.test(y)) {
		//提取localStorage的数据,转为数组
		var nameArr = (localStorage.getItem('username').split(','));
		var pswdArr = (localStorage.getItem('pswd').split(','));
		//账号去重
		$.each(nameArr, function(i, item) {
			if(nameArr.indexOf(x) < 0) {
				//将新增加的信息添加进信息存储的数组
				nameArr.push(x);
				pswdArr.push(y);
				localStorage.setItem('username', nameArr);
				localStorage.setItem('pswd', pswdArr);
				$('.login input:nth-of-type(2)').after("<span class='warn' style='color: black;'>注册成功,请稍后...</span>");
				setTimeout(function() {
					history.go(0);
				}, 1200);
				return false;
			} else {
				$('.login input:nth-of-type(2)').after("<span class='warn' style='color: red;'>用户名已存在</span>");
				return false;
			}
		});
	} else {
		$('.login input:nth-of-type(2)').after("<span class='warn' style='color: red;'>账号或密码不符合要求,请重新输入</span>");
		return false;
	}
}

//登录
$('.login button').click(function() {
	if($('.login button').text() == '登录') {
		//清除提醒框
		$('.warn').remove();
		//获取input的value
		var nameValLog = $('.login input:nth-of-type(1)').val();
		var pswdValLog = $('.login input:nth-of-type(2)').val();
		var nameArrLog = localStorage.getItem('username').split(','); //获取账号数组
		var pswdArrLog = localStorage.getItem('pswd').split(','); //获取密码数组
		$.each(nameArrLog, function(i, item) {
			//清除提醒框
			$('.warn').remove();
			//如果输入的账号在数组里
			if(nameArrLog.indexOf(item) >= 0 && nameValLog != "") {
				//如果调出的密码和输入的密码相同,则正确
				if(pswdArrLog[nameArrLog.indexOf(nameValLog)] == pswdValLog) {
					$('.login input:nth-of-type(2)').after("<span class='warn' style='color: black;'>登录成功,请稍后...</span>");
					localStorage.setItem('loginUser',nameValLog); //记录登录的用户名
					setTimeout(function() {
						window.location.href="../system/goodManager.html"; //跳转指定网页
					}, 1200);
					return false;
				} else {
					$('.login input:nth-of-type(2)').after("<span class='warn' style='color: red;'>账户或密码错误</span>");
				}
			} else if(nameArrLog.indexOf(item) < 0) {
				$('.login input:nth-of-type(2)').after("<span class='warn' style='color: red;'>该账号未注册,请先进行注册</span>");
				return false;
			} else if(nameValLog == "") {
				$('.login input:nth-of-type(2)').after("<span class='warn' style='color: red;'>用户名不能为空</span>");
				return false;
			}
		});
	}
});