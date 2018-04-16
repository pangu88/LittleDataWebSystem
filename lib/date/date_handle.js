var date_handle = {};

date_handle.check_format_ok = function (date) {
    try {
        return date.split('-').map((k)=>{
            return parseInt(k);
        });
    } catch (e) {
        return null;
    }
};

date_handle.calNextDay = function (today) {
    var arr = this.check_format_ok(today);
    if (arr == null) return null;
    [ year, month, day ] = arr;
    if ([1,3,5,7,8,10,12].indexOf(month) != -1 && day == 31 
                || [4,6,9,11].indexOf(month) != -1 && day == 30 
                || month == 2 && day == 29
                || month == 2 && day == 28 && year % 400 == 0 || year % 4 == 0 && year % 100 != 0) {
        month ++;
        day = 1;
        if (month > 12) {
            year ++;
            month = 1;
        }
    }
    else {
        day ++;
    }
    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;
    return `${year}-${month}-${day}`;
}

date_handle.getNowTimeString = function () {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;        if (month < 10) month = '0' + month;
    var day = date.getDate();               if (day < 10) day = '0' + day;
    var hour = date.getHours();             if (hour < 10) hour = '0' + hour;
    var minutes = date.getMinutes();        if (minutes < 10) minutes = '0' + minutes;
    var seconds = date.getSeconds();        if (seconds < 10) seconds = '0' + seconds;
    return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
}

date_handle.getNowTimeString2 = function () {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;        if (month < 10) month = '0' + month;
    var day = date.getDate();               if (day < 10) day = '0' + day;
    var hour = date.getHours();             if (hour < 10) hour = '0' + hour;
    var minutes = date.getMinutes();        if (minutes < 10) minutes = '0' + minutes;
    var seconds = date.getSeconds();        if (seconds < 10) seconds = '0' + seconds;
    return `${year}${month}${day}${hour}${minutes}${seconds}`;
}

date_handle.getNowDateString = function () {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;        if (month < 10) month = '0' + month;
    var day = date.getDate();               if (day < 10) day = '0' + day;
    return `${year}${month}${day}`;
}

date_handle.getYesterdayDateString = function () {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    if (day == 1) {
        month -= 1;
        if (month == 0) {
            month = 12;
            year -= 1;
        }
        if ([1,3,5,7,8,10,12].indexOf(month) != -1) {
            day = 31;
        } else if ([4,6,9,11].indexOf(month) != -1) {
            day = 30;
        } else {
            if (year % 400 == 0 || year % 100 != 0 && year % 4 == 0) {
                day = 29;
            } else {
                day = 28;
            }
        }
    }
    else {
        day -= 1;
    }
    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;
    return `${year}${month}${day}`;
}

module.exports = date_handle;
