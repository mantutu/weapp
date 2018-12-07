Page({
  data: {
    date: '',
    datePickerValue: ['2018', '8', '31', '2', '3']
  },
  onLoad: function (options) {
    this.picker = this.selectComponent("#picker");
  },
  showDatePicker: function (e) {
    this.picker.open();
  },
  datePickerOnSureClick: function (e) {
    console.log('datePickerOnSureClick');
    console.log(e);
    let data = e.detail.value;
    this.setData({
      date: data.join("") ? `${data[0]}年${data[1]}月${data[2]}日${data[3]}时${data[4]}分` : "",
      datePickerValue: e.detail.value
    });
  },
  datePickerOnCancelClick: function (event) {
    console.log('datePickerOnCancelClick');
    console.log(event);
  },
})