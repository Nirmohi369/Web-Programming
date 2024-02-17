// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!
import express from 'express';
const router = express.Router();
import * as validation from '../helpers.js';
import * as eventData from '../data/events.js'
import * as attendeeData from '../data/attendees.js';

router
  .route('/:eventId')
  .get(async (req, res) => {
    try {
      req.params.eventId = validation.checkId(req.params.eventId);
    } catch (e) {
      return res.status(400).json({error: e});
    }
    try {
      const attendeeList = await attendeeData.getAllAttendees(req.params.eventId);
      return res.json(attendeeList);
    } catch (e) {
      return res.status(404).send(e);
    }
  })
  .post(async (req, res) => {
    try {
      req.params.eventId = validation.checkId(req.params.eventId);
    } catch (e) {
      return res.status(400).json({error: e});
    }
    let attendee = req.body;
    try {
      if (!req.params.eventId) throw 'all paramerers are not passed';
      if (!attendee.firstName) throw 'all paramerers are not passed';
      if (!attendee.lastName) throw 'all paramerers are not passed';
      if (!attendee.emailAddress) throw 'all paramerers are not passed';

      if (typeof attendee.firstName !== 'string') throw 'firstName must be a string';
      if (typeof attendee.lastName !== 'string') throw 'lastName must be a string';
      if (typeof attendee.emailAddress !== 'string') throw 'email address must be a string';

      if (attendee.firstName.trim().length === 0) throw 'firstName cannot be an empty string or string with just spaces';
      if (attendee.lastName.trim().length === 0) throw 'lastName cannot be an empty string or string with just spaces';
      if (attendee.emailAddress.trim().length === 0) throw 'email address cannot be an empty string or string with just spaces';

      attendee.firstName = attendee.firstName.trim();
      attendee.lastName = attendee.lastName.trim();
      attendee.emailAddress = attendee.emailAddress.trim();
      
      attendee.firstName = validation.checkFirstName(attendee.firstName);
      attendee.lastName = validation.checkLastName(attendee.lastName);
      attendee.emailAddress = validation.checkEmail(attendee.emailAddress);

      const newAttendee = await attendeeData.createAttendee(
        req.params.eventId,
        attendee.firstName,
        attendee.lastName,
        attendee.emailAddress);
      return res.json(newAttendee);
    } catch (e) {
      return res.status(400).json({error: e});
    }
  });

router
  .route('/attendee/:attendeeId')
  .get(async (req, res) => {
    try {
      req.params.id = validation.checkId(req.params.attendeeId);
    } catch (e) {
      return res.status(400).json({error: e});
    }
    try {
      const attendee = await attendeeData.getAttendee(req.params.attendeeId);
      return res.json(attendee);
    } catch (e) {
      return res.status(404).json(e);
    }
  })
  .delete(async (req, res) => {
    try {
      req.params.attendeeId = validation.checkId(req.params.attendeeId);
    } catch (e) {
      return res.status(400).json({error: e});
    }
    try {
      const deletedattendee = await attendeeData.removeAttendee(req.params.attendeeId);
      return res.json(deletedattendee);
    } catch (e) {
      return res.status(404).json(e);
    }
  });

export default router;