const props = {
    title: "",
    content: "",
    showCancel: true,
    cancelText: "取消",
    cancelColor: "#151E26",
    confirmText: "确定",
    confirmColor: "#6093FF",
    confirm: function () {},
    cancel: function () {}
};

// 模态对话框
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        // 对话框标题
        title: {
            type: String,
            value: props.title
        },
        // 对话框内容
        content: {
            type: String,
            value: props.content
        },
        // 是否显示取消按钮
        showCancel: {
            type: Boolean,
            value: props.showCancel
        },
        // 取消按钮的文字
        cancelText: {
            type: String,
            value: props.cancelText
        },
        // 取消按钮的文字颜色，必须是 16 进制格式的颜色字符串
        cancelColor: {
            type: String,
            value: props.cancelColor
        },
        // 确认按钮的文字
        confirmText: {
            type: String,
            value: props.confirmText
        },
        // 确认按钮的文字颜色，必须是 16 进制格式的颜色字符串
        confirmColor: {
            type: String,
            value: props.confirmColor
        },
        // 点击确认按钮
        confirm: {
            type: Function,
            value: props.confirm
        },
        // 点击取消按钮
        cancel: {
            type: Function,
            value: props.cancel
        },
        // 图标显示
        icon: {
            type: String,
            value: ""
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        // 是否显示对话框
        show: false
    },

    /**
     * 组件的方法列表
     */
    methods: {
        showModal(obj) {
            this.setData({
                ...props,
                show: true,
                modal_class: "fadeIn",
                ...obj
            });
        },
        cancel() {
            let cancel = this.data.cancel;
            cancel && cancel();
            this.close();
        },
        confirm() {
            let confirm = this.data.confirm;
            confirm && confirm();
            this.close();
        },
        close() {
            this.setData({
                modal_class: "fadeOut"
            });
        },
        _onAnimationEnd() {
            if (this.data.show) {
                this.setData({
                    show: false
                });
            }
        }
    }
})