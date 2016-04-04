import assign from 'object-assign'
export function getStartAndEndItem(item) {
    let startItem = assign({}, item, {
        name: item.name + 'Start',
        defaultValue: item.options && (item.options.length > 0 ? item.options[0] : undefined)
    });
    let endItem = assign({}, item, {
        name: item.name + 'End',
        defaultValue: item.options && (item.options.length > 1 ? item.options[1] : undefined)
    });
    return [startItem, endItem]
}
export  function dateFormat(data, format) {
    var o = {
        "M+": data.getMonth() + 1, //month
        "d+": data.getDate(), //day
        "h+": data.getHours(), //hour
        "m+": data.getMinutes(), //minute
        "s+": data.getSeconds(), //second
        "q+": Math.floor((data.getMonth() + 3) / 3), //quarter
        "S": data.getMilliseconds() //millisecond
    };

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (data.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}