Component({
    properties: {
        value: {
            type: Array,
            value: [],
            observer: "onValue"
        }
    },
    data: {
        years: [],
        months: [],
        days: [],
        tempYearPos: [0],
        tempMonthPos: [0],
        tempDayPos: [0],
        tempHourPos: [0],
        tempMinutePos: [0],
        showPicker: false
    },
    attached: function () {
        // 初始化年月日时分
        var date = new Date();
        var years = [];
        var months = [];
        var days = [];
        var hours = [];
        var minutes = [];

        for (let i = 1900; i <= date.getFullYear(); i++) {
            years.push(i);
        }

        for (let i = 1; i <= 12; i++) {
            let month = 0;
            month = i < 10 ? '0' + i : i;
            months.push(month);
        }

        days = this._getDays(date.getFullYear(), date.getMonth() + 1);
        hours = this._getArray(24);
        minutes = this._getArray(60);

        this.setData({
            years,
            months,
            days,
            hours,
            minutes
        });
    },
    methods: {
        open() {
            this._getRefreshData();
            this.setData({
                showPicker: true
            });
        },
        close() {
            this.setData({
                showPicker: false
            });
        },
        _getArray(len) {
            return Array.from({
                length: len
            }, (item, index) => {
                return index >= 10 ? index : `0${index}`
            });
        },
        _onTouch(event) {},
        _onCancel(e) {
            this.triggerEvent('cancel', {});
            this.close();
        },
        _onClear(e) {
            this.triggerEvent('confirm', {
                value: ['', '', '', '', ''],
            });
            this.close();
        },
        _onConfirm(e) {
            let data = this.data;
            var curYear = data.years[data.tempYearPos[0]];
            var curMonth = data.months[data.tempMonthPos[0]];
            var curDay = data.days[data.tempDayPos[0]];
            var curHour = data.hours[data.tempHourPos[0]]
            var curMinute = data.minutes[data.tempMinutePos[0]]
            var value = [curYear, curMonth, curDay, curHour, curMinute];
            this.triggerEvent('confirm', {
                value,
            });
            this.close();
        },
        _onChangeYear(e) {
            //年改变，月要滑到一月，天要重新计算该年该月多少天
            let data = this.data;
            var curYear = data.years[e.detail.value[0]];
            var days = this._getDays(curYear, 1);
            this.setData({
                days: days,
                tempYearPos: e.detail.value,
                tempMonthPos: [0],
                tempDayPos: [0],
            });
        },
        _onChangeMonth(e) {
            let data = this.data;
            var curYear = data.years[data.tempYearPos[0]];
            var curMonth = data.months[e.detail.value[0]];
            var days = this._getDays(curYear, curMonth);
            this.setData({
                days: days,
                tempMonthPos: e.detail.value,
                tempDayPos: [0],
            });
        },
        _onChangeDay(e) {
            this.setData({
                tempDayPos: e.detail.value
            });
        },
        _onChangeHour(e) {
            this.setData({
                tempHourPos: e.detail.value
            });
        },
        _onChangeMinute(e) {
            this.setData({
                tempMinutePos: e.detail.value
            });
        },
        onValue() {
            //通过传进来的年月日,计算对应的index
            this._getRefreshData();
        },
        _getDays(year, month) {
            var days = [];
            month = parseInt(month, 10);
            var date = new Date(year, month, 0);
            var maxDay = date.getDate();
            for (let i = 1; i <= maxDay; i++) {
                let day = 0;
                day = i < 10 ? '0' + i : i;
                days.push(day);
            }
            return days;
        },
        _findArray(array, value) {
            let findValue = "";
            for (let i = 0, len = array.length; i < len; i++) {
                var item = array[i];
                if (+item == +value) {
                    findValue = i;
                    break;
                }
            }

            return `${findValue}`;
        },
        _getRefreshData() {
            let data = this.data;
            console.log(this.data.value, "value");
            //通过传进来的年月日,计算对应的inde
            if (data.years == null || data.years.length == 0) {
                return;
            }

            var date = new Date();
            var tempYearPos = data.years.length - 1;
            var tempMonthPos = date.getMonth();
            var tempDayPos = date.getDate() - 1;
            var tempHourPos = date.getHours();
            var tempMinutePos = date.getMinutes();
            tempYearPos = this._findArray(data.years, data.value[0]) || tempYearPos;
            tempMonthPos = this._findArray(data.months, data.value[1]) || tempMonthPos;
            var curYear = data.years[tempYearPos];
            var days = this._getDays(curYear, data.months[tempMonthPos]);
            tempDayPos = this._findArray(days, data.value[2]) || tempDayPos;
            tempHourPos = this._findArray(data.hours, data.value[3]) || tempHourPos;
            tempMinutePos = this._findArray(data.minutes, data.value[4]) || tempMinutePos;
            this.setData({
                days,
                tempYearPos: [tempYearPos],
                tempMonthPos: [tempMonthPos],
                tempDayPos: [tempDayPos],
                tempHourPos: [tempHourPos],
                tempMinutePos: [tempMinutePos]
            });
        },
    }
});