//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//Books data link: https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json
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

const getBookById = async (id) => {
    const bookArray = await getBooks();
    if(!id){
        throw new Error ('id parameter is missing')
    }
    if(typeof id !== 'string'){
        throw new Error ('id is not a string');
    }
    if(id.trim().length === 0){
        throw new Error ('empty id passed');
    }
    id = id.trim();
    let result = null;
    for (const book of bookArray) {
        if (book.id === id) {
          result = book;
          break; 
        }
    }
    if(!result){
        throw new Error('book not found');
    }
    return result;
};

const getAuthorName = async (bookId) => {
    const bookArray = await getBooks();
    const authors = await getAuthors();
    if(!bookId){
        throw new Error ('bookid parameter is missing')
    }
    if(typeof bookId !== 'string'){
        throw new Error ('bookId is not a string');
    }
    if(bookId.trim().length === 0){
        throw new Error ('empty bookId');
    }
    let result = null;
    bookId = bookId.trim();
    let b = undefined;
    for (const book of bookArray) {
        
        if (book.id === bookId) {
            b = book.authorId
            break; 
        }
    }
    if(!b){
        throw new Error('book not found');
    }
    for(const author of authors){
        if(b === author.id){
            result = author.first_name + ' ' + author.last_name
            return result;
        }
    }
};

const sameGenre = async (genre) => {
    const bookArray = await getBooks();
    if(!genre){
        throw new Error ('genre parameter is missing')
    }
    if(typeof genre !== 'string'){
        throw new Error ('genre is not a string');
    }
    if(genre.trim().length === 0){
        throw new Error ('empty genre passed');
    }
    let result = [];
    genre = genre.trim();
    for (const book of bookArray) {
        let isThere = false;
        let g = book.genres;
        for(let i = 0; i < g.length; i++){
            if(g[i].toLowerCase() == genre.toLowerCase()) {
                isThere = true;
            }
        }
        if(isThere == true){
            result.push(book);
        }
    }
    if(result.length == 0){
        throw new Error('book not found');
    }
    return result;
};

const priceRange = async (min, max) => {
    const bookArray = await getBooks();

    if((!min && min!=0)){
         throw new Error ('min parameter missing')
    }
    if(isNaN(min)){
        throw new Error ('min is not a number type');
    }
    if((!max && max!=0)){
        throw new Error ('max parameter missing')
    }
    if(isNaN(max)){
        throw new Error ('max is not a number type');
    }
    if((min < 0)){
        throw new Error ('min value has to be positive');
    }
    if((max < 0)){
        throw new Error ('max value has to be positive');
    }
    if(min>max){
        throw new Error ('min cannot be greater than max');
    }
    let result = [];
    
    for (const book of bookArray) {
        if((min <= Number(book.price))&& (Number(book.price) <= max)){
            result.push(book);
        }
    }
    if(result.length == 0){
        throw new Error('book not found in price range');
    }
    return result;
};

const getAllBooksWithAuthorName = async () => {
    let result = [];
    const bookArray = await getBooks();
    const authors = await getAuthors();
    for(const book of bookArray){
        for(const author of authors){
            if(book.authorId === author.id){
                delete book.authorId;
                book['author'] = author.first_name + ' ' + author.last_name;
                result.push(book);
            }
        }
    }
    return result;
};

export{
    getAuthors,
    getBooks,
    getBookById,
    getAuthorName,
    sameGenre,
    priceRange,
    getAllBooksWithAuthorName
}