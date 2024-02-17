// This data file should export all functions using the ES6 standard as shown in the lecture code
import {events} from '../config/mongoCollections.js';
import {ObjectId} from 'mongodb';
import date from 'date-and-time';
import { checkId,
  checkEventName,
  checkEventDescription,
  checkLocation,
  checkEmail,
  checkCapacity,
  checkPriceOfAdmission,
  checkDate,
  checkPublicEvent,
  validTime
} from '../helpers.js';
function startAndEnd(startTime,endTime){
  var startTimes = startTime.match(/(\d+):(\d+)\s([AP][M])/);
  var endTimes = endTime.match(/(\d+):(\d+)\s([AP][M])/);

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
  var startTimes = startTime.match(/(\d+):(\d+)\s([AP][M])/);
  var endTimes = endTime.match(/(\d+):(\d+)\s([AP][M])/);

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
  description,
  eventLocation,
  contactEmail,
  maxCapacity,
  priceOfAdmission,
  eventDate,
  startTime,
  endTime,
  publicEvent
) => {
  eventName = checkEventName(eventName);
  description = checkEventDescription(description);
  eventLocation = checkLocation(eventLocation);
  contactEmail = checkEmail(contactEmail);
  maxCapacity = checkCapacity(maxCapacity);
  priceOfAdmission = checkPriceOfAdmission(priceOfAdmission);
  eventDate = checkDate(eventDate);
  publicEvent = checkPublicEvent(publicEvent);
  
  if(!startTime) throw "Start time should be provided";
  if(!endTime) throw "End Time should be provided";
  
  if(typeof startTime !== 'string') throw "Start Time should be string";
  if(startTime.trim().length === 0) throw "Start Time cannot be an empty string or just spaces";
  if(!(validTime(startTime.trim()))) throw "Event Time is invalid";

  if(typeof endTime !== 'string') throw "End Time should be string";
  if(endTime.trim().length === 0) throw "End Time cannot be an empty string or just spaces";
  if(!(validTime(endTime.trim()))) throw "End Time is invalid";

  if(!(startAndEnd(startTime.trim(),endTime.trim()))) throw "Start time has to be before Endtime";
  if(!(diff(startTime.trim(),endTime.trim()))) throw "Event must be of atleast 30 mins";

  eventName = eventName.trim();
  description = description.trim();
  eventLocation.streetAddress = eventLocation.streetAddress.trim();
  eventLocation.city = eventLocation.city.trim();
  eventLocation.state = eventLocation.state.trim();
  eventLocation.zip = eventLocation.zip.trim();
  eventDate = eventDate.trim();
  let newEvent = {
    eventName: eventName,
    description: description,
    eventLocation: {streetAddress: eventLocation.streetAddress, city: eventLocation.city, state: eventLocation.state, zip: eventLocation.zip},
    contactEmail: contactEmail,
    maxCapacity: maxCapacity,
    priceOfAdmission: priceOfAdmission,
    eventDate: eventDate,
    startTime: startTime,
    endTime: endTime,
    publicEvent: publicEvent,
    attendees: [],
    totalNumberOfAttendees: 0
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
  let eventList = await eventCollection.find({},{projection: {_id:1, eventName:1 }}).toArray();
  if (!eventList) throw 'Could not get all events';
  return eventList;
};

const get = async (eventId) => {
  eventId = checkId(eventId);
  const eventCollection = await events();
  const event = await eventCollection.findOne({_id: new ObjectId(eventId)});
  if (event===null) throw 'No event found with that id';
  event._id = event._id.toString();
  return event;
};

const remove = async (eventId) => {
  eventId = checkId(eventId);
  const eventCollection = await events();
  const event1 = await eventCollection.findOne({_id: new ObjectId(eventId)});
  if (event1===null) throw 'No event found with that id';
  
  const event = await eventCollection.findOneAndDelete({_id: new ObjectId(eventId)});
  
  if (!event) throw 'Could not delete event with id of ${eventId }';
  let eventName = event1.eventName;
  let deleted = {
    eventName : eventName,
    deleted : true
  }
  return deleted;
};

const update = async (
  eventId,
  eventName,
  description,
  eventLocation,
  contactEmail,
  maxCapacity,
  priceOfAdmission,
  eventDate,
  startTime,
  endTime,
  publicEvent
) => {
  eventId = checkId(eventId);
  const eventCollection = await events();
  const event = await eventCollection.findOne({_id: new ObjectId(eventId)});
  if (event===null) throw 'No event found with that id';
 
  let attendees = event.attendees;
  let totalNumberOfAttendees = event.totalNumberOfAttendees;
  eventName = checkEventName(eventName);
  description = checkEventDescription(description);
  eventLocation = checkLocation(eventLocation);
  contactEmail = checkEmail(contactEmail);
  maxCapacity = checkCapacity(maxCapacity);
  priceOfAdmission = checkPriceOfAdmission(priceOfAdmission);
  eventDate = checkDate(eventDate);
  publicEvent = checkPublicEvent(publicEvent);
  
  if(!startTime) throw "Start time should be provided";
  if(!endTime) throw "End Time should be provided";
  
  if(typeof startTime !== 'string') throw "Start Time should be string";
  if(startTime.trim().length === 0) throw "Start Time cannot be an empty string or just spaces";
  if(!(validTime(startTime.trim()))) throw "Event Time is invalid";

  if(typeof endTime !== 'string') throw "End Time should be string";
  if(endTime.trim().length === 0) throw "End Time cannot be an empty string or just spaces";
  if(!(validTime(endTime.trim()))) throw "End Time is invalid";

  if(!(startAndEnd(startTime.trim(),endTime.trim()))) throw "Start time has to be before Endtime";
  if(!(diff(startTime.trim(),endTime.trim()))) throw "Event must be of atleast 30 mins";
  
  if((event.eventName === eventName) 
  && (event.description === description) 
  && (event.eventLocation === eventLocation)
  && (event.contactEmail === contactEmail)
  && (event.maxCapacity === maxCapacity)
  && (event.priceOfAdmission === priceOfAdmission)
  && (event.eventDate === eventDate)
  && (event.startTime == startTime)
  && (event.endTime === endTime)
  && (event.publicEvent === publicEvent)) throw 'Event data is same as previous';
  eventName = eventName.trim();
  description = description.trim();
  eventLocation.streetAddress = eventLocation.streetAddress.trim();
  eventLocation.city = eventLocation.city.trim();
  eventLocation.state = eventLocation.state.trim();
  eventLocation.zip = eventLocation.zip.trim();
  eventDate = eventDate.trim();

  let event1 = await eventCollection.findOneAndUpdate(
    {_id: new ObjectId(eventId)},
    {$set: {eventName : eventName, 
      description : description, 
      eventLocation: {streetAddress: eventLocation.streetAddress, city: eventLocation.city, state: eventLocation.state, zip: eventLocation.zip},
      contactEmail: contactEmail,
      maxCapacity: maxCapacity,
      priceOfAdmission: priceOfAdmission,
      eventDate: eventDate,
      startTime: startTime,
      endTime: endTime,
      publicEvent: publicEvent,
      attendees: attendees,
      totalNumberOfAttendees: totalNumberOfAttendees
    }},
    {returnDocument: 'after'}
  );
  if (!event1) {
    throw 'could not update event successfully';
  }
  const new_event = await get(eventId);
  return new_event;
};

export{
  create,
  getAll,
  get,
  remove,
  update,
  diff,
  startAndEnd
}