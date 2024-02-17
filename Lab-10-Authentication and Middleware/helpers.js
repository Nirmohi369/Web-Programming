//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
function isValidName(name){
    var pattern = /^[A-Za-z\-']+$/;
    return pattern.test(name);
}
function isValidEmail(email) {
    var pattern = /^([a-zA-Z0-9]|[a-zA-Z0-9][._%+-][a-zA-Z0-9])+@([a-zA-Z0-9][-][a-zA-Z0-9]|[a-zA-Z0-9])+\.[a-zA-Z]{2,}$/;
    return pattern.test(email);
}
function checkFirstName(name){
    if(!name) throw "Firstname should be provided";
    if(typeof name !== 'string') throw "Firsname should be string";
    if(name.trim().length === 0) throw "Firstname cannot be an empty string or just spaces";
    if((name.trim().length < 2) || (name.trim().length >= 25) ) throw "Firstname should atleast be of 2 characters or atmost 25 characters";
    if(!(isValidName(name))) throw "Error: invalid first name";
    name = name.trim();
    return name;
}
function checkLastName(name){
    if(!name) throw "Lastname should be provided";
    if(typeof name !== 'string') throw "Lastname should be string";
    if(name.trim().length === 0) throw "Lastname cannot be an empty string or just spaces";
    if((name.trim().length < 2) || (name.trim().length >= 25) ) throw "Lastname should atleast be of 2 characters or atmost 25 characters";
    if(!(isValidName(name))) throw "invalid last name";
    name = name.trim();
    return name;
}
function checkEmail(email){
    if(!email) throw "email address should be provided";
    if(typeof email !== 'string') throw "email address should be string";
    if(email.trim().length === 0) throw "email address cannot be an empty string or just spaces";
    if(!(isValidEmail(email))) throw "Invalid Email address";
    email = email.trim();
    email = email.toLowerCase();
    return email;
}
function checkPassword(password){
    if(!password) throw "password should be provided";
    if(typeof password !== 'string') throw "password should be string";
    if(password.trim().length === 0) throw "password cannot be an empty string or just spaces";
    if(password.trim().length < 8) throw "password must be of minimum 8 characters";
    var alpha = /[A-Z]/;
    var lower = /[a-z]/;
    var num =  /\d/;
    var special = /[^\w\s]/;

    if (!alpha.test(password)) throw "Error: password must have atleast 1 uppercase character";
    if (!lower.test(password)) throw "Error: password must have atleast 1 lowercase character";
    if (!num.test(password)) throw "Error: password must have atleast 1 number character";
    if (!special.test(password)) throw "Error: password must have atleast 1 special character";
    password = password.trim();
    return password;
}
export{
    checkFirstName,
    checkLastName,
    checkEmail,
    checkPassword
}