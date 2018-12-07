Page({
    data: {},
    onLoad: function () {
        this.actionsheet = this.selectComponent("#actionsheet");
    },
    open() {
        this.actionsheet.open([{
            type: "text",
            content: "我是一个提示，如果这里有两行是这样，最好不要超过双行",
            className: "red",
            click: false
        }, {
            type: "button",
            content: "aaaaa",
            handler: () => {
                console.log("aaaaa");
            }
        }]);
    }
})