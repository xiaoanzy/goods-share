// var goods = {
// 	goodsTitile: '我是一个标题',
// 	goodsImg: 'https://img.alicdn.com/imgextra/i3/2201195687931/O1CN01pZ0B3428SRkIYKqA7_!!2201195687931.jpg_200x200.jpg',
// 	goodsMoneyAfter: 10,
// 	goodsMoneyBefore: 20,
// 	goodsBuyNuber: 523654,
// 	goodsDiscountMoney: 10
// }
// var goodsInfoList1 = [];
////////////////////////////////////
window.onload = function() {

}


var goodsInfo = new Vue({
	el: '.goodsInfo',
	data: {
		goodsInfoList: []


	},
	mounted: function() {
		var tes = this;
		
		 
		var ss = null;
		$.ajax({
			url: "./api/GoodsData.json", //请求的url地址
			dataType: "json", //返回格式为json
			async: false, //请求是否异步，默认为异步，这也是ajax重要特性
			data: {}, //参数值 //		JSON.stringify(list)   <---转成json字符串
			type: "get", //请求方式
			beforeSend: function(dataObject) { //请求前的处理,,,,, 发送请求前运行的函数。

			},
			success: function(dataObject) { //请求成功时处理
				//var jsonResult = eval(dataObject);
				//goodsInfoList = jsonResult['data'];
				//	goodsInfoList = JSON.stringify(goodsInfoList);

				// var tempThis = this;
				// goodsInfo.goodsInfoList = dataObject['data'];
				// tempThis.goodsInfoList = dataObject['data'];

				// //	console.log(tempDuiXian.goodsInfoList);
				// console.log(tempThis.goodsInfoList);
				ss = dataObject['data'];
				
				Vue.set(this.goodsInfoList,1,dataObject['data']);
			},
			complete: function(dataObject) { //	请求完成时运行的函数（在请求成功或失败之后均调用，即在 success 和 error 函数之后）。
				//请求完成的处理
			},
			error: function(e) {
				//请求出错处理
				console.log(e.status);
				console.log(e.responseText);
			}
		});

		tes.goodsInfoList = ss;
		this.goodsInfoList= ss;
		console.log(tes.goodsInfoList);
		
	 console.log(this.goodsInfoList);
	},
	methods: {
		sss: function() {
			var ss = null;
			$.ajax({
				url: "./api/GoodsData.json", //请求的url地址
				dataType: "json", //返回格式为json
				async: true, //请求是否异步，默认为异步，这也是ajax重要特性
				data: {}, //参数值 //		JSON.stringify(list)   <---转成json字符串
				type: "get", //请求方式
				beforeSend: function(dataObject) { //请求前的处理,,,,, 发送请求前运行的函数。

				},
				success: function(dataObject) { //请求成功时处理
					//var jsonResult = eval(dataObject);
					//goodsInfoList = jsonResult['data'];
					//	goodsInfoList = JSON.stringify(goodsInfoList);

					// var tempThis = this;
					// goodsInfo.goodsInfoList = dataObject['data'];
					// tempThis.goodsInfoList = dataObject['data'];

					// //	console.log(tempDuiXian.goodsInfoList);
					// console.log(tempThis.goodsInfoList);
					ss = dataObject['data'];
				},
				complete: function(dataObject) { //	请求完成时运行的函数（在请求成功或失败之后均调用，即在 success 和 error 函数之后）。
					//请求完成的处理
				},
				error: function(e) {
					//请求出错处理
					console.log(e.status);
					console.log(e.responseText);
				}
			});

			return ss;
		}
	}
});


var containerVue = new Vue({
	el: '.container',
	data: {}

});


/**
 * 设置高度
 */
function setHeight() {
	var goodsInfoArray = $('.goodsInfoArray');
	var tempGoodsInfoArray = goodsInfoArray.height();
	var goodsInfoArray = $('.goodsInfoArray');
	if (goodsInfoArray.children().length % 6 == 0) {
		goodsInfoArray.height(tempGoodsInfoArray + 80);
	}
}


/**
 * 得到商品信息
 */


function getIndexHtmlGoodsInfoList() {
	var ss = null;
	$.ajax({
		url: "./api/GoodsData.json", //请求的url地址
		dataType: "json", //返回格式为json
		async: false, //请求是否异步，默认为异步，这也是ajax重要特性
		data: {}, //参数值 //		JSON.stringify(list)   <---转成json字符串
		type: "get", //请求方式
		beforeSend: function(dataObject) { //请求前的处理,,,,, 发送请求前运行的函数。

		},
		success: function(dataObject) { //请求成功时处理
			//var jsonResult = eval(dataObject);
			//goodsInfoList = jsonResult['data'];
			//	goodsInfoList = JSON.stringify(goodsInfoList);

			// var tempThis = this;
			// goodsInfo.goodsInfoList = dataObject['data'];
			// tempThis.goodsInfoList = dataObject['data'];

			// //	console.log(tempDuiXian.goodsInfoList);
			// console.log(tempThis.goodsInfoList);
			ss = dataObject['data'];
		},
		complete: function(dataObject) { //	请求完成时运行的函数（在请求成功或失败之后均调用，即在 success 和 error 函数之后）。
			//请求完成的处理
		},
		error: function(e) {
			//请求出错处理
			console.log(e.status);
			console.log(e.responseText);
		}
	});

	return ss;
}
