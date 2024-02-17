// TODO: Export and implement the following functions in ES6 format
import {events} from 'file:///D:/javascript/lab4/config/mongoCollections.js';
import {ObjectId} from 'mongodb'
import date from 'date-and-time';

function isValidEmail(email) {
  var pattern = /^([a-zA-Z0-9]|[a-zA-Z0-9][._%+-][a-zA-Z0-9])+@([a-zA-Z0-9][-][a-zA-Z0-9]|[a-zA-Z0-9])+\.[a-zA-Z]{2,}$/;
  return pattern.test(email);
}
function validTime(time){
  var pattern = /^(0[1-9]|1[0-2]|[1-9]):[0-5][0-9][APap][mM]$/;
  return pattern.test(time);
}
function validZipCode(zip) {
  var pattern = /^\d{5}$/;
  return pattern.test(zip);
}
//isPrecise function is taken from StackOverflow https://stackoverflow.com/questions/69782313/how-to-validate-a-number-has-a-2-decimal-place-precision-with-javascript
function isPrecise(num){
  return String(num).split(".")[1]?.length <= 2;
}
function startAndEnd(startTime,endTime){
  var startTimes = startTime.match(/(\d+):(\d+)([APap][Mm])/);
  var endTimes = endTime.match(/(\d+):(\d+)([APap][Mm])/);

  var shour = parseInt(startTimes[1]);
  var smin = parseInt(startTimes[2]);
  var sampm = startTimes[3].toUpperCase();

  var ehour = parseInt(endTimes[1]);
  var emin = parseInt(endTimes[2]);
  var eampm = endTimes[3].toUpperCase();

  if(sampm === 'AM' && eampm === 'PM'){
    return true;
  }
  
  else if(((sampm == 'AM') && (eampm == 'AM')) || ((sampm == 'PM') && (eampm == 'PM'))){
    if(shour !== 12){
      shour+=12;
    }
    if(ehour !== 12){
      ehour+=12;
    }
    if(shour < ehour){
      return true;
    }
    else if(shour === ehour){
      if((smin < emin)){
        return true;
      }
    }
  }
  else{
    return false;
  }
}
function diff(startTime,endTime){
  var startTimes = startTime.match(/(\d+):(\d+)([APap][Mm])/);
  var endTimes = endTime.match(/(\d+):(\d+)([APap][Mm])/);

  var shour = parseInt(startTimes[1]);
  var smin = parseInt(startTimes[2]);
  var ehour = parseInt(endTimes[1]);
  var emin = parseInt(endTimes[2]);
  if(shour !== 12){
    shour+=12;
  }
  if(ehour !== 12){
    ehour+=12;
  }
  var emins = ehour * 60 + emin;
  var smins = shour * 60 + smin;

  if((emins - smins) >= 30){
    return true;
  }
  else{
    return false;
  }
}
const create = async (
  eventName, 
  eventDescription, 
  eventLocation, 
  contactEmail, 
  maxCapacity, 
  priceOfAdmission, 
  eventDate, 
  startTime, 
  endTime, 
  publicEvent
) => {
  if(!eventName) throw "Event Name should be provided";
  if(!eventDescription) throw "Event Description should be provided";
  if(!eventLocation) throw "Event location should be provided";
  if(!contactEmail) throw "contact email should be provided";
  if(!maxCapacity) throw "Maximum capacity should be provided";
  if(!priceOfAdmission && priceOfAdmission!==0) throw "Price of Admission should be provided";
  if(!eventDate) throw "Event Date must be provided";
  if(!startTime) throw "Start time should be provided";
  if(!endTime) throw "End Time should be provided";
  if(!publicEvent && publicEvent!==false) throw "Public Event should be specified";
  
  if(typeof eventName !== 'string') throw "Event Name should be string";
  if(eventName.trim().length === 0) throw "Event Name cannot be an empty string or just spaces";
  if(eventName.trim().length < 5) throw "Event Name should atleast be of 5 characters";
  
  if(typeof eventDescription !== 'string') throw "Event Description should be string";
  if(eventDescription.trim().length === 0) throw "Event Description cannot be an empty string or just spaces";
  if(eventDescription.trim().length < 25) throw "Event Description should atleast be of 25 characters";

  if(typeof contactEmail !== 'string') throw "Contact Email should be string";
  if(contactEmail.trim().length === 0) throw "Contact Email cannot be an empty string or just spaces";
  if(!(isValidEmail(contactEmail))) throw "Invalid Email address";

  if(typeof eventDate !== 'string') throw "Event Date should be string";
  if(eventDate.trim().length === 0) throw "Event Date cannot be an empty string or just spaces";
  if(!(date.isValid( eventDate , 'MM/DD/YYYY'))) throw "Event Date is invalid";
  const currentDate = new Date();
  const parsedDate = date.parse(eventDate, 'MM/DD/YYYY');
  if(currentDate > parsedDate) throw "Event Date has to be in future";

  if(typeof startTime !== 'string') throw "Start Time should be string";
  if(startTime.trim().length === 0) throw "Start Time cannot be an empty string or just spaces";
  if(!(validTime(startTime.trim()))) throw "Event Time is invalid";

  if(typeof endTime !== 'string') throw "End Time should be string";
  if(endTime.trim().length === 0) throw "End Time cannot be an empty string or just spaces";
  if(!(validTime(endTime.trim()))) throw "End Time is invalid";

  if(!(startAndEnd(startTime.trim(),endTime.trim()))) throw "Start time has to be before Endtime";
  if(!(diff(startTime.trim(),endTime.trim()))) throw "Event must be of atleast 30 mins";

  if(typeof publicEvent !== 'boolean') throw "Public event value has to be boolean";

  if(typeof maxCapacity !== 'number') throw "Maximum Capacity has to be a numberic value";
  if(Number.isNaN(maxCapacity)) throw "Maximum capacity has to be a number";
  if(!Number.isInteger(maxCapacity)) throw "Maximum Capacity has to be an interger";
  if(maxCapacity <= 0) throw "maximum capacity has to be greater than zero";

  if(typeof priceOfAdmission !== 'number') throw "Price of Admission has to be a numberic value";
  if(priceOfAdmission < 0) throw "price of admission has to be greater than equal to zero";
  if(Number.isNaN(priceOfAdmission)) throw "Price of Admission has to be a number";
  
  if(!((Number.isInteger(priceOfAdmission)) || isPrecise(priceOfAdmission))) throw "price of admission has to be of 2 decimal float value";
  
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

  eventName = eventName.trim();
  eventDescription = eventDescription.trim();
  eventLocation.streetAddress = eventLocation.streetAddress.trim();
  eventLocation.city = eventLocation.city.trim();
  eventLocation.state = eventLocation.state.trim();
  eventLocation.zip = eventLocation.zip.trim();
  eventDate = eventDate.trim();
  var startTimes = startTime.match(/(\d+):(\d+)([APap][Mm])/);
  var endTimes = endTime.match(/(\d+):(\d+)([APap][Mm])/);
  let z = startTimes[3].toUpperCase();
  let y = endTimes[3].toUpperCase();
  startTime = startTimes[1]+':'+startTimes[2]+z;
  endTime = endTimes[1]+':'+endTimes[2]+y;
  let newEvent = {
    eventName: eventName,
    description: eventDescription,
    eventLocation: {streetAddress: eventLocation.streetAddress, city: eventLocation.city, state: eventLocation.state, zip: eventLocation.zip},
    contactEmail: contactEmail,
    maxCapacity: maxCapacity,
    priceOfAdmission: priceOfAdmission,
    eventDate: eventDate,
    startTime: startTime,
    endTime: endTime,
    publicEvent: publicEvent
  };
  const eventCollection = await events();
  const insertInfo = await eventCollection.insertOne(newEvent);
  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw 'Could not add event';

  const newId = insertInfo.insertedId.toString();

  const event = await get(newId);
  return event;
};

const getAll = async () => {
  const eventCollection = await events();
 let eventList = await eventCollection.find({}).toArray();
  if (!eventList) throw 'Could not get all events';
  eventList = eventList.map((element) => {
    element._id = element._id.toString();
    return element;
  });
  return eventList;
};

const get = async (id) => {
  if (!id) throw 'You must provide an id to search for';
  if (typeof id !== 'string') throw 'Id must be a string';
  if (id.trim().length === 0)
      throw 'id cannot be an empty string or just spaces';
  id = id.trim();
  if (!ObjectId.isValid(id)) throw 'invalid object ID';
  const eventCollection = await events();
  const event = await eventCollection.findOne({_id: new ObjectId(id)});
  if (event===null) throw 'No event found with that id';
  event._id = event._id.toString();
  return event;
};

const remove = async (id) => {
  if (!id) throw 'You must provide an id to search for';
  if (typeof id !== 'string') throw 'Id must be a string';
  if (id.trim().length === 0)
      throw 'id cannot be an empty string or just spaces';
  id = id.trim();
  if (!ObjectId.isValid(id)) throw 'invalid object ID';
  const eventCollection = await events();
  const event = await eventCollection.findOneAndDelete({_id: new ObjectId(id)});
  
  if (!event) throw `Could not delete event with id of ${id}`;
  let eventName = event.eventName;
  let deleted = {
    eventName : eventName,
    deleted : true
  }
  return deleted;
};

const rename = async (id, newEventName) => {
  if (!id) throw 'You must provide an id to search for';
  if (typeof id !== 'string') throw 'Id must be a string';
  if (id.trim().length === 0) throw 'id cannot be an empty string or just spaces';
  if(!newEventName) throw 'New Event must be provided'
  if(typeof newEventName!== 'string') throw "New Event Name should be string";
  if(newEventName.trim().length === 0) throw "New Event Name cannot be an empty string or just spaces";
  if(newEventName.length < 5) throw "New Event Name should atleast be of 5 characters";

  id = id.trim();
  newEventName = newEventName.trim();
  if (!ObjectId.isValid(id)) throw 'invalid object ID';
  const eventCollection = await events();
  let event = await eventCollection.findOne({_id: new ObjectId(id)});
  if (event===null) throw 'No event found with that id';
  if(event.eventName === newEventName) throw 'New Event name is same as current name';
  event = await eventCollection.findOneAndUpdate(
    {_id: new ObjectId(id)},
    {$set: {eventName : newEventName}},
    {returnDocument: 'after'}
  );
  if (!event) {
    throw 'could not update event successfully';
  }
  event._id = event._id.toString();
  return event;
};

export{
  create,
  getAll,
  get,
  remove,
  rename
}