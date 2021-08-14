function sleep(seconds) {
  return new Promise(resolve => setTimeout(resolve, seconds));
}

module.exports = {
  sleep,
};
