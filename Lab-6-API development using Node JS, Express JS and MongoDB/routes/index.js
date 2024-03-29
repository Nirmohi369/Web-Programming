// This file will import both route files and export the constructor method as shown in the lecture code

/*
    - When the route is /events use the routes defined in the events.js routing file
    - When the route is /attendees use the routes defined in attendee.js routing file
    - All other enpoints should respond with a 404 as shown in the lecture code
*/

import attendeeRoutes from './attendees.js';
import eventsRoutes from './events.js';

const constructorMethod = (app) => {
  app.use('/attendees', attendeeRoutes);
  app.use('/events', eventsRoutes);

  app.use('*', (req, res) => {
    return res.status(404).json({error: 'Not found'});
  });
};

export default constructorMethod;
