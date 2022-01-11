export default {
  validateLength(str) {
    return str.length != `` && str.length <= 280;
  },
  formatDate(date) {
    return new Date(date).toLocaleString();
  },
};
