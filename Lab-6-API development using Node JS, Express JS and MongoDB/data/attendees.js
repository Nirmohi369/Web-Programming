// This data file should export all functions using the ES6 standard as shown in the lecture code
import {events} from '../config/mongoCollections.js';
import {ObjectId} from 'mongodb';
import { checkId,
  checkFirstName,
  checkLastName,
  checkEmail
} from '../helpers.js';
import * as eventData from './events.js';

const createAttendee = async (eventId, firstName, lastName, emailAddress) => {
  eventId = checkId(eventId);
  firstName = checkFirstName(firstName);
  lastName = checkLastName(lastName);
  emailAddress = checkEmail(emailAddress);
  const eventCollection = await events();
  const event = await eventCollection.findOne({_id: new ObjectId(eventId)});
  if (event===null) throw 'No event found with that id';
  if(event.totalNumberOfAttendees === event.maxCapacity) throw 'Event is already full no more attendees allowed';
  for (const attendee of event.attendees) {
    if(attendee.emailAddress === emailAddress) throw 'same email address';
  }
  
  const newAttendee = {
    _id: new ObjectId(),
    firstName: firstName,
    lastName: lastName,
    emailAddress: emailAddress
  };
  let totalNumberOfAttendees = event.totalNumberOfAttendees;
  const event1 = await eventCollection.findOneAndUpdate(
    {_id: new ObjectId(eventId)},
    {$addToSet : {attendees : newAttendee}},
    {returnDocument: 'after'}
  );
  
  if (!event1) {
    throw 'could not add attendee successfully';
  }
  totalNumberOfAttendees = totalNumberOfAttendees + 1;
  const event2 = await eventCollection.findOneAndUpdate(
    {_id: new ObjectId(eventId)},
    {$set : {totalNumberOfAttendees : totalNumberOfAttendees}},
    {returnDocument: 'after'}
  );
  const new_event = await eventData.get(eventId);
  return new_event;
};

const getAllAttendees = async (eventId) => {
  eventId = checkId(eventId);
  const eventCollection = await events();
  const event = await eventCollection.findOne({_id: new ObjectId(eventId)});
  if (event===null) throw 'No event found with that id';
  const attendeeList = event.attendees;
  return attendeeList;
};

const getAttendee = async (attendeeId) => {
  attendeeId = checkId(attendeeId);
  const eventCollection = await events();
  let attendee =await eventCollection.findOne(
    {'attendees._id':new ObjectId(attendeeId)}
  );
  if (attendee===null) throw 'No attendee found with that id';
  attendee._id = attendee._id.toString();
  let result = null;
  attendee.attendees.forEach(async at => {
    if(at._id.toString() == attendeeId){
      result = at;
    }
  });
  return result;
};

const removeAttendee = async (attendeeId) => {
  attendeeId = checkId(attendeeId);
  const eventCollection = await events();
  
  let event = await eventCollection.findOne({
    'attendees._id': new ObjectId(attendeeId),
  });
  if (!event) {
    throw 'No event found with attendee id ' + attendeeId;
  }
  const eventId = event._id.toString();
  const deleteInfo = await eventCollection.updateOne(
    {_id: new ObjectId(eventId)}, 
    {$pull: {attendees: {_id: new ObjectId(attendeeId)}}});
  if(!deleteInfo.matchedCount || !deleteInfo.modifiedCount){
    throw 'could not delete attendee';
  }
  let totalNumberOfAttendees = event.totalNumberOfAttendees - 1;
  let updatedEvent = await eventCollection.updateOne(
    {_id: new ObjectId(eventId)},
    {$set: {totalNumberOfAttendees : totalNumberOfAttendees}},
    {returnDocument: 'after'}
  );
  if (!updatedEvent) {
    throw 'could not update event successfully';
  }
  const new_event = await eventData.get(eventId);
  return new_event;
};


export{
  createAttendee,
  getAllAttendees,
  getAttendee,
  removeAttendee
}