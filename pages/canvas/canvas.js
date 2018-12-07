const utils = require("../../utils/util.js");
const canvas = require("../../utils/canvas.js");

Page({
    data: {
        product: {
            name: "商品名称",
            price: 0.01,
            originPrice: 500,
            qrCode: ""
        },
        poster: "",
        hidden: true
    },
    onLoad() {
        this.toast = this.selectComponent("#toast");
    },
    close() {
        this.setData({
            hidden: true
        });
    },
    showPoster() {
        // 打开海报弹窗
        let _this = this;
        this.drawPoster(function (poster) {
            _this.setData({
                poster,
                hidden: false
            });
            wx.hideLoading();
        });
    },
    savePoster() {
        // 保存海报到相册
        let _this = this;
        this.drawPoster(function (url) {
            _this.downloadFile(url);
        });
    },
    drawPoster(cb) {
        // 绘制海报
        let product = this.data.product;
        wx.showLoading({
            title: "海报生成中",
            mask: true
        });
        let promiseArr = canvas.getImageInfo([product.qrCode, "https://cdn.xiaobaoxiu.cn/xbshow/XcxImages/enrollnew/step_post_bg.jpg"]);
        Promise.all(promiseArr).then(res => {
            console.log(res);
            let ctx = wx.createCanvasContext("step_pintuan");
            if (promiseArr.length > 1) {
                //主要就是计算好各个图文的位置
                ctx.drawImage(res[1].path, 0, 0, 570, 705);
                ctx.drawImage(res[0].path, 204, 473, 161, 159);
            } else {
                ctx.drawImage(res[0].path, 0, 0, 570, 705);
            }

            // canvas.drawCircularImage(ctx, {
            //     url: res[0].path,
            //     x: 50,
            //     y: 100,
            //     radius: 200
            // });

            let name = product.name.trim();
            canvas.setFont(ctx, {
                textAlign: "left",
                fillStyle: "#C21E0D",
                textBaseline: "middle",
                fontSize: 32,
                text: name,
                x: function () {
                    return (570 - ctx.measureText(name).width) / 2;
                },
                y: 281,
            });
            var originPrice = "￥" + utils.twoDecimal(product.originPrice);
            canvas.setLineThroughFont(ctx, {
                textAlign: "left",
                fillStyle: "#C21E0D",
                textBaseline: "middle",
                fontSize: 32,
                text: originPrice,
                x: 114,
                y: 380,
                lineWidth: 2,
                strokeStyle: "#C21E0D"
            });
            var price = "￥" + utils.twoDecimal(product.price);
            canvas.setFont(ctx, {
                textAlign: "right",
                fillStyle: "#C21E0D",
                textBaseline: "middle",
                fontSize: 48,
                text: price,
                x: 570 - 124,
                y: 378,
            });
            canvas.canvasToTempFilePath(ctx, false, {
                x: 0,
                y: 0,
                width: 570,
                height: 705,
                destWidth: 570,
                destHeight: 705,
                canvasId: "step_pintuan",
                success: function (res) {
                    cb && cb(res.tempFilePath);
                }
            });
        });
    },
    downloadFile: function (filePath) {
        let _this = this;
        let toast = this.toast;
        wx.getSetting({
            success(res) {
                if (!res.authSetting["scope.writePhotosAlbum"]) {
                    wx.authorize({
                        scope: "scope.writePhotosAlbum",
                        success() {
                            _this.saveImage(filePath);
                        },
                        fail(res) {
                            wx.hideLoading();
                            wx.showModal({
                                title: "提示",
                                content: "是否同意访问相册",
                                cancelText: "否",
                                confirmText: "是",
                                success: function (res) {
                                    if (res.confirm) {
                                        wx.openSetting({
                                            success: res => {}
                                        });
                                    } else if (res.cancel) {
                                        wx.hideLoading();
                                        this.isSaving = false;
                                        toast.error("海报保存失败");
                                    }
                                }
                            });
                        }
                    });
                } else {
                    _this.saveImage(filePath);
                }
            }
        });
    },
    // 海报保存到本地相册
    saveImage: function (filePath) {
        let _this = this;
        let toast = _this.toast;
        wx.saveImageToPhotosAlbum({
            filePath: filePath,
            success: res => {
                wx.hideLoading();
                this.isSaving = false;
                wx.showModal({
                    title: "保存成功",
                    content: "海报已保存在相册，快去分享到朋友圈吧",
                    confirmText: "知道了",
                    showCancel: false,
                    success: res => {}
                });
            },
            fail: res => {
                wx.hideLoading();
                this.isSaving = false;
                toast.error("海报保存失败", 3000);
            }
        });
    }
});