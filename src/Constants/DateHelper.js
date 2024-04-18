export const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];
export const years = [2020, 2019, 2018];
const weekDaysNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
import moment from 'moment';

export const DateHelper = {
  formatToDateAMPM: function (date) {
    try {
      return moment(date).format('DD-MM-YYYY hh:mm a');
      //return this.formatToDate(date) + ', ' + this.formatAMPM(date);
    } catch (err) {
      return '';
    }
  },
  formatAMPM: function (date) {
    try {
      return moment(date).format('hh:mm a');
      //return this.formatToDate(date) + ', ' + this.formatAMPM(date);
    } catch (err) {
      return '';
    }
  },
  formatToDate: function (date) {
    try {
      return moment(date).format('DD-MM-YYYY');
      //return this.formatToDate(date) + ', ' + this.formatAMPM(date);
    } catch (err) {
      return '';
    }
  },

  formatToDateYYMMDD: function (date) {
    try {
      return moment(date).format('M-D-YYYY');
      //return this.formatToDate(date) + ', ' + this.formatAMPM(date);
    } catch (err) {
      return '';
    }
  },
  formatToDateDMY: function (date) {
    try {
      return moment(date).format('DD-MM-YYYY');
      //return this.formatToDate(date) + ', ' + this.formatAMPM(date);
    } catch (err) {
      return '';
    }
  },
  formatToDateYMD: function (date) {
    try {
      return moment(date).format('YYYY-MM-DD');
      //return this.formatToDate(date) + ', ' + this.formatAMPM(date);
    } catch (err) {
      return '';
    }
  },
  formatToDatePut: function(date){
    try{
    return moment(date).format('YYYY-MM-DD');
    //return this.formatToDate(date) + ', ' + this.formatAMPM(date);
    }catch(err){
    return ""
    }
  },
  getMonthFromDateFormat: function (date) {
    try {
      let newDate = String(date).split('-');
      let monthNum = parseInt(String(newDate[1]));
      return `${monthNames[monthNum - 1]}`;
    } catch (err) {
      return '';
    }
  },
  getDateMontYear: function (date){
    try {
      let newDate = String(date).split('-');
      let monthNum = parseInt(String(newDate[1]));
      return `${moment(date).format(`DD`)}-${monthNames[monthNum - 1]}-${moment(date).format(`yyyy`)} `;
    } catch (err) {
      return '';
    }
  },

  getDayFromDateFormat: function (date) {
    try {
      let newDate = String(date).split('-');
      let dayNum = parseInt(String(newDate[2]));
      return `${dayNum}`;
    } catch (err) {
      return '';
    }
  },

  formatToHHMM(date) {
    try {
      let newDate = String(date).split(':');
      if (newDate[2] == undefined) {
        return '';
      }
      return `${newDate[0]}:${newDate[1]}`;
    } catch (err) {
      return '';
    }
  },

  getDateFromFormat(date) {
    date = date.split('-');
    let day = parseInt(date[2]);
    let month = parseInt(date[1]) - 1;
    let year = parseInt(date[0]);
    //new Date(2020, 10, 1)
    return new Date(year, month, day);
  },

  getDifferenceBtwDate(date1, date2) {
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  },

  getDateFromFormatLabel(date) {
    date = date.split('-');
    let day = parseInt(date[1]);
    let month = parseInt(date[0]) - 1;
    let year = parseInt(date[2]);
    //new Date(2020, 10, 1)
    //return date[2] + date[1]
    return new Date(year, month, day);
  },

  getDDMMYYYYFormatLabel(date) {
    date = date.split('-');
    let day = date[2];
    let month = date[1];
    let year = date[0];
    return `${day}-${month}-${year}`;
  },

  getFirstAndLastDateOfMonth() {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return {
      firstDay,
      lastDay,
    };
  },
};
