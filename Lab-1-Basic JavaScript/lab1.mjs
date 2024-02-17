export const questionOne = (arr) => {
    let vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'];
    let count = 0;
    let x = false;
    arr.forEach((str) => {
        for(let i = 0; i< str.length; i++){
            if(vowels.includes(str[i])){
                count++;
            }
        }
    });
    if(count%2 == 0){
        x = true;
    }
    return [count , x];
}

export const questionTwo = (obj1, obj2) => {
    let result = [];
    let key1 = Object.keys(obj1);
    let key2 = Object.keys(obj2);
    key1.forEach((key) => {
        if(!key2.includes(key)){
            result.push(key);
        }
    });
    key2.forEach((key) => {
        if(!key1.includes(key)){
            result.push(key);
        }
    });
    let number = [];
    let aplhabet = [];
    result.forEach((key) =>{
        if(isNaN(key)){
            aplhabet.push(key);
        }
        else{
            number.push(key);
        }
    });
    aplhabet.sort();
    number.sort((a,b) => Number(a) - Number(b));
    result = number.concat(aplhabet);
    return result;
}

export const questionThree = (arr) => {
    let obj = {};
    for(let i = 0; i < arr.length; i++){
        let arr1 = arr[i];
        let perimeter = 0;
        for(let j = 0; j < arr1.length; j++){
            perimeter = arr1[j] + perimeter;
        }
        let area = 0.25 * Math.sqrt((arr1[0] + arr1[1] + arr1[2]) * (-arr1[0] + arr1[1] + arr1[2]) * (arr1[0] - arr1[1] + arr1[2]) * (arr1[0] + arr1[1] - arr1[2]));
        area = (area.toFixed(2) * 100)/100;
        obj[i] = [area,perimeter];
    }
    return obj;
}

export const questionFour = (string) => {
    let arr = string.split(",");
    for(let i = 0; i<arr.length; i++){
        let len = arr[i].length;
        let str1 = arr[i].slice(0,len/2);
        let str2 = arr[i].slice(len/2,len);
        arr[i] = str2.concat(str1);
    }
    return arr;
}

export const studentInfo= {
    firstName: "Nirmohi Samirbhai",
    lastName: "Patel",
    studentId: "20009631",

};