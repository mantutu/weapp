Page({
    data: {},
    modal1() {
        this.modal.showModal({
            content: '内容',
            showCancel: false,
            confirm() {
                console.log('用户点击确定');
            }
        });
    },
    modal2() {
        this.modal.showModal({
            title: '标题',
            showCancel: false,
            confirm() {
                console.log('用户点击确定');
            }
        });
    },
    modal3() {
        this.modal.showModal({
            title: '标题',
            content: "内容",
            showCancel: false,
            confirm() {
                console.log('用户点击确定');
            }
        });
    },
    modal4() {
        this.modal.showModal({
            title: '标题',
            content: "内容",
            confirm() {
                console.log('用户点击确定');
            },
            cancel() {
                console.log('用户点击取消');
            }
        });
    },
    modal5() {

    },
    onLoad() {
        this.modal = this.selectComponent("#modal");
    }
})