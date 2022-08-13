/**
 * @description 公用方法封装
 */

/**
* 获取当前运行环境
* @return {Object} {isDev, isTrunk, isTest, isProduction}
*/
export function getEnv() {
    let { location } = window;
    let [first, second] = location.hostname.split('.');
    let Env = { str: second };
    if (second === 'dev' || first === 'localhost' || first.match(/^\d+$/)) {
        Env.isDev = true;
    } else if (second === 'trunk') {
        Env.isTrunk = true;
    } else if (second === 'neibu') {
        Env.isTest = true;
    } else if (second === 'release') {
        Env.isRelease = true;
    } else if (first.endsWith('test')) {
        Env.isYufa = true;
        Env.str = 'yufa';
    } else {
        Env.isProduction = true;
        Env.str = 'production';
    }
    return Env;
}

export function now() { return new Date(); }
/**
* 上报错误
* @param {*} err
*/
export function errorTrack(err) {
    window.errortracker && window.errortracker.log({
        filename: '',
        line: 0,
        message: serializeError(err),
    });
}

/**
* 序列化Error,
* 因为 error 直接 JSON.stringify 会返回 '{}', 所以需要序列化一下
*/
export const serializeError = (err = {}) => {
    return JSON.stringify({
        name: err.name,
        message: err.message,
        description: err.description,
        fileName: err.fileName,
        lineNumber: err.lineNumber,
        columnNumber: err.columnNumber,
        stack: err.stack,
        api: err.api,
    });
};

/**
* 获取url后的参数
*/
export const getSearchQueryParams = () => {
    let url = window.location.search;
    let theRequest = {};
    if (url.indexOf('?') != -1) {
        let str = url.substr(1);
        let strs = str.split('&');
        for (let i = 0; i < strs.length; i++) {
            const [name, value = ''] = strs[i].split('=');
            theRequest[name] = unescape(value);
        }
    }
    if (theRequest == undefined || theRequest == null) {
        theRequest == '';
    }
    return theRequest;
};

// 组装query参数
export const getSearchQueryStr = (queryObj) => {
    const strArr = Object.entries(queryObj).reduce((acc, item) => {
        if (item[1]) {
            acc.push(item.join('='));
        }
        return acc;
    }, []);
    return strArr.join('&');
};

/**
 * 页面已有query参数，增加新的query参数
 */
export const setSearchQueryStr = (obj) => {
    const params = getSearchQueryParams();
    return getSearchQueryStr({ ...params, childIndex: '', ...obj });
};

// 处理接口请求中的前后空格
export const objectTrim = (data) => {
    if (typeof data === 'object' && data !== null && !Array.isArray(data) && typeof data !== 'function') {
        let newObj = {};
        Reflect.ownKeys(data).forEach((key) => {
            newObj[key] = typeof data[key] === 'string' ? data[key].trim() : data[key];
        });
        return newObj;
    }
    return data;
};

// 页面只播放一个audio
export const playOneAudio = () => {
    let audios = document.getElementsByTagName('audio');
    // 暂停函数
    const pauseAll = function() {
        let self = this;
        [].forEach.call(audios, function(i) {
            // 将audios中其他的audio全部暂停
            i !== self && i.pause();
        });
    };
    // 给play事件绑定暂停函数
    [].forEach.call(audios, function(i) {
        i.addEventListener('play', pauseAll.bind(i));
    });
};

// 只可输入数字限制
export const numberInputLimit = (e) => {
    const { value } = e.target;
    if (value == 0) return '';
    return value.replace(/[^0-9]/g, '');
};
