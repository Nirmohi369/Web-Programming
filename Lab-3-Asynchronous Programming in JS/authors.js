//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//Authors data link: https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json

//you must use axios to get the data
import axios from 'axios';
async function getAuthors(){
    try{
        const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json')
        return data
    }catch(error){
        console.error(error.message);
    } 
}
async function getBooks(){
    try{
        const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json')
        return data
    }catch(error){
        console.error(error.message);
    } 
}

function sortedArray (result){
    const sortedresult = result.slice();
    sortedresult.sort((a,b) =>{
        const lastNameA = a.split(' ')[1];
        const lastNameB = b.split(' ')[1];
        if(lastNameA > lastNameB){
            return 1;
        }
        else if(lastNameA <lastNameB){
            return -1;
        }
        else{
            return 0;
        }
    });
    return sortedresult;
}
const getAuthorById = async (id) => {
    const authors = await getAuthors();
    if(!id){
        throw new Error ('id parameter is missing')
    }
    if(typeof id !== 'string'){
        throw new Error ('id is not a string');
    }
    if(id.trim().length === 0){
        throw new Error ('empty id');
    }
    id = id.trim();
    let result = null;
    for (const author of authors) {
        if (author.id === id) {
          result = author;
          break; 
        }
    }
    if(!result){
        throw new Error('Author not found');
    }
    return result;
};
const searchAuthorByName = async (searchTerm) => {
    const authors = await getAuthors();
    if(!searchTerm){
        throw new Error ('Searchterm is missing')
    }
    if(typeof searchTerm !== 'string'){
        throw new Error ('Searchterm is not a string');
    }
    if(searchTerm.trim().length === 0){
        throw new Error ('empty search term');
    }
    searchTerm = searchTerm.toLowerCase().trim();
    let result = [];
    for (const author of authors) {
        if ((author.first_name.toLowerCase().includes(searchTerm.trim())) || (author.last_name.toLowerCase().includes(searchTerm.trim()))){
          result.push(author.first_name.trim() + " " + author.last_name.trim());
        }
    }
    if(result.length === 0){
        throw new Error ('match not found');
    }
    return sortedArray(result);
};

const getBookNames = async (firstName, lastName) => {
    const authors = await getAuthors();
    const bookArray = await getBooks();
    if(!firstName){
        throw new Error ('firstName is missing')
    }
    if((typeof firstName !== 'string')){
        throw new Error ('firstname not a string');
    }
    if((firstName.trim().length === 0)){
        throw new Error ('first name is empty string');
    }
    if(!lastName){
        throw new Error ('lastName is missing')
    }
    if((typeof lastName !== 'string')){
        throw new Error ('lastname not a string');
    }
    if((lastName.trim().length === 0)){
        throw new Error ('last name is empty string');
    }
    firstName = firstName.toLowerCase().trim();
    lastName = lastName.toLowerCase().trim();
    let bookNames = [];
    let ids = [];
    let isThere = false;
    for (const author of authors) {
        if (((author.first_name.toLowerCase()=== firstName)) && (author.last_name.toLowerCase() === lastName)){
            ids = author.books;
            isThere = true;
        }
    }
    if(isThere === false){
        throw new Error ('author not found');
    }
    for(let i = 0; i<ids.length; i++){
        for(const book of bookArray){
            if(book.id == ids[i]){
                bookNames.push(book.title.trim());
            }
        }
    }
    
    if(bookNames.length === 0){
        throw new Error ('author is found but no books written');
    }
    const sortedresult = bookNames.slice();
    sortedresult.sort();
    return sortedresult;
};

const youngestOldest = async () => {
    const authors = await getAuthors();
    let result = {};
    let youngArray = [];
    let oldArray = [];
    let young = authors[0];
    let old = authors[0];
    for (const author of authors) {
        let y = Number(author.date_of_birth.split('/')[2]);
        let m = Number(author.date_of_birth.split('/')[0]);
        let d = Number(author.date_of_birth.split('/')[1]);
        if(y>Number(young.date_of_birth.split('/')[2])){
            young = author;
            youngArray[0] = author.first_name + ' ' + author.last_name;
            result['youngest'] = author.first_name + ' ' + author.last_name;
        }
        else if(y === Number(young.date_of_birth.split('/')[2])){
            if(m > Number(young.date_of_birth.split('/')[0])){
                young = author;
                youngArray[0] = author.first_name + ' ' + author.last_name;
                result['youngest'] = author.first_name + ' ' + author.last_name;
            }
            else if(m === Number(young.date_of_birth.split('/')[0])){
                if(d > Number(young.date_of_birth.split('/')[1])){
                    young = author;
                    youngArray[0] = author.first_name + ' ' + author.last_name;
                    result['youngest'] = author.first_name + ' ' + author.last_name;
                }
                else if (d === Number(young.date_of_birth.split('/')[1])){
                    youngArray.push(author.first_name + ' ' + author.last_name);
                    youngArray = sortedArray(youngArray);
                    result['youngest'] = youngArray;
                }
            }
        }
        if(y<Number(old.date_of_birth.split('/')[2])){
            old = author;
            oldArray[0] = author.first_name + ' ' + author.last_name;
            result['oldest'] = author.first_name + ' ' + author.last_name;
        }
        else if(y === Number(old.date_of_birth.split('/')[2])){
            if(m < Number(old.date_of_birth.split('/')[0])){
                old = author;
                oldArray[0] = author.first_name + ' ' + author.last_name;
                result['oldest'] = author.first_name + ' ' + author.last_name;
            }
            else if(m === Number(old.date_of_birth.split('/')[0])){
                if(d < Number(old.date_of_birth.split('/')[1])){
                    old = author;
                    oldArray[0] = author.first_name + ' ' + author.last_name;
                    result['oldest'] = author.first_name + ' ' + author.last_name;
                }
                else if (d === Number(old.date_of_birth.split('/')[1])){
                    oldArray.push(author.first_name + ' ' + author.last_name);
                    oldArray = sortedArray(oldArray);
                    result['oldest'] = oldArray;
                }
            }
        }

    }
    return result;
};

const sameBirthday = async (month, day) => {
    const authors = await getAuthors();
    if(!month){
        throw new Error ('month is missing')
    }
    if(!day){
        throw new Error ('day is missing')
    }
    if(isNaN(month)){
        throw new Error ('month not a number');
    }
    if(isNaN(day)){
        throw new Error ('day not a number');
    }
    if(month>12){
        throw new Error ('Month > 12');
    }
    if(month<1){
        throw new Error ('Month cannot be negative or zero')
    }
    if((month === 1)||(month === 3)||(month === 5)||(month === 7)||(month === 8)||(month === 10)||(month === 12)){
        if(day >31){
            throw new Error ('day > 31 is not possible');
        }
    }
    if((month === 4)||(month === 6)||(month === 9)||(month === 11)){
        if(day >30){
            throw new Error ('day > 30 in month that has 30 days');
        }
    }
    if((month === 2) && (day > 28)){
            throw new Error ('There are not ' + day + ' days in Feb');
    }
    let result = [];
    for (const author of authors) {
        let m = Number(author.date_of_birth.split('/')[0]);
        let d = Number(author.date_of_birth.split('/')[1]);
        if ((m == month) && (d == day)){
          result.push(author.first_name.trim() + " " + author.last_name.trim());
        }
    }
    if(result.length === 0){
        throw new Error ('match not found');
    }
    return sortedArray(result);
};
export{
    getAuthors,
    getBooks,
    getAuthorById,
    searchAuthorByName,
    getBookNames,
    youngestOldest,
    sameBirthday
}