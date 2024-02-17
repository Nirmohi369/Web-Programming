//import mongo collections, bcrypt and implement the following data functions
import { users } from "../config/mongoCollections.js";
import * as validate from '../helpers.js';
import bcrypt from 'bcryptjs';
const saltRounds = 16;

export const registerUser = async (
  firstName,
  lastName,
  emailAddress,
  password,
  role
) => {
 
  if(!firstName || !lastName || !emailAddress || !password || !role) throw "all fields must be provided";

  firstName = validate.checkFirstName(firstName);
  lastName = validate.checkLastName(lastName);
  emailAddress = validate.checkEmail(emailAddress);
  password = validate.checkPassword(password);
  
  const userCollection = await users();
  const user = await userCollection.findOne({emailAddress: emailAddress});
  if(user) throw 'User exists with same email address';
  const pass =await bcrypt.hash(password,saltRounds);
  //if((role !== 'admin') || (role !== 'user')) throw 'role is not admin or user';
  let newUser={
    firstName:firstName,
    lastName:lastName,
    emailAddress:emailAddress,
    password: pass,
    role: role
  }
  const insertInfo = await userCollection.insertOne(newUser);
  if (!insertInfo.acknowledged || !insertInfo.insertedId){
    throw 'Could not add user';
  }
  return {insertedUser: true};
};

export const loginUser = async (emailAddress, password) => {
  if(!emailAddress || !password) throw "all fields must be provided";
  emailAddress = validate.checkEmail(emailAddress);
  password = validate.checkPassword(password);
  
  const userCollection = await users();
  const user = await userCollection.findOne({emailAddress: emailAddress});
  if(!user) throw 'Either the email address or password is invalid';
  
  let pass = user.password;
  let compare=false;
  compare = await bcrypt.compare(password,pass);
  if(!compare) throw 'Either the email address or password is invalid';

  return {firstName:user.firstName, lastName:user.lastName, emailAddress:user.emailAddress, role:user.role};
};
