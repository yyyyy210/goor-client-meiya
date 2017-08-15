import fetch from 'dva/fetch';
import { message } from 'antd';
import { apiUrl, loginState } from './config';

//
function checkStatus(response) {
	if (response.status >= 200 && response.status < 300) {
		return response;
	}

	// if (response.status === 40001 || response.status === 40002) {
	//   window.location.hash = '#login';
	//   message.error('登录失效');
	// }

	const error = new Error(response.statusText);
	error.response = response;
	throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url, options = {}) {
	const { token } = await loginState.getUser('userInfo') || '';

	// 暂get带token
	// if (url.indexOf('?') >= 0) {
	// 	url += `&access_token=${token}`;
	// } else {
	// 	url != 'account/user/login' && (url += `?access_token=${token}`);
	// }
	options.credentials = 'include';
	//带上token
	// options.headers = {
	// 	"access_token": 'fspojfspdjofjsdfjspjdofjfsdf'
	// }
	const response = await fetch(apiUrl + url, options);
	checkStatus(response);

    /*
      旧版本
        //暂时定义几种返回状态 返回都是 200
        [4?]未授权 提示错误内容
        [3?]未登录 跳到登录界面
        [2]参数错误 提示错误内容
        [1]普通错误 提示错误内容
        [0]请求所有正确 返回正常

      新定义
        40001//未授权
        40002//未登录
    */
	const res = await response.json();

	// 数据回调
	if (res.code === 0) {
		return res;
	} else if (res.code === 40002 || res.code === 40001) {
		// 登录失效简化处理
		loginState.removeUser('userInfo')
		window.location.href = '/login';
	} else {
		message.error(res.message)
		//return res;
	}
}
