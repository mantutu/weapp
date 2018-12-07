Component({
    /**
     * 组件的选项
     */
    options: {
        addGlobalClass: true,
    },

    /**
     * 组件的属性列表
     */
    properties: {
        // 是否显示透明蒙层，防止触摸穿透
        mask: {
            type: Boolean,
            value: false
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        actionsheet_class: "hidden",
        actionsheet_list_class: "hidden",
        inited: false,
        display: false,
        closed: true,
        buttons: [{
            type: "", // text：提示文案，button：按钮
            content: "", // 内容
            className: "",
            click: true, // 是否触发点击事件
            handler: function () {}, // 操作函数
        }]
    },

    /**
     * 组件的方法列表
     */
    methods: {
        close() {
            this.setData({
                buttons: [],
                actionsheet_class: "fadeOut",
                actionsheet_list_class: "slideOutDown",
                closed: true
            });
        },
        open(buttons) {
            this.setData({
                buttons,
                actionsheet_class: "fadeIn",
                actionsheet_list_class: "slideInUp",
                inited: true,
                display: true,
                closed: false
            });
        },
        _maskTapHandler() {
            if (!this.data.mask) {
                this.close();
            }
        },
        _itemTapHandler(event) {
            let dataset = event.currentTarget.dataset;
            let index = dataset.index;
            let item = dataset.item;
            let handler = this.data.buttons[index].handler;
            if (item.click == undefined || item.click) {
                handler && handler(item, index);
                this.close();
            }
        },
        _onAnimationEnd() {
            if (this.data.closed) {
                this.setData({
                    display: false
                });
            }
        }
    }
})