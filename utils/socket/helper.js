/**
 * 是否是json字符串 如果是直接返回json对象
 * @param str
 */
exports.isJson = function (str) {
    if (typeof str === 'object')
        return str;
    try {
        str = str.replace(/\ufeff/g, "");
        var obj = JSON.parse(str);
        return !!(typeof obj === 'object' && obj) ? obj : false;
    }
    catch (e) {
        return false;
    }
};