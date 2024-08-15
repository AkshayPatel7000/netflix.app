import moment from 'moment';

export const getFromToDate = (from, to) => {
  let fromm = new Date(from);
  let too = new Date(to);
  let fromDate = moment(fromm).format('MMM DD');
  let toDate = moment(too).format('MMM DD');

  if (toDate == 'Invalid date' || fromDate == 'Invalid date') {
    return '';
  }

  return `From ${fromDate} To ${toDate}`;
};

export const toCurrentTimeZone = date => {
  let dt = moment(date);
  let timeOffset = new Date().getTimezoneOffset();
  if (timeOffset > 0) {
    dt.add(Math.abs(timeOffset), 'minute');
  } else {
    dt.subtract(Math.abs(timeOffset), 'minute');
  }
  return dt.toDate();
};

export const filterArrOnDate = arr => {
  return arr.sort(function compare(a, b) {
    var dateA = new Date(a.createdAt);
    var dateB = new Date(b.createdAt);
    return dateB - dateA;
  });
};

export const timezoneToUTC = actualDT => {
  let value = new Date();
  if (actualDT) {
    value = new Date(actualDT);
  }
  let diff = new Date().getTimezoneOffset() * 60000;
  return new Date(value.getTime() + diff);
};

export const wait = async (time = 1000) => {
  return new Promise(res => {
    setTimeout(() => {
      res();
    }, time);
  });
};

export const dateTimeAgo = (dateTime = new Date()) => {
  let momentCreatedData = moment(dateTime);
  let currentMoment = moment();
  let agoText = '';
  let remainMinutes = momentCreatedData.diff(currentMoment, 'minutes');
  let remainHours = momentCreatedData.diff(currentMoment, 'hours');
  let remainDays = momentCreatedData.diff(currentMoment, 'days');
  let remainMonths = momentCreatedData.diff(currentMoment, 'months');

  if (remainDays > 1) {
    return `After ${remainDays} Days`;
  } else {
    return '';
  }
};

export const getIsTestStarted = item => {
  var isStarted = false;
  if (item) {
    var momentCreatedData = moment(item);
    var currentMoment = moment();
    var difference = momentCreatedData.diff(currentMoment, 'milliseconds');
    if (difference > 0) {
      isStarted = false;
    } else {
      isStarted = true;
    }
  } else {
    isStarted = true;
  }
  return {
    isStarted: isStarted,
    diff: item,
  };
};
