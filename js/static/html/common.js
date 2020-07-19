const HTTP_AJAX_ASYNC_TRUE = true;
const HTTP_AJAX_ASYNC_FALSE = false;
const HTTP_AJAX_TYPE_GET = 'GET';
const HTTP_AJAX_TYPE_POST = 'POST';


/**
 * 得到参数签名
 * @param {Object} value
 */
function getParamSign(value) {
	let tempKeyArr = new Array();
	let tempNumber = 0;
	value.forEach(function(value1, key) {
		tempKeyArr[tempNumber] = key;
		tempNumber = tempNumber + 1;
	});
	tempKeyArr.sort();
	let str = "sign:";
	for (let i = 0; i < tempKeyArr.length; i++) {
		let mapValue = "";
		mapValue = value.get(tempKeyArr[i]);
		if (isStringEmpty(mapValue)) {
			mapValue = "";
		}
		str = str + tempKeyArr[i] + "=" + mapValue;
	}
	return hex_md5(str);
}


/**
 * 处理请求参数
 * @param {Object} vaule
 */
function handleParm(vaule) {
	let tempLength = vaule.length;
	vaule = vaule.substring(1, tempLength);
	let tempArray = vaule.split('&');
	let tempMap = new Map();
	for (let i = 0; i < tempArray.length; i++) {
		let paramArray = tempArray[i].split('=');
		let a0 = "";
		let a1 = "";
		if (!isStringEmpty(paramArray[0])) {
			a0 = paramArray[0];
		}
		if (!isStringEmpty(paramArray[1])) {
			a1 = paramArray[1];
		}

		tempMap.set(a0, a1);
	}
	return tempMap;
}

function appendParam(mapObj) {
	let resultStr = '?';
	mapObj.forEach(function(value, key) {
		if (!isStringEmpty(value)) {
			resultStr = resultStr + key + '=' + value + '&';
		}
	});
	resultStr = resultStr.substring(0, resultStr.length);
	return resultStr;
}

/**
 *  检查字符串空
 * @param {Object} value
 */
function isStringEmpty(value) {
	if (value == null || "" == value || value == undefined) {
		return true;
	}
	return false;
}

/**
 * 过滤参数
 * @param {Object} urlParmStr
 * @param {Object} delArrStr
 */
var handleDoGetParm = function(urlParmStr, delArrStr) {
	//console.log(urlParmStr, delArrStr);
	let delArr = null;
	let tempArr = null;
	let rsultUrlParmStr = '?';
	urlParmStr = urlParmStr.substring(1, urlParmStr.length);
	delArr = delArrStr.split(',');
	tempArr = urlParmStr.split('&');
	for (let i = 0; i < tempArr.length; i++) {
		for (let j = 0; j < delArr.length; j++) {
			console.log(tempArr[i] + '|||' + (delArr[j] + '='));
			if (tempArr[i] != undefined) {
				if (tempArr[i].indexOf((delArr[j] + '=')) != -1) {
					tempArr.splice(i, 1);
				}
			}
		}
	}
	for (let i = 0; i < tempArr.length; i++) {
		rsultUrlParmStr = rsultUrlParmStr + tempArr[i] + '&';
	}
	let tempCount = rsultUrlParmStr.length;
	rsultUrlParmStr = rsultUrlParmStr.substring(0, tempCount - 1);
	return rsultUrlParmStr;
}

function getCatoryName(value) {
	let resultStr = '';
	if (value != null && value != undefined) {
		let arr = value.split('/');
		resultStr = arr[randomInt(arr.length)];
	}
	return resultStr;
}

function randomInt(value) {
	let resultNumber = 0;
	while (true) {
		resultNumber = parseInt((Math.random() * value + (Math.random() >= 0.5 ? 1 : 0)));
		if (resultNumber != value) {
			break;
		}
	}
	return resultNumber;
}

/**
 * GET方式提交参数
 * @param {Object} urlString
 * @param {Object} asyncType
 */
function doGet(urlString, asyncType) {
	let result = null;
	$.ajax({
		url: urlString,
		dataType: "JSON",
		async: asyncType, //请求是否异步，默认为异步，这也是ajax重要特性
		data: {}, //参数值 //		JSON.stringify(list)   <---转成json字符串 mapToJsonStringify(data)
		type: "GET", //请求方式
		beforeSend: function(dataObject) {
			//请求前的处理, 发送请求前运行的函数。
		},
		success: function(dataObject) {
			//请求成功时处理
			result = dataObject;
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
	return result;
}

/**
 * 转换成JSON字符串
 * @param {Object} paramMap mapObject对象
 */
// function mapToJsonStringify(paramMap) {
// 	let o = mapToObj(paramMap);
// 	return JSON.stringify(o);
// }

/**
 * 转换成obj
 * @param {Object} strMap map对象
 */
// function mapToObj(strMap) {
// 	let obj = Object.create(null);
// 	for (let [k, v] of strMap) {
// 		obj[k] = v;
// 	}
// 	return obj;
// }
