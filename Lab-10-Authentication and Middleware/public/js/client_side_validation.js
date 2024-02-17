// In this file, you must perform all client-side validation for every single form input (and the role dropdown) on your pages. The constraints for those fields are the same as they are for the data functions and routes. Using client-side JS, you will intercept the form's submit event when the form is submitted and If there is an error in the user's input or they are missing fields, you will not allow the form to submit to the server and will display an error on the page to the user informing them of what was incorrect or missing.  You must do this for ALL fields for the register form as well as the login form. If the form being submitted has all valid data, then you will allow it to submit to the server for processing. Don't forget to check that password and confirm password match on the registration form!


    function isValidName(name){
        var pattern = /^[A-Za-z\-']+$/;
        return pattern.test(name);
    }
    function isValidEmail(email) {
        var pattern = /^([a-zA-Z0-9]|[a-zA-Z0-9][._%+-][a-zA-Z0-9])+@([a-zA-Z0-9][-][a-zA-Z0-9]|[a-zA-Z0-9])+\.[a-zA-Z]{2,}$/;
        return pattern.test(email);
    }

    function checkPassword(password){
        
        password = password.trim();
        return password;
    }
    const staticForm = document.getElementById('login-form');
    const registrationError = document.getElementById('error');
    if(staticForm){
        const emailAddress = document.getElementById('emailAddressInput');
        const pass = document.getElementById('passwordInput');
        staticForm.addEventListener('submit',(event) => {
            event.preventDefault();
                let email = emailAddress.value;
                let password = pass.value;
                if(!email || !password) {
                    registrationError.innerHTML = "all fields must be provided";
                    return;
                }
                if(!email) {
                    registrationError.innerHTML = "email address should be provided";
                    isValid = false
                }
                if(typeof email !== 'string'){
                    registrationError.innerHTML = "email address should be string";
                    isValid = false
                } 
                if(email.trim().length === 0) {
                    registrationError.innerHTML =  "email address cannot be an empty string or just spaces";
                    isValid = false;
                }    
                if(!(isValidEmail(email))) {
                    registrationError.innerHTML = "Invalid Email address";
                    isValid = false;
                }
                if(!password){
                    registrationError.innerHTML ="password should be provided";
                    isValid = false
                } 
                if(typeof password !== 'string'){
                    registrationError.innerHTML ="password should be string";
                    isValid = false
                } 
                if(password.trim().length === 0) {
                    registrationError.innerHTML = "password cannot be an empty string or just spaces";
                    isValid = false
                } 
                if(password.trim().length < 8){
                    registrationError.innerHTML ="password must be of minimum 8 characters";
                     isValid = false
                } 
                if(password !== confirmPassword) {
                    registrationError.innerHTML = 'both passwords do not match';
                    isValid = false;
                };
            if(!isValid) {
                event.preventDefault(); 
            }
            $("#login-form").submit();
        });
    }
    function checkFirstName(name){
        
        name = name.trim();
        return name;
    }
    function checkLastName(name){
        if(!name) {
            throw 'last name is not given';
            return;
        };
        if(typeof name !== 'string'){
            throw 'last name should be string';
            return;
        };

        if(name.trim().length === 0){
            throw 'lastname cannot be an empty string or just spaces';
            return;
        };
        if((name.trim().length < 2) || (name.trim().length >= 25) ){
            throw "lastname should atleast be of 2 characters or atmost 25 characters";
            return;
        }; 
        if(!(isValidName(name))){
            throw "invalid last name";
            return;
        };
        name = name.trim();
        return name;
    }
    const registerForm = document.getElementById('registration-form');
    if(registerForm){
        const first = document.getElementById('firstNameInput');
        const last = document.getElementById('lastNameInput');
        const emailAddress = document.getElementById('emailAddressInput');
        const pass = document.getElementById('passwordInput');
        const cpass = document.getElementById('confirmPasswordInput');
        const roles = document.getElementById('roleInput');
        staticForm.addEventListener('submit',(event) => {
                var isValid = true;
                let firstName = first.value;
                let lastName = last.value;
                let email = emailAddress.value;
                let password = pass.value;
                let confirmPassword = cpass.value;
                let role = roles.value;
                if(!firstName || !lastName || !email|| !password || !confirmPassword || !role) {
                    registrationError.innerHTML = "all fields must be provided";
                    isValid = false;
                }
                if(!firstName) {
                    registrationError.innerHTML ='first name is not given';
                    isValid = false
             };
             if(typeof firstName !== 'string'){
                registrationError.innerHTML ='First name should be string';
                isValid = false
             };
     
             if(firstName.trim().length === 0){
                registrationError.innerHTML ='Firstname cannot be an empty string or just spaces';
                isValid = false
             };
             if((firstName.trim().length < 2) || (lastName.trim().length >= 25) ){
                registrationError.innerHTML = "Firstname should atleast be of 2 characters or atmost 25 characters";
                isValid = false
             }; 
             if(!(isValidName(firstName))){
                registrationError.innerHTML = "invalid first name";
                isValid = false
             };
                if(!lastName) {
                    registrationError.innerHTML ='last name is not given';
                    isValid = false
             };
             if(typeof lastName !== 'string'){
                registrationError.innerHTML ='last name should be string';
                isValid = false
             };
     
             if(lastName.trim().length === 0){
                registrationError.innerHTML ='last name cannot be an empty string or just spaces';
                isValid = false
             };
             if((lastName.trim().length < 2) || (lastName.trim().length >= 25) ){
                registrationError.innerHTML = "lastname should atleast be of 2 characters or atmost 25 characters";
                isValid = false
             }; 
             if(!(isValidName(lastName))){
                registrationError.innerHTML = "invalid last name";
                isValid = false
             };
                if(!email) {
                    registrationError.innerHTML = "email address should be provided";
                    isValid = false
                }
                if(typeof email !== 'string'){
                    registrationError.innerHTML = "email address should be string";
                    isValid = false
                } 
                if(email.trim().length === 0) {
                    registrationError.innerHTML =  "email address cannot be an empty string or just spaces";
                    isValid = false;
                }    
                if(!(isValidEmail(email))) {
                    registrationError.innerHTML = "Invalid Email address";
                    isValid = false;
                }
                if(!password){
                    registrationError.innerHTML ="password should be provided";
                    isValid = false
                } 
                if(typeof password !== 'string'){
                    registrationError.innerHTML ="password should be string";
                    isValid = false
                } 
                if(password.trim().length === 0) {
                    registrationError.innerHTML = "password cannot be an empty string or just spaces";
                    isValid = false
                } 
                if(password.trim().length < 8){
                    registrationError.innerHTML ="password must be of minimum 8 characters";
                     isValid = false
                } 
                if(password !== confirmPassword) {
                    registrationError.innerHTML = 'both passwords do not match';
                    isValid = false;
                };
            if(!isValid) {
                event.preventDefault(); 
            }
        });
        $("#registration-form").submit();
        
    }