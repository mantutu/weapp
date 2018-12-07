/**
 * storage
 */

const setStorage = (key, value, expires) => {
    try {
        value = typeof value === "object" ? JSON.stringify(value) : value;
        expires ? value += `;expiretime=${(Date.parse(new Date()) + expires * 1800)}` : null;
        wx.setStorageSync(key, value);
        return true;
    } catch (e) {
        return false;
    }
}

const getStorage = (key) => {
    try {

        var value = wx.getStorageSync(key);
        if (value) {
            return value;
        }
    } catch (e) {
        return null;
    }
}

const removeStorage = (key) => {
    try {
        wx.removeStorageSync(key);
        return true;
    } catch (e) {
        return false;
    }
}

module.exports = {
    setStorage,
    getStorage,
    removeStorage
}