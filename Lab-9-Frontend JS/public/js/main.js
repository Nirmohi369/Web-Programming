//Here is where you will do all of the logic and processing for the palindrome and prime checking.
(function(){
    function isPalindrome(stringArray){
        let booleanArray = [];
        for(let i = 0; i< stringArray.length; i++){
            str = stringArray[i].trim();
            str = str.toLowerCase().replace(/[^A-za-z0-9]/g, '');
            let reversedStr = str.split("").reverse().join("");
            if(str === reversedStr){
                booleanArray.push(true);
            }
            else{
                booleanArray.push(false);
            }
        }
        return booleanArray;
    }
    function checkPrime(num){
        if(num<=1){
            return false;
        }
        for (let i = 2; i <= Math.sqrt(num); i++){
            if(num % i === 0){
              return false;
            }
        }
        return true;
    }
    const staticForm = document.getElementById('check-form');
    if(staticForm){
        const input = document.getElementById('palindrome_input');
        const errorElement =document.getElementById('error');
        const palindromes = document.getElementById('palindromes');
        staticForm.addEventListener('submit',(event) => {
            event.preventDefault();
            try{
                let text = input.value;
                if(!text) throw 'No string passed here';
                if(text.trim().length===0) throw 'Empty String passed';
                let stringArray = text.split(',').map(str => str.trim());
                const resultArray = isPalindrome(stringArray);
                var li = document.createElement("li");
                let l = resultArray.length;
                let isPrime = checkPrime(l);
                if(isPrime){
                    li.setAttribute("class", "prime");
                }
                else{
                    li.setAttribute("class","not-prime");
                }          
                li.appendChild((document.createTextNode(JSON.stringify(resultArray))));
                palindromes.appendChild(li);
            }catch(e){
                const message = typeof e === 'string' ? e : e.message;
                errorElement.textContent = message;
            }
        });
    }
}
)();