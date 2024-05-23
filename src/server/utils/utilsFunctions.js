function generateRandomInteger(length = 6) {
  if (length < 1) {
    throw new Error("Length should be at least 1.");
  }

  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;

  // Generate a random integer within the specified length
  const result = Math.floor(Math.random() * (max - min + 1)) + min;

  return result;
}

module.exports = generateRandomInteger;
