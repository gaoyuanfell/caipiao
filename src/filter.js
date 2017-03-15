import {
    formatDate,
    moneyNum,
    formatNum
} from './util';


export default function (Vue) {

    Vue.filter('json', function (value) {
        return JSON.stringify(value)
    })

    Vue.filter('number', function (value, suffix) {
        if(isNaN(parseInt(value))){
            return value;
        }
        return moneyNum(value, suffix);
    })

    Vue.filter('formatNum', function (value) {
        if(isNaN(parseInt(value))){
            return value;
        }
        return formatNum(value);
    })

    Vue.filter('confusePhone', function (value) {
        if(isNaN(parseInt(value)) && String(value).length != 11){
            return value;
        }
        let _value = String(value).substr(0,3) + "****" + String(value).substr(7,4);
        return _value
    })

    /**
     * yyyy-MM-dd HH:mm:ss (周w)默认 w周
     */
    Vue.filter('date', function (value, format) {
        !format && (format = "yyyy-MM-dd HH:mm:ss (周w)");
        let d = new Date(value);
        return formatDate(d, format);
    })
}
