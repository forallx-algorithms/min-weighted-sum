/*
  Calculates min weighted sum order

  @author Evgeniy Kuznetsov
  @date 26.03.2015
*/

// Calculate greedy score of an data instance using difference
// @param {Array.<Integer, Integer>} d
// @return {Float}
function calcScoreDiff(d) {
  return d[0] - d[1];
}

// Calculate min weighted sum order
// @param {}
function calcMinWeightedOrder(d, diffFn) {
  if(diffFn === undefined) diffFn = calcScoreDiff;

  var mCalcScore = function(di) { return {score: diffFn(di), data: di}; };
  var sByScore = function(f, s) { return s.score - f.score; };
  var mExtract = function(mdi) { return mdi.data; }

  return d.map(mCalcScore).sort(sByScore).map(mExtract);
}

// section: Tests

var dataSample = [
  [74, 59],
  [31, 73],
  [45, 79]
];

console.log("Case 1:", calcScoreDiff(dataSample[0])==(dataSample[0][0]-dataSample[0][1]), calcScoreDiff(dataSample[0]));

function test2(){
  var r = calcMinWeightedOrder(dataSample);

  return r[0][0] == 74 && r[1][0] == 45 && r[2][0] == 31;
}
console.log("Case 2:", test2());


