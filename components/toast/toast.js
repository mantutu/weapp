Component({
    /**
     * 组件的属性列表
     */
    properties: {},

    /**
     * 组件的初始数据
     */
    data: {
        // 文本内容
        content: "",
        // 弹窗样式
        toastClass: "hidden",
        // 弹窗类型
        type: "",
        show: false
    },

    /**
     * 组件的方法列表
     */
    ready() {},
    methods: {
        _close() {
            this.setData({
                show: false
            });
        },
        success(content, duration = 3000) {
            this.open(content, duration, "success");
        },
        error(content, duration = 3000) {
            this.open(content, duration, "error");
        },
        info(content, duration = 3000) {
            this.open(content, duration, "info");
        },
        warn(content, duration = 3000) {
            this.open(content, duration, "warn");
        },
        text(content, duration = 3000) {
            this.open(content, duration, "text");
        },
        open(content, duration, type) {
            let OSS_URL = "https://mieba.oss-cn-hangzhou.aliyuncs.com/growth/assets/";
            let src = "";
            switch (type) {
                case "success":
                    src = OSS_URL + "images/toast/success.png";
                    break;
                case "warn":
                    src = OSS_URL + "images/toast/warn.png";
                    break;
                case "info":
                    src = OSS_URL + "images/toast/info.png";
                    break;
                case "error":
                    src = OSS_URL + "images/toast/error.png";
                    break;
            }

            this.setData({
                content,
                duration,
                type,
                src,
                show: true
            });

            setTimeout(() => {
                this._close();
            }, duration);
        }
    }
})