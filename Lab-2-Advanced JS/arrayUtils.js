/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/
function flattenArray(arr) {
    let flattened = [];
    for (let i = 0; i < arr.length; i++){
        if (Array.isArray(arr[i])) {
            flattened = flattened.concat(flattenArray(arr[i]));
        } 
        else {
            flattened.push(arr[i]);
        }
    }
    return flattened;
}
function sortArray(arr){
    let number = [];
    let aplhabet = [];
    arr.forEach((key) =>{
        if(typeof(key) === 'string'){
            
            aplhabet.push(key.trim());
        }
        else{
            number.push(key);
        }
    });
    aplhabet.sort();
    number.sort((a,b) => Number(a) - Number(b));
    arr = number.concat(aplhabet);
    return arr;
}
function checkElements(arr){
    for(let i=0; i<arr.length; i++){
        if((typeof(arr[i]) != 'string') && ((typeof(arr[i]) != 'number') || (isNaN(Number(arr[i]))))) throw "input should be a String or number";
    }
}
let mergeCommonElements = (...args) => {
    
    if(args.length<2){
        throw 'At least two arrays are required as input';
    }
    for(let i = 0; i < args.length; i++){
        if(!Array.isArray(args[i])) throw 'Input must be an array';
        if(args[i].length == 0) throw 'empty array';
    }
    
    for(let i = 0; i< args.length; i++){
        args[i] = flattenArray(args[i]);
        checkElements(args[i]);
        args[i] = sortArray(args[i]);
    }
    let result = [];
    args[0].forEach((value) => {
        let common = true;
        for(let i = 1; i < args.length; i++){
            if(!args[i].includes(value)){
                common = false;
            }
        }
        if(common == true){
            result.push(value);
        }
    });
    return result;
};
  
let findTriangles = (arr) => {
    if(!Array.isArray(arr)) throw 'Input must be an array';
    for(let i = 0; i < arr.length; i++){
        if(!Array.isArray(arr[i])) throw 'Input must be an 2D array';
        if(arr[i].length != 3) throw 'array should be valid triangle';
        for(let j = 0; j<arr[i].length ; j++){
            if(typeof arr[i][j] != 'number') throw 'subarray should contain only numbers';
            if(isNaN(arr[i][j])) throw 'subarray should contain only numbers';
        }
    }
    if(arr.length<2) throw 'atleast two arrays';
    let obj = {};
    for(let i = 0; i < arr.length; i++){
        let arr1 = arr[i];
        let perimeter = 0;
        let triangleType = '';
        if(arr1[0]==arr1[1]&& arr1[1]==arr1[2]){
            triangleType = 'Equilateral';
        }
        else if((arr1[0]==arr1[1] || arr1[0] == arr1[2] || arr1[1] == arr1[2])){
            triangleType = 'Isosceles';
        }
        else{
            triangleType = 'Scalene';
        }
        for(let j = 0; j < arr1.length; j++){
            perimeter = arr1[j] + perimeter;
        }
        let area = 0.25 * Math.sqrt((arr1[0] + arr1[1] + arr1[2]) * (-arr1[0] + arr1[1] + arr1[2]) * (arr1[0] - arr1[1] + arr1[2]) * (arr1[0] + arr1[1] - arr1[2]));
        area = (area.toFixed(2) * 100)/100;
        obj[i] = [area,perimeter,triangleType];
    }
    return obj;
};

let stringMetrics = (arr) => {
    if(!Array.isArray(arr)) throw 'Input must be an array';
    for(let i = 0; i < arr.length; i++){
        if(typeof(arr[i]) != 'string') throw 'array should contain only string';
        if(arr[i].trim() == "") throw "Empty string with spaces is not accepted";
    }
    if(arr.length<2) throw 'atleast two strings';
    
    let result = {};
    let vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'];
    let vowel = 0;
    let consonant = 0;
    for(let i = 0; i < arr.length; i++){
        arr[i]=arr[i].trim();
    }
    arr.forEach((str) => {
        for(let i = 0; i< str.length; i++){
            if(vowels.includes(str[i])){
                vowel++;
            }
            else{
                consonant++;
            }
        }
    });
    result['vowels'] = vowel;
    result['consonant'] = consonant;
    let shortest = arr[0];
    let longest = arr[0];
    let long = [];
    let short = [];
    for(let i = 1; i<arr.length; i++){
        if(arr[i].length < shortest.length){
            short[0] = arr[i];
            result['shortest'] = arr[i];
        }
        else if(arr[i].length == shortest.length){
            
            short.push(arr[i]);
            result['shortest'] = short;
        }
    } 
    for(let i = 1; i<arr.length; i++){
        if(arr[i].length > longest.length){
            long[0] = arr[i]; 
            result['longest'] = arr[i];
        }
        else if(arr[i].length == longest.length){ 
            long.push(arr[i]);
            result['longest'] = long; 
        }
    }
    let lengths = [];
    for(let i = 0; i<arr.length; i++){
        lengths.push(arr[i].length);
    }
    let sum = 0;
    for(let i = 0; i<lengths.length; i++){
        sum = sum + lengths[i];
    }
    let mean = sum/lengths.length;
    mean = (mean.toFixed(2) * 100)/100;
    result['mean'] = mean;

    lengths = sortArray(lengths);
    let median = 0;
    let l = lengths.length;
    let middle = Math.floor(l/2);
    if(l% 2 == 0){
        median = (lengths[middle-1] + lengths[middle])/2;
    }
    else{
        median = lengths[middle];
    }
    result['median'] = median;
    let counts = {}
    let mode;
    let count = 0;
    let modeArray = [];
    for(let i = 0; i<l; i++){
        counts[lengths[i]] = (counts[lengths[i]] || 0) + 1;
    }

    Object.keys(counts).forEach((key) => {
        if(counts[key] > count){
            mode = key;
            modeArray[0] = key;
            count = counts[key];
            result['mode'] = mode;
        }
        else if(counts[key] == count){
            
            modeArray.push(key);
            result['mode'] = modeArray; 
        }
    });
    return result;
};

export{
    findTriangles,
    stringMetrics,
    mergeCommonElements
}