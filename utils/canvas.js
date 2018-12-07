/**
 * 绘制图片
 * @param {*} ctx CanvasContext
 * @param {*} reserve 本次绘制是否接着上一次绘制。
 * @param {*} param2 wx.canvasToTempFilePath API 内部参数
 */
const canvasToTempFilePath = (ctx, reserve, {
    x,
    y,
    width,
    height,
    destWidth,
    destHeight,
    canvasId,
    success,
    fail,
    complete
}) => {
    ctx.draw(reserve, function () {
        wx.canvasToTempFilePath({
            x,
            y,
            width,
            height,
            destWidth,
            destHeight,
            canvasId,
            success,
            fail,
            complete
        });
    });
}

/**
 * 加载图片
 * @param {*} images 图片数组
 */
const getImageInfo = (images) => {
    let promiseArr = [];
    for (let i = 0, len = images.length; i < len; i++) {
        if (images[i]) {
            let promise = new Promise(function (resolve, reject) {
                wx.getImageInfo({
                    src: images[i],
                    success: function (res) {
                        resolve(res);
                    },
                    fail: function (res) {
                        reject(res);
                    }
                });
            });
            promiseArr.push(promise);
        }
    }

    return promiseArr;
}

/**
 * 设置字体
 * @param {*} ctx CanvasContext
 * @param {*} param1 textAlign、fillStyle、textBaseline、fontSize、text、x、y、maxWidth
 */

const setFont = (ctx, {
    textAlign,
    fillStyle,
    textBaseline,
    fontSize,
    text,
    x,
    y,
    maxWidth
}) => {
    textAlign ? ctx.setTextAlign(textAlign) : null;
    fillStyle ? ctx.setFillStyle(fillStyle) : null;
    textBaseline ? ctx.setTextBaseline(textBaseline) : null;
    fontSize ? ctx.setFontSize(fontSize) : null;
    typeof x == "function" ? x = x() : x;
    typeof y == "function" ? y = y() : y;
    maxWidth ? ctx.fillText(text, x, y, maxWidth) : ctx.fillText(text, x, y);
}

/**
 * 设置line-through字体
 * @param {*} ctx CanvasContext
 * @param {*} param1 textAlign、fillStyle、textBaseline、fontSize、text、x、y、maxWidth、lineWidth、strokeStyle
 */
const setLineThroughFont = (ctx, {
    textAlign,
    fillStyle,
    textBaseline,
    fontSize,
    text,
    x,
    y,
    maxWidth,
    lineWidth,
    strokeStyle
}) => {
    setFont(ctx, {
        textAlign,
        fillStyle,
        textBaseline,
        fontSize,
        text,
        x,
        y,
        maxWidth
    });

    ctx.beginPath();
    lineWidth ? ctx.setLineWidth(lineWidth) : null;
    strokeStyle ? ctx.setStrokeStyle(strokeStyle) : null;
    ctx.moveTo(x, y);
    ctx.lineTo(ctx.measureText(text).width + x, y);
    ctx.stroke();
}

/**
 * 绘制圆形图片
 * @param {*} ctx CanvasContext
 * @param {*} param1 url（图片url）、x、y、radius
 */
const drawCircularImage = (ctx, {
    url,
    x,
    y,
    radius
}) => {
    ctx.beginPath(); //开始创建一个路径
    ctx.arc(x + radius, y + radius, radius, 0, 2 * Math.PI, false); //画一个圆形裁剪区域
    ctx.clip(); //裁剪
    ctx.drawImage(url, x, y, radius * 2, radius * 2); //绘制图片
}

module.exports = {
    canvasToTempFilePath,
    getImageInfo,
    setFont,
    setLineThroughFont,
    drawCircularImage
}