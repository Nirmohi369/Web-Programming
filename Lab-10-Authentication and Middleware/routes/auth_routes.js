//import express, express router as shown in lecture code
import {Router} from 'express';
const router = Router();
import * as validate from '../helpers.js';
import {registerUser, loginUser} from '../data/users.js'
import bcrypt from 'bcryptjs';
import moment from 'moment/moment.js';
router.route('/').get(async (req, res) => {
  // code here for GET THIS ROUTE SHOULD NEVER FIRE BECAUSE OF MIDDLEWARE #1 IN SPECS.
  return res.json({error: 'YOU SHOULD NOT BE HERE!'});
});

router
  .route('/register')
  .get(async (req, res) => {
     res.render('register',{title:'register',error:' '});
  })
  .post(async (req, res) => {
    //code here for POST
    let userInfo=req.body;
    try{
      let firstName = userInfo.firstNameInput;
      let lastName = userInfo.lastNameInput;
      let emailAddress =userInfo.emailAddressInput;
      let password=userInfo.passwordInput;
      let role = userInfo.role;
      let confirmPassword = userInfo.confirmPasswordInput;
      if(!firstName || !lastName || !emailAddress || !password || !confirmPassword || !role) throw "all fields must be provided";
      
      firstName = validate.checkFirstName(firstName);
      
      lastName = validate.checkLastName(lastName);
      
      emailAddress = validate.checkEmail(emailAddress);
      
      password = validate.checkPassword(password);
      
      if((role !== 'admin') || (role !== 'user')) throw 'role is not admin or user';
      if(password !== confirmPassword) throw 'both passwords do not match';

      const result=await registerUser(firstName, lastName, emailAddress,password, role);
      if(result.insertedUser == true){
        return res.redirect('/');
      }
       
    }catch(e){
      return res.status(400).render('register',{title:'Error',error:e});
    }
    return res.status(500).send('Internal Server Error');
  });

router
  .route('/login')
  .get(async (req, res) => {
    return res.render('login',{title:'login',error:' '})
  })
  .post(async (req, res) => {
    
    let userInfo=req.body;
    try{
      let emailAddress =userInfo.emailAddressInput;
      let password=userInfo.passwordInput;
      if(!emailAddress || !password) throw 'emailAddress or password is not provided';
      emailAddress=validate.checkEmail(emailAddress);
      password=validate.checkPassword(password);
      const result = await loginUser(emailAddress,password);
      if(result){
  
        req.session.user = result;
        if(result.role === 'admin'){
            return res.redirect('/admin');
        }
        else{
          return res.redirect('/protected');
        }
      }
    }catch(e){
      return res.status(400).render('login',{title:'Error',error:e});
    }
    return res.status(500).send('Internal Server Error');
  });

router.route('/protected').get(async (req, res) => {
  //code here for GET
  const currentTime = moment().format( 'h:mm:ss' );
  const role = req.session.user.role;
  let admin = false;
  if(role === 'admin'){
    admin = true;
  }
  return res.render('protected',{title:'protected',firstName:req.session.user.firstName,lastName:req.session.user.lastName,currentTime:currentTime, role:req.session.user.role, admin:admin});
});

router.route('/admin').get(async (req, res) => {
  //code here for GET
  const currentTime = moment().format( 'h:mm:ss' );
  return res.render('admin',{title:'admin',firstName:req.session.user.firstName,lastName:req.session.user.lastName, role:req.session.user.role,currentTime:currentTime});
});

router.route('/error').get(async (req, res) => {
  //code here for GET
  return res.render('error',{title:'error'});
});

router.route('/logout').get(async (req, res) => {
  //code here for GET
  req.session.destroy();
    return res.render('logout',{title:'logout'});
});

export default router;