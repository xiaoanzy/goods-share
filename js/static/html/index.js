/**
 * 得到商品数据
 * @param {Object} asyncs 是否异步
 * @param {Object} type	 提交类型
 */
function getGoodsInfoList(data) {
	// hex_md5("input string");
	// if (null == asyncs) {
	// 	asyncs = HTTP_AJAX_ASYNC_TRUE;
	// }
	// if ('' == types || null == types) {
	// 	types = HTTP_AJAX_TYPE_GET;
	// }
	let resultData = null;
	$.ajax({
		url: "./api/findNowTopGoodsList", //请求的url地址
		dataType: "JSON", //返回格式为json
		async: false, //请求是否异步，默认为异步，这也是ajax重要特性
		data: {
			// "pageIndex": data.get("pageIndex"),
			// "pageSize": data.get("pageSize"),
			// "goodsName": data.get("goodsName"),
			// "sign": data.get("sign")
		}, //参数值 //		JSON.stringify(list)   <---转成json字符串 mapToJsonStringify(data)
		type: "GET", //请求方式
		beforeSend: function(dataObject) {
			//请求前的处理, 发送请求前运行的函数。
		},
		success: function(dataObject) {
			//请求成功时处理
			//	resultData = dataObject['data'];
			console.log(dataObject);
			if (dataObject['code'] == 0) {
				let dataArray = dataObject['data'];
				resultData = dataArray;

			}

		},
		complete: function(dataObject) {
			//	请求完成时运行的函数（在请求成功或失败之后均调用，即在 success 和 error 函数之后）。
			//请求完成的处理
		},
		error: function(e) {
			console.log(e.status);
			console.log(e.responseText);
		}
	});
	return resultData;
}



var goodsInfo = new Vue({
	el: '.container',
	data: {
		show: true,
		goodsInfoList: [],
		preferentialGoodsInfoList: []
	},
	mounted: function() {
		this.init();
	},
	filters: {
		filterFun: function(value) {
			if (value.length > 13) { //字符最大长度
				value = value.substring(0, 14) + ""; //超过省略
			}
			return value;
		},
		filterImage: function(value) {
			value = value + "_200x200.jpg";
			return value;
		},
		filterCouponToFixed: function(value, yMoney) {
			let n = (value - yMoney);
			if (0 >= n) {
				return value.toFixed(2);
			}
			return n.toFixed(2);
		}
	},
	methods: {
		// function updateAnimate(){
		// 	$(".goodsInfoArray li").animate({opacity: 1});
		// }

		// pageScroll: function() {
		// 	alert(111)
		// 	let scrolldelay = null;
		// 	//把内容滚动指定的像素数（第一个参数是向右滚动的像素数，第二个参数是向下滚动的像素数）
		// 	window.scrollBy(0, -100);
		// 	//this.pageScroll(0, -100);
		// 	//延时递归调用，模拟滚动向上效果
		// 	scrolldelay = setTimeout(this.pageScroll(), 100);
		// 	//获取scrollTop值，声明了DTD的标准网页取document.documentElement.scrollTop，否则取document.body.scrollTop；因为二者只有一个会生效，另一个就恒为0，所以取和值可以得到网页的真正的scrollTop值
		// 	var sTop = document.documentElement.scrollTop + document.body.scrollTop;
		// 	//判断当页面到达顶部，取消延时代码（否则页面滚动到顶部会无法再向下正常浏览页面）
		// 	if (sTop == 0) {
		// 		clearTimeout(scrolldelay);
		// 	}
		// },
		
		init: function() {
			let paramMap = new Map();
			paramMap.set("pageIndex", 1);
			paramMap.set("pageSize", 20);
			paramMap.set("goodsName", "");
			let sign = getParamSign(paramMap);
			paramMap.set("sign", sign);
			//paramMap.set();
			this.goodsInfoList = getGoodsInfoList(paramMap);
			let tempResultObj = doGet('./api/findNowPreferentialGoodsList', false);
			if (tempResultObj['code'] == 0) {
				this.preferentialGoodsInfoList = tempResultObj['data'];
			}
			//this.setIndexHtmlHeight(this.goodsInfoList.length);

		},
		setIndexHtmlHeight: function(length) {
			let goodsInfoArray = $('.goodsInfoArray');
			let tempGoodsInfoArray = goodsInfoArray.height();
			var tempCount = 0;
			for (var i = 1; i <= length; i++) {
				if (i % 5 == 0) {
					tempCount = tempCount + 1;
				}
			}
			tempCount = length % 5 == 0 ? tempCount : tempCount + 1;


			// alert(tempCount);
			// alert(tempGoodsInfoArray);		
			// alert(tempGoodsInfoArray + (412 * tempCount));
			//goodsInfoArray.height(0);
			//goodsInfoArray.height(tempGoodsInfoArray + (410 * tempCount));

			// console.log(tempGoodsInfoArray);
			// console.log((200 * tempCount));
			// tempCount = length % 5 == 0 ? tempCount + 1 : tempCount + 2;
			//	goodsInfoArray.height(0);
			//goodsInfoArray.height(tempGoodsInfoArray + (100 * tempCount));
		}
	}
});



function pageScroll() {
	//把内容滚动指定的像素数（第一个参数是向右滚动的像素数，第二个参数是向下滚动的像素数）
	window.scrollBy(0, -25);
	//延时递归调用，模拟滚动向上效果
	scrolldelay = setTimeout('pageScroll()', 1);
	//获取scrollTop值，声明了DTD的标准网页取document.documentElement.scrollTop，否则取document.body.scrollTop；因为二者只有一个会生效，另一个就恒为0，所以取和值可以得到网页的真正的scrollTop值
	var sTop = document.documentElement.scrollTop + document.body.scrollTop;
	//判断当页面到达顶部，取消延时代码（否则页面滚动到顶部会无法再向下正常浏览页面）
	if (sTop == 0) clearTimeout(scrolldelay);
}
