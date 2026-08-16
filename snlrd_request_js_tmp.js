
var config = {
	url: 'https://www.sunlordinc.com/api/v1/'
}

// 百度统计
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?a854a8e6c001f54bd2f99667ad790125";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
/**
 * 数据请求
 * @param url  请求地址 /test
 * @param type 请求类型  POST&GET
 * @param data 请求参数  {id:2,type:3}
 * @returns
 */
var $data
function senAjax(url, type, data) {
	$.ajax({
		url: config.url + url,
		async: false,
		type: type,
		data: data,
		processData: false,   // jQuery不要去处理发送的数据
		contentType: false,   // jQuery不要去设置Content-Type请求头
		dataType: 'json',
		success: function (res) {
			$data = res.data;

		}
	})
	return $data;
};


/**
 * 数据请求
 * @param url  请求地址 /test
 * @param type 请求类型  POST&GET
 * @param data 请求参数  {id:2,type:3}
 * @returns
 */
var $data1
function senAjax1(url, type, data) {
	$.ajax({
		url: config.url + url,
		async: false,
		type: type,
		data: data,
		// processData: false,   // jQuery不要去处理发送的数据
		// contentType: false,   // jQuery不要去设置Content-Type请求头
		dataType: 'json',
		success: function (res) {
			$data1 = res.data;

		}
	})
	return $data1;
}


/**
 * 数据请求
 * @param url  请求地址 /test
 * @param type 请求类型  POST&GET
 * @param data 请求参数  {id:2,type:3}
 * @returns
 */
var $data2
function senAjax2(url, type, data) {
	$.ajax({
		url: config.url + url,
		type: type,
		data: data,
		processData: false,   // jQuery不要去处理发送的数据
		contentType: false,   // jQuery不要去设置Content-Type请求头
		dataType: 'json',
		success: function (res) {
			$data2 = res.message
			console.log($data2);
			// $data2 = res.data;
			// alert(res.message);
		}
	})
	console.log($data2);
	return $data2;
};



/**
 * 数据请求
 * @param url  请求地址 /test
 * @param type 请求类型  POST&GET
 * @param data 请求参数  {id:2,type:3}
 * @returns
 */
var $data3
function senAjax3(url, type, data) {
	$.ajax({
		url: config.url + url,
		async: false,
		type: type,
		data: data,
		// processData: false,   // jQuery不要去处理发送的数据
		// contentType: false,   // jQuery不要去设置Content-Type请求头
		dataType: 'json',
		success: function (res) {
			$data3 = res;

		}
	})
	return $data3;
}



/**
 * 数据请求
 * @param url  请求地址 /test
 * @param type 请求类型  POST&GET
 * @param data 请求参数  {id:2,type:3}
 * @returns
 */
var $data4
function senAjax4(url, type, data) {
	$.ajax({
		url: config.url + url,
		async: false,
		type: type,
		data: data,
		// processData: false,   // jQuery不要去处理发送的数据
		// contentType: false,   // jQuery不要去设置Content-Type请求头
		dataType: 'json',
		success: function (res) {
			$data4 = res;

		}
	})
	return $data4;
}


