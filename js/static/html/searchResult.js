var vue = new Vue({
	el: '.container',
	data: {
		goodsCount: 0,
		hotKeywordNameList: [],
		goodsInfoList: [],
		currentPage: 0,
		totalPages: 0,
		totalCount: 0,
		nextPage: 0,
		prefPage: 0,
		currIndex: 0,
		message: ''
	},
	created: function() {
		let vueThis = this;
		let tempData = handleParm(window.location.search);
		let tempParamUrlStr = appendParam(tempData);
		setScreeningTypeColor(window.location.search);
		$.ajax({
			url: "./api/list" + tempParamUrlStr,
			dataType: "JSON",
			async: true, //请求是否异步，默认为异步，这也是ajax重要特性
			data: {}, //参数值 //		JSON.stringify(list)   <---转成json字符串 mapToJsonStringify(data)
			type: "GET", //请求方式
			beforeSend: function(dataObject) {
				//请求前的处理, 发送请求前运行的函数。
			},
			success: function(dataObject) {
				if (dataObject['code'] == 0) {
					let tempDataObj = dataObject['data'];
					console.log(tempDataObj);
					let dataArray = tempDataObj['list'];
					vueThis.goodsCount = tempDataObj['totalCount'];
					vueThis.goodsInfoList = dataArray;
					vueThis.totalPages = tempDataObj['totalPages'];
					vueThis.totalCount = tempDataObj['totalCount'];
					vueThis.nextPage = tempDataObj['nextPage'];
					vueThis.prefPage = tempDataObj['prefPage'];

					vueThis.currIndex = tempDataObj['totalPages'];
					vueThis.currentPage = tempDataObj['currentPage'];

					let tempCurrentPage = tempDataObj['currentPage'] + 4;
					if (tempCurrentPage >= vueThis.totalPages) {
						vueThis.totalPages = tempDataObj['totalPages'] - tempDataObj['currentPage'];
					} else if (tempCurrentPage <= vueThis.totalPages) {
						vueThis.totalPages = tempCurrentPage;
					}

				}
				let doGetResultObj = doGet('./api/getHotKeywordList', false);
				if (doGetResultObj['code'] == 0) {
					let resObj = doGetResultObj['data'];
					vueThis.hotKeywordNameList = resObj;

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
		test: function() {
			alert(1);
		},
		changePage: function(pageIndex, ischange) {
			let obj = this;
			if (pageIndex <= 0) {
				pageIndex = 1;
			}
			let tempTotalCount = this.totalCount;
			let tempPageIndex = pageIndex + 5;
			if (tempPageIndex <= tempTotalCount) {
				this.totalCount = tempPageIndex;
			}
			let winObj = window.location;
			let tempStr = handleDoGetParm(winObj.search, 'pageIndex');
			tempStr = tempStr + '&pageIndex=' + pageIndex;
			winObj.href = winObj.pathname + tempStr;
		},
		defaultChooseBaColor: function() {
			document.getElementById('hzsp').style.backgroundColor = '#ff6601';
		}
	},
	filters: {
		filterFun: function(value) {
			if (value.length > 20) { //字符最大长度
				value = value.substring(0, 11) + "..."; //超过省略
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
		},
		filterAddFunction: function(value) {
			let temp = "javascript:searchByhotName('" + value + "');";
		}
	}
});


/**
 * @param {Object} search
 * 
 * 
 * 							screeningType
							all=综合
							sales=销量
							new=新品
 */
function setScreeningTypeColor(search) {
	let tempStr = search.substring(1, search.length);
	let tempArr = tempStr.split('&');
	document.getElementById('hzsp').removeAttribute("style");
	for (let i = 0; i < tempArr.length; i++) {
		if ((tempArr[i].indexOf('screeningType=all') != -1) || (tempArr[i].indexOf('screeningType=all') == -1)) {
			document.getElementById('hzsp').style.backgroundColor = '#ff6601';
			//break;
		}
		if (tempArr[i].indexOf('screeningType=sales') != -1) {
			document.getElementById('hzsp').removeAttribute("style");
			document.getElementById('xlsp').style.backgroundColor = '#ff6601';
			//	break;
		}
		if (tempArr[i].indexOf('screeningType=new') != -1) {
			document.getElementById('hzsp').removeAttribute("style");
			document.getElementById('xpsp').style.backgroundColor = '#ff6601';
			//break;
		}
		if (tempArr[i].indexOf('screeningType=discounts') != -1) {
			document.getElementById('hzsp').removeAttribute("style");
			document.getElementById('jgsp').style.backgroundColor = '#ff6601';
			//break;
		}
	}
}

/**
 * 清除筛选价格框
 */
var clearPriceBychooseSearchDataInputClearButton = function() {
	let tempParamStr = handleDoGetParm(window.location.search, 'startPrice,endPrice');
	window.location.href = window.location.pathname + tempParamStr;
}

/**
 * 按价格筛选
 */
function priceScreening() {
	document.getElementById('hzsp').removeAttribute("style");
	let startPrice = document.getElementById('startScreeningPrice').value;
	let endPrice = document.getElementById('endScreeningPrice').value;
	let map = new Map();
	map.set('startPrice', startPrice);
	map.set('endPrice', endPrice);
	let str = '';
	map.forEach(function(value, key) {
		if (!isStringEmpty(value)) {
			str = str + key + '=' + value + '&';
		}
	});
	str = str.substring(0, str.length - 1);
	let tempParamStr = handleDoGetParm(window.location.search, 'startPrice,endPrice');
	let temp = window.location.pathname + tempParamStr + '&' + str;
	if ((startPrice == null || startPrice == 0) && (endPrice == null || endPrice == 0)) {
		temp = temp.substring(0, temp.length - 1);
	}
	window.location.href = temp;
}

/**
 * @param {Object} value
 * 
 * 							screening
							all=综合
							sales=销量
							new=新品
							
 */
var screeningByType = function(value) {
	let temphandleAfterParamStr = handleDoGetParm(window.location.search, 'screeningType');
	temphandleAfterParamStr = temphandleAfterParamStr + '&screeningType=' + value;
	console.log(temphandleAfterParamStr);
	window.location.href = temphandleAfterParamStr;
}


function searchByhotName(value) {
	let win = window.location;
	win.search = 'goodsName' + '=' + value;

}
