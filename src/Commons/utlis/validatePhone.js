module.exports = (phone) => (phone.startsWith('+62') || phone.startsWith('0'))
  && phone.length >= 8
  && phone.length < 20;
