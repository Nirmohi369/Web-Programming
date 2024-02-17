/* TODO: Import the functions from your three modules here and write two test cases for each function.. You should have a total of 18 test cases. 
do not forget that you need to create the package.json and add the start command to run app.js as the starting script*/

import {
    solvePuzzles,
    evaluatePokerHand,
    combineObjects
} from './objUtils.js';

import {
    findTriangles,
    stringMetrics,
    mergeCommonElements
} from './arrayUtils.js';

import {
    mashUp,
    emojiCounter,
    sortStockPrices    
} from './stringUtils.js';

try {
    console.log(solvePuzzles([{a: 23, b: 17, d: 2}, {b: 17, d: 3, e: "hello"}], {a: 45, b: 60, c:-3, d: 88, e: 12}));
} catch (e) {
    console.log(e);
}
try {
    console.log(solvePuzzles([{b: "tree", d: "patrick"}], {a: "house", b: "apple", c: 50, d: 100, f:200}));
} catch (e) {
    console.log(e);
}

try {
    let hand = [{suit: 'hearts', value: '5'}, {suit: 'clubs', value: '5'}];
    let communityCards = [
    {suit: 'diamonds', value: '4'},
    {suit: 'spades', value: '5'},
    {suit: 'hearts', value: '2'},
    {suit: 'clubs', value: 'J'},
    {suit: 'diamonds', value: 'Q'}];
    console.log(evaluatePokerHand(hand, communityCards));
} catch (e) {
    console.log(e);
}
try {
    let hand = [{suit: 'hearts', value: '5'}];
    let communityCards = [
    {suit: 'diamonds', value: '9'},
    {suit: 'spades', value: '5'},
    {suit: 'hearts', value: '2'},
    {suit: 'clubs', value: 'J'},
    {suit: 'diamonds', value: 'Q'}];
    console.log(evaluatePokerHand(hand,communityCards));
} catch (e) {
    console.log(e);
}

try {
    console.log(combineObjects([{ j: true, ba: 7, c: 5 , d:7},{ j: 90, e: 9, a:"apple" },{ j: 15, dd: 2 }]));
} catch (e) {
    console.log(e);
}
try {
    console.log(combineObjects([{ j: true, ba: 7, c: 5 , d:7},{}]));
} catch (e) {
    console.log(e);
}

try {
    console.log(findTriangles([[3,3,3], [3,3,4], [5,4,2]]));
} catch (e) {
    console.log(e);
}
try {
    console.log(findTriangles( [3,3,4]));
} catch (e) {
    console.log(e);
}

try {
    console.log(stringMetrics(["hello", "patrick", "hill", "trees", "seventeen"]));
} catch (e) {
    console.log(e);
}
try {
    console.log(stringMetrics(["apple"]));
} catch (e) {
    console.log(e);
}

try {
    console.log(mergeCommonElements([5, 3, "apple", "banana"], [5, "banana", 2, 4], [1, 5, "apple", "banana", 0]));
} catch (e) {
    console.log(e);
}
try {
    console.log(mergeCommonElements([1, 2, 3], [], [4, 5, 6]));
} catch (e) {
    console.log(e);
}

try {
    console.log(mashUp("helloooo", "world!"));
} catch (e) {
    console.log(e);
}
try {
    console.log(mashUp("h","e"));
} catch (e) {
    console.log(e);
}

try {
    console.log(emojiCounter("I am so happy :joy::joy: about scoring a :100: on :my : test! I feel :fire:! But ::100: doesn't count. Neither does :joy::100: in a row."));
} catch (e) {
    console.log(e);
}
try {
    console.log(emojiCounter("          "));
} catch (e) {
    console.log(e);
}

try {
    let lastStocks = `AAPL,175.25|GOOG,135.40|AMZN,140.00`;
    let currStocks = `amzn,136.75|GOOG,135.60|AAPL,180.12`;
    console.log(sortStockPrices(lastStocks,currStocks));
} catch (e) {
    console.log(e);
}
try {
    let lastStocks = `GME,18.25|AMC, 8.00|PFE, 34.00`;
    let currStocks = `amc, 7.75|GME, 18.80|AAL, 13.32`;
    console.log(sortStockPrices(lastStocks,currStocks));
} catch (e) {
    console.log(e);
}