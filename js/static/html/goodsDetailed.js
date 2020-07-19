var vue = new Vue({
	el: '.container',
	data: {
		goodsInfoObject: {},
		goodsInfoList: [],
		loveGoodsInfoList: []
	},
	created: function() {
		let vueThis = this;
		let winObjParam = window.location.search;
		let tempData = handleParm(winObjParam);
		let tempParamUrlStr = appendParam(tempData);
		// setCategoryScreeningTypeColor(winObjParam);
		// setCategoryGoodsSortTextColor(winObjParam);
		// setCategoryNameTextColor(winObjParam);
		$.ajax({
			url: "./api/selectOneGoodsInfo" + tempParamUrlStr,
			dataType: "JSON",
			async: true, //请求是否异步，默认为异步，这也是ajax重要特性
			data: {}, //参数值 //		JSON.stringify(list)   <---转成json字符串 mapToJsonStringify(data)
			type: "GET", //请求方式
			beforeSend: function(dataObject) {
				//请求前的处理, 发送请求前运行的函数。
			},
			success: function(dataObject) {
				let tempDataObj = null;
				if (dataObject['code'] == 0) {
					tempDataObj = dataObject['data'];
					vueThis.goodsInfoObject = tempDataObj;
				}

				if (tempDataObj != null && tempDataObj != undefined) {
					let str = tempDataObj['fGoodsLevelOneCategoryName'];
					vueThis.fGoodsLevelOneCategoryName = str;
					let goodsCategoryName = getCatoryName(str);
					let pageIndex = 0;
					let pageSize = 5;
					let tempUrl = './api/getRandomLoveGoodsList?catoryName=' + goodsCategoryName + '&pageIndex=' + pageIndex +
						'&pageSize=' + pageSize;
					let doGetResultObj = doGet(tempUrl, false);
					console.log(doGetResultObj);
					if (doGetResultObj['code'] == 0) {
						vueThis.loveGoodsInfoList = doGetResultObj['data'];
					}
					pageSize = 10;
					let tempTop20Url = './api/getRandomLoveGoodsList?catoryName=' + goodsCategoryName + '&pageIndex=' +
						pageIndex +
						'&pageSize=' + pageSize;
					let doGetfindCatoryGoodsListResultObj = doGet(tempTop20Url, false);
					if (doGetfindCatoryGoodsListResultObj['code'] == 0) {
						vueThis.goodsInfoList = doGetfindCatoryGoodsListResultObj['data'];
					}
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

	},
	mounted: function() {
		//alert('mounted');
	},
	methods: {
		refreshLoveGoodsInfo: function() {
			let vueThis = this;
			let tempUrl = './api/getRandomLoveGoodsList?catoryName=' + vueThis.fGoodsLevelOneCategoryName +
				'&pageIndex=0&pageSize=5';
			let doGetResultObj = doGet(tempUrl, false);
			console.log(doGetResultObj);
			if (doGetResultObj['code'] == 0) {
				vueThis.loveGoodsInfoList = doGetResultObj['data'];
			}
		},
		reportGoodsInfo: function(value) {
			let tempUrl = './api/insertGoodsInfoProblem?id=' + value;
			let doGetResultObj = doGet(tempUrl, false);
			let resultCode = doGetResultObj['code'];
			if (resultCode == 0) {
				alert(doGetResultObj['message']);
			} else if (resultCode != 0) {
				alert('系统提示:' + doGetResultObj['message']);
			}
		}
	},
	filters: {
		filterFun: function(value) {
			value = value.replace('【', '').replace('】', '').replace(' ', '').trim();
			if (value.length >= 16) { //字符最大长度
				value = value.substring(0, 11) + ""; //超过省略
			}
			return value;
		},
		filterImage: function(value) {
			value = value + "_200x200.jpg";
			return value;
		},
		filterXianQingImage: function(value) {
			if (value != undefined) {
				value = value + "_300x300.jpg";
			}
			return value;
		},
		filterLoveImage: function(value) {
			value = value + "_60x60.jpg";
			return value;
		},
		filterLoveGoodsName: function(value) {
			if (value != undefined) {
				value = value.substring(0, 7);
			}
			return value;
		},
		filterCouponToFixed: function(value, yMoney) {
			let n = (value - yMoney);
			if (0 >= n) {
				return value.toFixed(2);
			}
			return n.toFixed(2);
		},
		filterAddFunction: function(value) {
			let temp = "javascript:searchByhotName('" + value + "');";
		},
		formatTitle: function(value) {

			if (value != undefined) {
				value = value.substring(0, 22);
			}
			return value;
		},
		formatTime: function(date, fmt) {
			var date = new Date(date);
			if (/(y+)/.test(fmt)) {
				fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
			}
			var o = {
				'M+': date.getMonth() + 1,
				'd+': date.getDate(),
				'h+': date.getHours(),
				'm+': date.getMinutes(),
				's+': date.getSeconds()
			};
			for (var k in o) {
				if (new RegExp('(' + k + ')').test(fmt)) {
					var str = o[k] + '';
					fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length));
				}
			}
			return fmt;
		}

	}
});
