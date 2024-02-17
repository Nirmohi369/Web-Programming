/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/
function checkString(string){
      
      if(typeof(string) != 'string') throw "message should be a String";
      if(string.trim() == "") throw "Empty string with spaces is not accepted";
}
function checkStockTicker(string){

      if(!(string.length >=1 || string.length <=5)) throw 'StockTicker should be of length 1-5';
      for(let i = 0; i< string.length; i++){
            const n = string.charCodeAt(i);
            if(n < 97|| n>122) throw 'StockTicker should only have characters from a-z';
      }
}

function checkStockPrice(string){
      if(isNaN(Number(string))) throw 'StockPrice should be a represenation of number';      
}
let emojiCounter = (message) => {

      checkString(message);
      
      let count = 0;
      const emoji = /:(\S+?):/g;
      const match = message.match(emoji);
      if(match != undefined){
            count = match.length;
      }
      return count;
};

let sortStockPrices = (lastStocks, currStocks) => {

      checkString(lastStocks);
      checkString(currStocks);
      lastStocks =lastStocks.toLowerCase();
      currStocks = currStocks.toLowerCase();
      let lastStockobj = {};
      let currStockobj = {};
      let stock1 = lastStocks.split("|");
      
      for(let i = 0; i<stock1.length; i++){
            const [name, price] = stock1[i].split(",");
            lastStockobj[name.trim()] = price;
      }
      let stock2 = currStocks.split("|");
      
      for(let i = 0; i<stock2.length; i++){
            const [name, price] = stock2[i].split(",");
            currStockobj[name.trim()] = price;
      }
      let key1 = Object.keys(lastStockobj);
      let key2 = Object.keys(currStockobj);
      key1.forEach((key) => {
            if(!key2.includes(key)) throw 'strings do not have same stocks'
            checkStockTicker(key);
            checkStockPrice(lastStockobj[key]);
      });
      key2.forEach((key) => {
            if(!key1.includes(key)) throw 'strings do not have same stocks' 
            checkStockTicker(key);
            checkStockPrice(currStockobj[key]);
      });
      let result = [];
      for(let i = 0; i <key1.length; i++){
            let obj = {};
            let stock = key1[i];
            stock = stock.toUpperCase();
            obj['symbol'] = stock;
            obj['price'] = currStockobj[key1[i]];
            let newPrice = currStockobj[key1[i]];
            let oldPrice = lastStockobj[key1[i]];
            let change = ((newPrice - oldPrice)/oldPrice)*100;
            change = (change.toFixed(1) * 100)/100;
            obj['change'] = change;
            result[i] = obj;
      }
      return result;
};

let mashUp = (string1, string2) => {
      checkString(string1);
      checkString(string2);
      string1 = string1.trim();
      string2 = string2.trim();
      let len1 = string1.length;
      let len2 = string2.length;
      if(len1 < 4|| len2 < 4) throw "String must be atleast 4 characters long";
      let str1 = string1.slice(0,4);
      let str2 = string1.slice(4,len1);
      let str3 = string2.slice(0,4);
      let str4 = string2.slice(4,len2);
      string1 = str3.concat(str2);
      string2 = str1.concat(str4);
      return (string1 + " " + string2);
};
export{
      mashUp,
      emojiCounter,
      sortStockPrices
  };