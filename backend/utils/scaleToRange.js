const scaleToRange = (value, min, max) => {
  return Math.floor(((value - min) / (max - min)) * (5 - 1) + 1);
};

module.exports = scaleToRange;
