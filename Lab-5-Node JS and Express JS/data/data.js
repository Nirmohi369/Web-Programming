/*Here, you can export the functions you did for lab 3
to get the authors, books, getBookByID, getAuthorById.  You will import these functions into your routing files and call the relevant function depending on the route. 

*/
import axios from 'axios';
import * as validation from '../helpers.js';

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
const getAuthorById = async (id) => {
    const authors = await getAuthors();
    id = validation.checkId(id);
    let result = undefined;
    for (const author of authors) {
        if (author.id === id) {
            result = author;
            break; 
        }
    }
    if(!result){
        throw  'Author Not Found!';
    }
    return result;
};
const getBookById = async (id) => {
    const bookArray = await getBooks();
    id = validation.checkId(id);
    let result = undefined;
    for (const book of bookArray) {
        if (book.id === id) {
            result = book;
            break; 
        }
    }
    if(!result) throw 'Book Not Found!';
    return result;
};
export{
    getAuthors,
    getBooks,
    getBookById,
    getAuthorById
}