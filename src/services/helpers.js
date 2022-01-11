export default {
  validateLength(str) {
    return str.length != `` && str.length <= 280;
  },
  formatDate(date) {
    var now = new Date();
    var then = new Date(date);

    var minutes = Math.floor((now - then) / (1000 * 60));
    var hours = Math.floor((now - then) / (1000 * 60 * 60));
    var days = Math.floor((now - then) / (1000 * 60 * 60 * 24));

    var split = new Date(date).toLocaleString().split(',')[0].split('/');
    var month = this.getMonth(split[0]);
    var day = split[1];
    var year = split[2];

    var result = `${month} ${day}, ${year}`;

    if (minutes < 1) {
      return `just now`;
    } else if (minutes < 60) {
      return `${minutes}m`;
    } else if (hours < 24) {
      return `${hours}h`;
    } else if (days < 60) {
      return `${days}d`;
    } else {
      return result;
    }
  },
  getMonth(str) {
    if (str == '1') {
      return 'Jan';
    } else if (str == '2') {
      return 'Feb';
    } else if (str == '3') {
      return 'March';
    } else if (str == '4') {
      return 'April';
    } else if (str == '5') {
      return 'May';
    } else if (str == '6') {
      return 'June';
    } else if (str == '7') {
      return 'July';
    } else if (str == '8') {
      return 'Aug';
    } else if (str == '9') {
      return 'Sep';
    } else if (str == '10') {
      return 'Okt';
    } else if (str == '11') {
      return 'Nov';
    } else {
      return 'Dec';
    }
  },
};
