// You can add and export any helper functions you want here - if you aren't using any, then you can just leave this file as is
import date from 'date-and-time';
import {ObjectId} from 'mongodb';
function checkEventName(eventName){
    if(!eventName) throw "Event Name should be provided";
    if(typeof eventName !== 'string') throw "Event Name should be string";
    if(eventName.trim().length === 0) throw "Event Name cannot be an empty string or just spaces";
    if(eventName.trim().length < 5) throw "Event Name should atleast be of 5 characters";
    return eventName;
}
function checkEventDescription(description){
    if(!description) throw "Event Description should be provided";
    if(typeof description !== 'string') throw "Event Description should be string";
    if(description.trim().length === 0) throw "Event Description cannot be an empty string or just spaces";
    if(description.trim().length < 25) throw "Event Description should atleast be of 25 characters";
    return description;
}
function checkLocation(eventLocation){
    if(!eventLocation) throw "Event location should be provided";
    if(typeof eventLocation !== 'object') throw 'Eventlocation is not an object';
    if(Array.isArray(eventLocation)) throw 'Eventlocation must be an object';
    if(!eventLocation.streetAddress) throw "Street Address not provided";
    if(!eventLocation.city) throw "City is not provided";
    if(!eventLocation.state) throw "State is not provided";
    if(!eventLocation.zip) throw "Zip code is not provided";

    if(typeof eventLocation.streetAddress !== 'string') throw 'Street Address must be string';
    if(eventLocation.streetAddress.trim().length < 3) throw 'Street Address must be atleast of 3 characters';

    if(typeof eventLocation.city !== 'string') throw 'City must be string';
    if(eventLocation.city.trim().length < 3) throw 'City must be atleast of 3 characters';

    if(typeof eventLocation.state !== 'string') throw 'State must be string';
    if(eventLocation.state.trim().length !== 2) throw 'State must be of 2 characters';
    eventLocation.state = eventLocation.state.toUpperCase();
    let states = ['AK', 'AL', 'AR', 'AS', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'GU', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MP', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UM', 'UT', 'VA', 'VI', 'VT', 'WA', 'WI', 'WV', 'WY' ];
    if(!(states.includes(eventLocation.state))) throw "state is invalid";

    if(typeof eventLocation.zip !== 'string') throw 'Zip Code must be a string';
    if(eventLocation.zip.trim().length !== 5) throw 'Zip code must be 5 characters long';
    if(!(validZipCode(eventLocation.zip.trim()))) throw 'Zip Code is invalid';

    return eventLocation;
}
function validTime(time){
    var pattern = /^(1[0-2]|[1-9]):[0-5][0-9]\s[AP][M]$/;
    return pattern.test(time);
  }
function isValidEmail(email) {
    var pattern = /^([a-zA-Z0-9]|[a-zA-Z0-9][._%+-][a-zA-Z0-9])+@([a-zA-Z0-9][-][a-zA-Z0-9]|[a-zA-Z0-9])+\.[a-zA-Z]{2,}$/;
    return pattern.test(email);
}
function isValidFirstName(firstName){
    var pattern = /^[A-Za-z\-']+$/;
    return pattern.test(firstName);
}
function isValidLastName(lastName){
    var pattern = /^[A-Za-z\-']+$/;
    return pattern.test(lastName);
}
function validZipCode(zip) {
    var pattern = /^\d{5}$/;
    return pattern.test(zip);
}
//isPrecise function is taken from StackOverflow https://stackoverflow.com/questions/69782313/how-to-validate-a-number-has-a-2-decimal-place-precision-with-javascript
function isPrecise(num){
    return (String(num).split(".")[1]?.length <= 2);
}
function checkFirstName(firstName){
    if(!firstName) throw "contact email should be provided";
    if(typeof firstName !== 'string') throw "Contact Email should be string";
    if(firstName.trim().length === 0) throw "Contact Email cannot be an empty string or just spaces";
    if(!(isValidFirstName(firstName))) throw "invalid first name";
    return firstName;
}
function checkLastName(lastName){
    if(!lastName) throw "contact email should be provided";
    if(typeof lastName !== 'string') throw "Contact Email should be string";
    if(lastName.trim().length === 0) throw "Contact Email cannot be an empty string or just spaces";
    if(!(isValidLastName(lastName))) throw "invalid first name";
    return lastName;
}
function checkEmail(contactEmail){
    if(!contactEmail) throw "contact email should be provided";
    if(typeof contactEmail !== 'string') throw "Contact Email should be string";
    if(contactEmail.trim().length === 0) throw "Contact Email cannot be an empty string or just spaces";
    if(!(isValidEmail(contactEmail))) throw "Invalid Email address";
    return contactEmail;
}
function checkCapacity(maxCapacity){
    if(!maxCapacity) throw "Maximum capacity should be provided";
    if(typeof maxCapacity !== 'number') throw "Maximum Capacity has to be a numberic value";
    if(Number.isNaN(maxCapacity)) throw "Maximum capacity has to be a number";
    if(!Number.isInteger(maxCapacity)) throw "Maximum Capacity has to be an interger";
    if(maxCapacity <= 0) throw "maximum capacity has to be greater than zero";
    return maxCapacity;
}
function checkPriceOfAdmission(priceOfAdmission){
    if(!priceOfAdmission && priceOfAdmission!==0) throw "Price of Admission should be provided";
    if(typeof priceOfAdmission !== 'number') throw "Price of Admission has to be a numberic value";
    if(priceOfAdmission < 0) throw "price of admission has to be greater than equal to zero";
    if(Number.isNaN(priceOfAdmission)) throw "Price of Admission has to be a number";
    
    if(!((Number.isInteger(priceOfAdmission)) || isPrecise(priceOfAdmission))) throw "price of admission has to be of 2 decimal float value or a whole number";
    return priceOfAdmission;
}
function checkDate(eventDate){
    if(!eventDate) throw "Event Date must be provided";
    
    if(typeof eventDate !== 'string') throw "Event Date should be string";
    if(eventDate.trim().length === 0) throw "Event Date cannot be an empty string or just spaces";
    if(!(date.isValid( eventDate , 'MM/DD/YYYY'))) throw "Event Date is invalid";
    const currentDate = new Date();
    const parsedDate = date.parse(eventDate, 'MM/DD/YYYY');
    if(currentDate > parsedDate) throw "Event Date has to be in future";
    return eventDate;
}
function checkPublicEvent(publicEvent){
    if(!publicEvent && publicEvent!==false) throw "Public Event should be specified";
    if(typeof publicEvent !== 'boolean') throw "Public event value has to be boolean";
    return publicEvent;
}
function checkId(id){
    if (!id) throw 'You must provide an id to search for';
    if (typeof id !== 'string') throw 'Id must be a string';
    if (id.trim().length === 0)
        throw 'id cannot be an empty string or just spaces';
    id = id.trim();
    if (!ObjectId.isValid(id)) throw 'invalid object ID';
    return id;
}
export {
    checkId,
    checkEventName,
    checkEventDescription,
    checkLocation,
    checkEmail,
    checkCapacity,
    checkPriceOfAdmission,
    checkDate,
    checkPublicEvent,
    validTime,
    checkFirstName,
    checkLastName
}