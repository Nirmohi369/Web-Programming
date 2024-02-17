// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!
import express from 'express';
const router = express.Router();

import * as validation from '../helpers.js';
import * as eventData from '../data/events.js';

router
  .route('/')
  .get(async (req, res) => {
    try {
      const eventList = await eventData.getAll();
      return res.json(eventList);
    } catch (e) {
      return res.status(500).send(e);
    }
  })
  .post(async (req, res) => {
    let newEvent = req.body;
    if (!newEvent || Object.keys(newEvent).length === 0) {
      res
        .status(400)
        .json({error: 'There are no fields in the request body'});
    }
    
    try{
      if (!newEvent.eventName) throw 'all paramerers are not passed';
      if (!newEvent.description) throw 'all paramerers are not passed';
      if (!newEvent.eventLocation) throw 'all paramerers are not passed';
      if (!newEvent.contactEmail) throw 'all paramerers are not passed';
      if (!newEvent.maxCapacity) throw 'all paramerers are not passed';
      if (!newEvent.priceOfAdmission && newEvent.priceOfAdmission !== 0 ) throw 'all paramerers are not passed';
      if (!newEvent.eventDate) throw 'all paramerers are not passed';
      if (!newEvent.startTime) throw 'all paramerers are not passed';
      if (!newEvent.endTime) throw 'all paramerers are not passed';
      if (!newEvent.publicEvent && newEvent.publicEvent !==false) throw 'all paramerers are not passed';
      
      if (typeof newEvent.eventName !== 'string') throw 'eventName must be a string';
      if (typeof newEvent.description !== 'string') throw 'description must be a string';
      if (typeof newEvent.contactEmail !== 'string') throw 'contactEmail must be a string';
      if (typeof newEvent.eventDate !== 'string') throw 'eventDate must be a string';
      if (typeof newEvent.startTime !== 'string') throw 'startTime must be a string';
      if (typeof newEvent.endTime !== 'string') throw 'endTime must be a string';
      if (typeof newEvent.maxCapacity !== 'number') throw 'maxCapacity must be a number';
      if (typeof newEvent.priceOfAdmission !== 'number') throw 'priceOfAdmission must be a number';
      
      if (newEvent.eventName.trim().length === 0) throw 'eventName cannot be an empty string or string with just spaces';
      if (newEvent.description.trim().length === 0) throw 'description cannot be an empty string or string with just spaces';
      if (newEvent.contactEmail.trim().length === 0) throw 'contactEmail cannot be an empty string or string with just spaces';
      if (newEvent.eventDate.trim().length === 0) throw 'eventDate cannot be an empty string or string with just spaces';
      if (newEvent.startTime.trim().length === 0) throw 'startTime cannot be an empty string or string with just spaces';
      if (newEvent.endTime.trim().length === 0) throw 'endTime cannot be an empty string or string with just spaces';
      
      newEvent.eventName = validation.checkEventName(newEvent.eventName);

      newEvent.description = validation.checkEventDescription(newEvent.description);
      
      newEvent.eventLocation = validation.checkLocation(newEvent.eventLocation);
      
      newEvent.contactEmail = validation.checkEmail(newEvent.contactEmail);
      
      newEvent.maxCapacity = validation.checkCapacity(newEvent.maxCapacity);
      
      newEvent.priceOfAdmission = validation.checkPriceOfAdmission(newEvent.priceOfAdmission);
      
      newEvent.eventDate = validation.checkDate(newEvent.eventDate);
      
      newEvent.publicEvent = validation.checkPublicEvent(newEvent.publicEvent);
      
      
      
      if(typeof newEvent.startTime !== 'string') throw 'Start Time should be string';
      
      if(newEvent.startTime.trim().length === 0) throw 'Start Time cannot be an empty string or just spaces';
      
      if(!(validation.validTime(newEvent.startTime.trim()))) throw 'Start time is invalid';
      

      if(typeof newEvent.endTime !== 'string') throw 'End Time should be string';
      
      if(newEvent.endTime.trim().length === 0) throw 'End Time cannot be an empty string or just spaces';
      if(!(validation.validTime(newEvent.endTime.trim()))) throw 'End Time is invalid';
      
    }catch(e){
      return res.status(400).json({error: e});
    }
    
    try {
      newEvent.eventName = newEvent.eventName.trim();
      newEvent.description = newEvent.description.trim();
      newEvent.eventLocation.streetAddress = newEvent.eventLocation.streetAddress.trim();
      newEvent.eventLocation.city = newEvent.eventLocation.city.trim();
      newEvent.eventLocation.state = newEvent.eventLocation.state.trim();
      newEvent.eventLocation.zip = newEvent.eventLocation.zip.trim();
      newEvent.eventDate = newEvent.eventDate.trim();
      newEvent.startTime = newEvent.startTime.trim();
      newEvent.endTime = newEvent.endTime.trim();
      const postEvent = await eventData.create(
        newEvent.eventName,
        newEvent.description,
        newEvent.eventLocation,
        newEvent.contactEmail,
        newEvent.maxCapacity,
        newEvent.priceOfAdmission,
        newEvent.eventDate,
        newEvent.startTime,
        newEvent.endTime,
        newEvent.publicEvent
      );
      return res.json(postEvent);
    } catch (e) {
      return res.status(400).json({error: e});
    }
  });

router
  .route('/:eventId')
  .get(async (req, res) => {
    try {
      req.params.eventId = validation.checkId(req.params.eventId);
    } catch (e) {
      return res.status(400).json({error: e});
    }
    try {
      const newEvent = await eventData.get(req.params.eventId);
      return res.json(newEvent);
    } catch (e) {
      return res.status(404).json(e);
    }
  })
  .delete(async (req, res) => {
    try {
      req.params.eventId = validation.checkId(req.params.eventId);
    } catch (e) {
      return res.status(400).json({error: e});
    }
    try {
      const deletedevent = await eventData.remove(req.params.eventId);
      res.json(deletedevent);
    } catch (e) {
      return res.status(404).json(e);
    }
  })
  .put(async (req, res) => {
    try {
      req.params.eventId = validation.checkId(req.params.eventId);
    } catch (e) {
      return res.status(400).json({error: e});
    }

    try {
      let newEvent =await eventData.get(req.params.eventId);
    } catch (e) {
      return res.status(404).json({error: 'Event not found'});
    }
    let newEvent = req.body;
    try{
      if (!newEvent.eventName) throw '1all paramerers are not passed';
      if (!newEvent.description) throw '2all paramerers are not passed';
      if (!newEvent.eventLocation) throw '3all paramerers are not passed';
      if (!newEvent.contactEmail) throw '4all paramerers are not passed';
      if (!newEvent.maxCapacity) throw '5all paramerers are not passed';
      if (!newEvent.priceOfAdmission && newEvent.priceOfAdmission !== 0 ) throw 'all paramerers are not passed';
      if (!newEvent.eventDate) throw '6all paramerers are not passed';
      if (!newEvent.startTime) throw '7all paramerers are not passed';
      if (!newEvent.endTime) throw '8all paramerers are not passed';
      if (!newEvent.publicEvent && newEvent.publicEvent !==false) throw '9all paramerers are not passed';
    
      if (typeof newEvent.eventName !== 'string') throw 'eventName must be a string';
      if (typeof newEvent.description !== 'string') throw 'description must be a string';
      if (typeof newEvent.contactEmail !== 'string') throw 'contactEmail must be a string';
      if (typeof newEvent.eventDate !== 'string') throw 'eventDate must be a string';
      if (typeof newEvent.startTime !== 'string') throw 'startTime must be a string';
      if (typeof newEvent.endTime !== 'string') throw 'endTime must be a string';
      if (typeof newEvent.maxCapacity !== 'number') throw 'maxCapacity must be a number';
      if (typeof newEvent.priceOfAdmission !== 'number') throw 'priceOfAdmission must be a number';
    
      if (newEvent.eventName.trim().length === 0) throw 'eventName cannot be an empty string or string with just spaces';
      if (newEvent.description.trim().length === 0) throw 'description cannot be an empty string or string with just spaces';
      if (newEvent.contactEmail.trim().length === 0) throw 'contactEmail cannot be an empty string or string with just spaces';
      if (newEvent.eventDate.trim().length === 0) throw 'eventDate cannot be an empty string or string with just spaces';
      if (newEvent.startTime.trim().length === 0) throw 'startTime cannot be an empty string or string with just spaces';
      if (newEvent.endTime.trim().length === 0) throw 'endTime cannot be an empty string or string with just spaces';

      newEvent.eventName = validation.checkEventName(newEvent.eventName);
      newEvent.description = validation.checkEventDescription(newEvent.description);
      newEvent.eventLocation = validation.checkLocation(newEvent.eventLocation);
      newEvent.contactEmail = validation.checkEmail(newEvent.contactEmail);
      newEvent.maxCapacity = validation.checkCapacity(newEvent.maxCapacity);
      newEvent.priceOfAdmission = validation.checkPriceOfAdmission(newEvent.priceOfAdmission);
      newEvent.eventDate = validation.checkDate(newEvent.eventDate);
      newEvent.publicEvent = validation.checkPublicEvent(newEvent.publicEvent);
      
      
      if(typeof newEvent.startTime !== 'string') throw "Start Time should be string";
      if(newEvent.startTime.trim().length === 0) throw "Start Time cannot be an empty string or just spaces";
      if(!(validation.validTime(newEvent.startTime.trim()))) throw "Event Time is invalid";

      if(typeof newEvent.endTime !== 'string') throw "End Time should be string";
      if(newEvent.endTime.trim().length === 0) throw "End Time cannot be an empty string or just spaces";
      if(!(validation.validTime(newEvent.endTime.trim()))) throw "End Time is invalid";

     
    }catch(e){
      return res.status(400).json({error: e});
    }
    
    try {
      newEvent.eventName = newEvent.eventName.trim();
      newEvent.description = newEvent.description.trim();
      newEvent.eventLocation.streetAddress = newEvent.eventLocation.streetAddress.trim();
      newEvent.eventLocation.city = newEvent.eventLocation.city.trim();
      newEvent.eventLocation.state = newEvent.eventLocation.state.trim();
      newEvent.eventLocation.zip = newEvent.eventLocation.zip.trim();
      newEvent.eventDate = newEvent.eventDate.trim();
      const updatedEvent = await eventData.update(
        req.params.eventId,
        newEvent.eventName,
        newEvent.description,
        newEvent.eventLocation,
        newEvent.contactEmail,
        newEvent.maxCapacity,
        newEvent.priceOfAdmission,
        newEvent.eventDate,
        newEvent.startTime,
        newEvent.endTime,
        newEvent.publicEvent
      );
      return res.json(updatedEvent);
    } catch (e) {
      return res.status(400).json({error: e});
    }
  });
export default router;