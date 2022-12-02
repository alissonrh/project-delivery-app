const totalPriceCalculator = (prodArray) => parseFloat(
  prodArray.reduce((acc, curr) => acc + curr).toFixed(2),
);

module.exports = { totalPriceCalculator };
