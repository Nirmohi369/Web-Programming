//import axios, md5
import axios from 'axios';
import md5 from 'blueimp-md5' //you will need to install this module;
const publickey = '18e48f4d9863880aad5983fdadfaa9e4';
const privatekey = 'cab28df9a504013034a9d7902e5f489084016f55';
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);

export const searchCharacterByName = async (name) => {
  if(!name) throw 'Name should be provided';
  if(typeof name !== 'string') throw 'Name should be a string';
  if(name.trim().length === 0) throw 'Name should not be empty';
  name = name.trim();
  const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters?nameStartsWith='+name;
  const url = baseUrl + '&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
  let result = [];
  const characters = await axios.get(url);
  result = characters.data.data.results;
  result = result.slice(0,15);
  return result;
};

export const searchCharacterById = async (id) => {
  if(!id) throw 'id should be provided';
  if(typeof id !== 'number') throw 'id should be a number';
  const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters/'+id;
  const url = baseUrl + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
  let result;
  const characters = await axios.get(url);
  result = characters.data.data.results[0];
  return result;
};

