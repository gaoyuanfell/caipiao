/**
 * 日期格式化
 * @param {*} date 
 * @param {*} format  yyyy-MM-dd HH:mm:ss 默认
 */
const formatDate = function (date, format) {
    var o = {
        "M+": date.getMonth() + 1, //月份 
        "d+": date.getDate(), //日 
        "H+": date.getHours(), //小时 
        "m+": date.getMinutes(), //分 
        "s+": date.getSeconds(), //秒 
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
        "w": formatNum(date.getDay()), //星期
        "S": date.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(format)) format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return format;
}

const formatNum = function (num) {
    var cnum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
    var n = (num + '').split("");
    var s = '';
    n.forEach((m) => {
        s += cnum[m];
    })
    return s;
}

const moneyNum = function (value, suffix) {
    if (!value) return 0;
    let negative = false;
    if (String(value).indexOf("-") == 0) {
        value = value.substr(1);
        negative = true;
    }
    let number = parseInt(value).toFixed(2).split(".");
    let s = number[1];
    let n = number[0].split("").reverse();;
    let str = '';
    let arr = [];
    let l = n.length;
    let numft = ''
    if (l >= 3) {
        n.forEach((b, i) => {
            str = b + str;
            if ((i + 1) % 3 == 0) {
                arr.push(str);
                str = '';
            }
            if (l - 1 == i && str != '') {
                arr.push(str);
            }
        })
        numft = arr.reverse().join(',')
    } else {
        numft = number[0] + '';
    }
    return (negative ? "-" : "") + numft + "." + s + (suffix || "")
}

/**
 * 按指定份数分割数组
 * @param {*} array 
 * @param {*} num 
 */
const arrayslice = function(array,num){
    let ar = [];
    let _ar = null;
    let _num = num;
    while (_ar = array.slice( 0 - _num + num, num ),ar.push(_ar),_ar.length == _num) {
        num += _num;
    }
    return ar;
}

export {
    formatDate,
    formatNum,
    moneyNum,
    arrayslice,
}
