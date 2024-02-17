//Here you will require route files and export the constructor method as shown in lecture code and worked in previous labs.
import routes from './routesApi.js';

const constructorMethod = (app) => {
  app.use('/', routes);

  app.use('*', (req, res) => {
    res.status(404);
  });
};

export default constructorMethod;