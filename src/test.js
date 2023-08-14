// Math.asin(4596 / 2720 / 7.2) +
// Math.asin(5610 / 5269 / 7.2) +
// Math.asin(2105 / 1600 / 7.2) +
// Math.asin(5381 / 2926 / 7.2) +
// Math.asin(2560 / 2027 / 7.2) +
// Math.asin(1909 / 2138 / 7.2) +
// Math.asin(2302 / 2048 / 7.2) +
// Math.asin(1607 / 2047 / 7.2)

const alpha =
  (Math.PI -
    (Math.asin(4596 / 2720 / 7.2) +
      Math.asin(5610 / 5269 / 7.2) +
      Math.asin(2105 / 1600 / 7.2) +
      Math.asin(5381 / 2926 / 7.2) +
      Math.asin(2560 / 2027 / 7.2) +
      Math.asin(1909 / 2138 / 7.2) +
      Math.asin(2302 / 2048 / 7.2) +
      Math.asin(1607 / 2047 / 7.2)) *
      2) /
  7

const degs = [
  Math.asin(2560 / 2027 / 7.2),
  Math.asin(5381 / 2926 / 7.2),
  Math.asin(2105 / 1600 / 7.2),
  Math.asin(4596 / 2720 / 7.2),
  Math.asin(5610 / 5269 / 7.2),
  Math.asin(1909 / 2138 / 7.2),
  Math.asin(2302 / 2048 / 7.2),
  Math.asin(1607 / 2047 / 7.2)
]

const updatedDegs = []

for (var index = 0; index < degs.length; index++) {
  if (index === 0) updatedDegs.push(degs[index])
  else {
    updatedDegs.push(alpha + degs[index] + degs[index - 1] + updatedDegs[index - 1])
  }
}
