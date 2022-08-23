/**
 * @description 接口封装
 */

import fetch from 'isomorphic-fetch';
import fetchJsonp from 'fetch-jsonp';
import queryString from 'qs';
import { Toast } from 'antd-mobile';
import { createBrowserHistory } from 'history';
import { objectTrim } from 'utils';

export const history = createBrowserHistory();

const authStatus = [401];
const PATHNAME = [
    '/exception-403',
    '/exception-404',
    '/exception-500',
    '/home',
];

/**
 * 获取数据时后端会进行登录拦截
 * 401 - 未登录
 * 501 - 无权访问
 */

async function fetchWithStatus(url, options) {
    const { pathname } = window.location;
    try {
        let res = await fetch(url, options);
        if (res.status !== 200) {
            throw new Error('接口错误');
        }
        let ret = await res.json();
        if (ret.status === 0) {
            return ret.data;
        }

        throw ret;
    } catch (err) {
        err.api = url;
        if (process.env.NODE_ENV === 'production') {
            // 上报错误
        }
        if (err.status === 403) {
            setTimeout(() => {
                history.push('/exception-403');
            }, 1000);
        } else if (authStatus.indexOf(err.status) !== -1) {
            if (PATHNAME.indexOf(pathname) == -1) {
                setTimeout(() => {
                    history.push(`/login?redirect=${encodeURIComponent(pathname)}`);
                }, 1000);
            } else {
                setTimeout(() => {
                    history.push('/login');
                }, 1000);
            }
            Toast.show({ content: err.message });
        } else {
            Toast.show({ content: err.message });
        }
        throw err.message;
    }
}

async function fetchWithStatusByJsonp(url, options) {
    try {
        let res = await fetchJsonp(url, options);
        let ret = await res.json();
        if (ret.status === 0) {
            return ret.data;
        }
        throw ret;
    } catch (err) {
        err.api = url;
        if (process.env.NODE_ENV === 'production') {
            // 上报错误
        }
        Toast.show({ content: err.message });
        throw err.message;
    }
}

function genUrl(url, params) {
    let paramStr = queryString.stringify(params);
    if (paramStr.length > 0) {
        let splitChar = url.indexOf('?') === -1 ? '?' : '&';
        return url + splitChar + paramStr;
    }
    return url;
}

let defaultConfig = {
    credentials: 'same-origin',
};

export function GET(url, params, options) {
    return fetchWithStatus(genUrl(url, objectTrim(params)), {
        method: 'GET',
        ...defaultConfig,
        ...options,
    });
}

export function JSONP(url, params = {}, options = {}) {
    const keys = Object.prototype.toString.call(params) === '[object Object]' && Object.keys(params);
    if (keys.length > 0) {
        if (url.indexOf('?') === -1) {
            url += '?';
        } else {
            url += '&';
        }
        keys.forEach((key) => {
            url += `${key}=${params[key]}&`;
        });
        url = url.slice(0, -1);
    }

    return fetchWithStatusByJsonp(url, {
        method: 'JSONP',
        ...defaultConfig,
        ...options,
    });
}

export function POST(url, data, options) {
    return fetchWithStatus(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(objectTrim(data)),
        ...defaultConfig,
        ...options,
    });
}

// 导出
export async function exportDownload(url = '', data = {}) {
    const joinUrl = genUrl(url, data);
    window.open(joinUrl);
}
