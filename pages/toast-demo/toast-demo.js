Page({
    data: {},
    text() {
        this.toast.text("哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈");
    },
    success() {
        this.toast.success("成功提示");
    },
    error() {
        this.toast.error("错误提示");
    },
    warn() {
        this.toast.warn("警告提示");
    },
    info() {
        this.toast.info("信息提示");
    },
    onLoad() {
        this.toast = this.selectComponent("#toast");
    }
})