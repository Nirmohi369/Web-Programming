//import express and express router as shown in lecture code and worked in previous labs.  Import your data functions from /data/characters.js that you will call in your routes below
import {Router} from 'express';
const router = Router();
import * as characterData from '../data/characters.js';


router.route('/').get(async (req, res) => {
  //code here for GET will render the home handlebars file
  res.render('home',{title : 'Marvel Character Finder'});
});

router.route('/searchmarvelcharacters').post(async (req, res) => {
  //code here for POST this is where your form will be submitting searchCharacterByName and then call your data function passing in the searchCharacterByName and then rendering the search results of up to 15 characters.
  try{
    let name=req.body;
    if(!name.searchCharacterByName){throw 'no character name passed here!'}
    if(typeof name.searchCharacterByName!='string'){throw 'the character name must be string'}
    if(name.searchCharacterByName.trim().length == 0){throw 'the string character name is empty'}
    let result = await characterData.searchCharacterByName(name.searchCharacterByName);
    if(result.length === 0){
      let not_found = true ;
      res.render('characterSearchResults',{not_found,search:name.searchCharacterByName});
    } 
    else{
      let not_found = false;
      res.render('characterSearchResults',{not_found, character :result,searched :name.searchCharacterByName, title : 'Marvel Characters Found'});
    }  
  }catch(e){
    res.status(400).render('error',{error:e ,title:'error Found'}, );
  }
});

router.route('/marvelcharacter/:id').get(async (req, res) => {
  //code here for GET a single character
  try{
    let id=req.params.id;
    id=Number(id);
    if(!id){throw 'no id passed here!'};
    if(typeof id!='number'){throw 'id must be a number'};
    let result = await characterData.searchCharacterById(id);
    let path = result.thumbnail.path + '/portrait_uncanny.jpg';
    res.render('characterById',{character :result, path : path, title : result.name});
  }catch(e){
    res.status(400).render('error',{error:e ,title:'error Found'}, );
  }
});

export default router;

