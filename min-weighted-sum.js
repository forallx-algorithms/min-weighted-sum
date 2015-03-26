/*
  Calculates min weighted sum order

  @author Evgeniy Kuznetsov
  @date 26.03.2015
*/

// TODO: ties, fread

// Calculate greedy score of a data instance using difference
// @param {Array.<Integer, Integer>} d
// @return {Integer}
function calcScoreDiff(d) {
  return d[0] - d[1];
}

// Calculate greedy score of a data instance using ratio
// @param {Array.<Integer, Integer>} d
// @return {Float}
function calcScoreRation(d) {
  if(d[1] == 0) {
    return 0;
  } else {
    return d[0]/d[1];
  }
}

// Calculate min weighted sum order
// @param {Array.<Array>} d
// @param {Function} sScoreFn Function for calculating greedy score
// @return {Array.<Array>}
function calcMinWeightedOrder(d, cScoreFn) {
  if(cScoreFn === undefined) cScoreFn = calcScoreRation;

  var mCalcScore = function(di) { return {score: cScoreFn(di), data: di}; };
  var sByScore = function(f, s) { return s.score - f.score; };
  var mExtract = function(mdi) { return mdi.data; }

  return d.map(mCalcScore).sort(sByScore).map(mExtract);
}

// Calculate completion time of an given array
function calcCompletionTime(d) {
  var clength = 0;
  var ctime = 0;

  for(var i in d) {
    clength += d[i][1];

    ctime += d[i][0]*clength;
  }

  return ctime;
}

// section: Tests

var dataSample = [
  [3,5],
  [1,2]
];

console.log("Case 1:", calcScoreDiff(dataSample[0])==(dataSample[0][0]-dataSample[0][1]), calcScoreDiff(dataSample[0]));

function test2(){
  var r = calcMinWeightedOrder(dataSample);

  return r[0][0] == 1 && r[1][0] == 3;
}
console.log("Case 2:", test2());

console.log("Case 3:", calcScoreRation(dataSample[0])==dataSample[0][0]/dataSample[0][1]);

function test4(){
  var r = calcMinWeightedOrder(dataSample, calcScoreRation);

  return r[0][0] == 3 && r[1][0] == 1;
}
console.log("Case 4:", test4());

console.log("Case 5:", calcCompletionTime(calcMinWeightedOrder(dataSample)) == 22, calcCompletionTime(calcMinWeightedOrder(dataSample)));
console.log("Case 6:", calcCompletionTime(calcMinWeightedOrder(dataSample, calcScoreDiff)) == 23);


