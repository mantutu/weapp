const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

// 保留两位小数
const twoDecimal = number => {
    if (number >= 0 && !isNaN(parseFloat(number))) {
        return parseFloat(number).toFixed(2);
    } else {
        return "";
    }
}

module.exports = {
    formatTime: formatTime,
    twoDecimal
}