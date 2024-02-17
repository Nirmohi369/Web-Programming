import * as lab1 from "./lab1.mjs";


console.log(lab1.questionOne(["Hello", "good", "weather", "today"]));
console.log(lab1.questionOne(["I", "love", "CS 546.", "Best class ever."])); 
console.log(lab1.questionOne(["Ths s nrdbl", "grd"]));
console.log(lab1.questionOne(["VOWELS", "Consonants", "@Alphabets"]));
console.log(lab1.questionOne(["$djhjoisEEE", "#star*", "empty", "1@one *"]));

console.log(lab1.questionTwo({ a: 3, b: 2, c: 1, d: 7 }, { a: 6, b: 5, c: 4, e: 8 })); 
console.log(lab1.questionTwo({ a: 3, b: 2, f: 1, g: 46 }, { d: 3, e: 4, c: 5, g: 2 })); 
console.log(lab1.questionTwo( {'1': true, a: 5, '2': 'hi'}, {'3': true, b: 5, '44': "hi", '4': "bye", '5': 8})); 
console.log(lab1.questionTwo( {'car': true, a: true, 'colour': 'blue'}, {'a': true, 'colour': 'green', 'model': 5, 'wheels': "black", '4': 8})); 
console.log(lab1.questionTwo( { 'name': 'Alice', age: 30, 'city': 'New York'}, { 'name': 'Bob', gender: 30, 'city': 'Clifton'})); 

console.log(lab1.questionThree([[3,3,3], [3,3,4], [5,4,2]])); 
console.log(lab1.questionThree([[7,5,5], [2,4,3], [8,5,6], [12,12,11]]));
console.log(lab1.questionThree([[6,8,10], [5,5,6], [5,4,3]]));  
console.log(lab1.questionThree([[13,17,19], [60,45,34]]));   
console.log(lab1.questionThree([[7,9,12], [10,15,20], [4,6,8], [8,9,10], [14,6,10]]));

console.log(lab1.questionFour('patrick,hill,trees,home')); 
console.log(lab1.questionFour('joseph,ball,square,pencil')); 
console.log(lab1.questionFour('programming,leetcode,competitive,data')); 
console.log(lab1.questionFour('babbio,bruchard,howe,wesley.j,ucc,p')); 
console.log(lab1.questionFour('left,right,top,bottom,side')); 