/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/
function checkObject(obj){
      if(typeof obj !== 'object') throw 'input is not an object';
      if(Array.isArray(obj)) throw 'Input must be an object';
}
function checkCard(obj){
      let keys = ['suit', 'value'];
      let key1 = Object.keys(obj);
      keys.forEach((key) => {
            if(!key1.includes(key)) throw 'incomplete card information'
            
      });
      key1.forEach((key)=> {
            if(!keys.includes(key)) throw 'extra element in card';
      });
}
function checkSuitValue(obj){
      let suits = ['hearts', 'clubs', 'diamonds', 'spades'];
      let values = ['2', '3', `4`,`5`,`6`,`7`,`8`,`9`, `10`, `J`, `Q`, `K`, `A`];
      if(!suits.includes(obj.suit.trim())) throw 'incorrect suit type';
      if(!values.includes(obj.value.trim())) throw 'incorrect value of card';
}

function straightFlush(arr){
      let count = 1;
      for(let i = 1;i<arr.length; i++){      
            if(arr[i]['suit'].trim() == arr[0]['suit'].trim()){
                  count++;
            }
      }
      if(count >= 5){
            return true
      }
}

function threeOfAKind(arr){
      
      for(let i = 0; i<arr.length-1; i++){
            let count = 1;
            for(let j=i+1;j<arr.length; j++ ){
                  if(arr[i]['value'].trim() === arr[j]['value'].trim()){
                        count++;
                  }
            }
            if(count == 3){
                  return true
            }
      }
}

function pair(arr){
      for(let i = 0; i<arr.length-1; i++){
            let count = 1;
            for(let j=i+1;j<arr.length; j++ ){
                  if(arr[i]['value'].trim() === arr[j]['value'].trim()){
                        count++;
                  }
            }
            if(count == 2){
                  return true
            }
      }
}

let solvePuzzles = (puzzles, pieces) => {
      if(puzzles == undefined) throw 'Puzzles not passed';
      if(pieces == undefined) throw 'Pieces not passed'
      if(!Array.isArray(puzzles)) throw 'Puzzle Input must be an array';
      if(puzzles.length == 0) throw 'empty puzzle ';
      checkObject(pieces);


      let keys = ['a', 'b', 'c', 'd', 'e'];
      let key1 = Object.keys(pieces);
      if(key1.length <1) throw 'empty piece object'
      for(let i = 0; i<key1.length; i++){
            if(!keys.includes(key1[i])) throw 'extra element in piece';  
      }
      keys.forEach((key) => {
                  if(!key1.includes(key)) throw ' pieces is incomplete';
      });
      for(let i = 0; i < puzzles.length; i++){
            let key1 = Object.keys(puzzles[i]);
            if(key1.length <1) throw 'puzzle object cannot be empty';
            for(let j = 0; j<key1.length; j++){
                  if(!keys.includes(key1[j])) throw 'extra element in puzzle';
            }  
      }
      
      keys.forEach((key) => {
            for(let i = 0; i < puzzles.length; i++){
                  let key1 = Object.keys(puzzles[i]);
                  if(!key1.includes(key)){
                      puzzles[i][key] = pieces[key];  
                  }      
            }
      });
      for(let i = 0; i < puzzles.length; i++){
            let key1 = Object.entries(puzzles[i]);
            key1.sort();
            puzzles[i] = Object.fromEntries(key1); 
      }
      return puzzles;
};

let evaluatePokerHand = (hand, communityCards) => {
      if(!Array.isArray(hand)) throw 'hand doesnot exist';
      if(!(hand.length === 2)) throw 'hands should have exactly two cards';
      
      let cards = [];
      for(let i = 0; i<hand.length; i++){
            checkObject(hand[i]);
            checkCard(hand[i]);
            checkSuitValue(hand[i]);
            cards.push(hand[i]);
      }
      if(!Array.isArray(communityCards)) throw 'hand doesnot exist';
      if(communityCards.length < 3 || communityCards.length >5) throw 'community cards should have 3 to 5 cards';
      for(let i = 0; i<communityCards.length; i++){
            checkObject(communityCards[i]);
            checkCard(communityCards[i]);
            checkSuitValue(communityCards[i]);
            cards.push(communityCards[i]);
      }
      
      if (straightFlush(cards)) {
            return "Straight Flush";
      } 
      else if (threeOfAKind(cards)) {
            return "Three of a Kind";
      } 
      else if (pair(cards)) {
            return "Pair";
      } 
      else {
            return "High Card";
      }
};

let combineObjects = (arr) => {
      if(!Array.isArray(arr)) throw 'Input must be an array';
      if(arr.length <= 2) throw 'must have atleast 2 elements';
      for(let i = 0; i<arr.length; i++){
            checkObject(arr[i]);
            let key1 = Object.keys(arr[i]);
            if(key1.length <1) throw 'object cannot be empty';
      }
      let result = {};
      
      Object.keys(arr[0]).forEach((key) => {
            let common = false;
            for(let i = 1; i<arr.length; i++){
                  
                  if(Object.keys(arr[i]).includes(key)){
                        common = true;
                  }
            }
            if(common == true ){
             result[key] = [arr[0][key]];
            }
      });
      Object.keys(result).forEach((key) => {
            for(let i = 1; i<arr.length; i++){
                  if(Object.keys(arr[i]).includes(key)){
                   result[key].push(arr[i][key]);
                  }
            }
      });
      return result;
};


export{
      solvePuzzles,
      evaluatePokerHand,
      combineObjects
  };