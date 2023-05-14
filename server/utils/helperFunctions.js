function isWithin3Days(date) {
  const now = new Date();
  const createdAt = new Date(date);
  const difference = now - createdAt;
  const days = difference / (1000 * 60 * 60 * 24);

  return days < 3;
}

function getRemainingDays(date) {
  const createdAt = new Date(date);
  const thresholdDate = new Date(createdAt);
  thresholdDate.setDate(thresholdDate.getDate() + 3);
  const remainingTime = thresholdDate - new Date();
  const remainingDays = Math.ceil(remainingTime / (1000 * 60 * 60 * 24));

  return remainingDays;
}

function generateRandomEmailID(length = 10) {
  return Math.random()
    .toString(36)
    .substring(2, length + 2);
}

module.exports = {
  isWithin3Days,
  getRemainingDays,
  generateRandomEmailID,
};
