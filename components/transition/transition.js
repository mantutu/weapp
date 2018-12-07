Component({
    /**
     * 组件的属性列表
     */
    properties: {
        name: {
            type: String,
            value: "fadeIn"
        },
        show: {
            type: Boolean,
            value: false,
            observer: 'observeShow'
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        inited: false,
        display: false
    },

    /**
     * 组件的方法列表
     */
    methods: {
        observeShow(value) {
            if (value) {
                this.show();
            } else {
                this.setData({
                    type: 'fadeOut'
                });
            }
        },
        show() {
            this.setData({
                inited: true,
                display: true,
                type: 'fadeIn'
            });
        },
        onAnimationEnd() {
            console.log(this.data.show, "display");
            if (!this.data.show) {
                this.setData({
                    display: false
                });
            }
        }
    }
})