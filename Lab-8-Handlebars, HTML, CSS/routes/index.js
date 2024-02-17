//Here you will import route files and export them as used in previous labs
import charRoutes from './characters.js';
import path from 'path';
import {static as staticDir} from 'express';
const constructorMethod = (app) => {
  app.use('/', charRoutes);
  app.use('*', (req, res) => {
    res.status(404).render('error',{error: 'Not Found',title:'error Found'});
  });
};

export default constructorMethod;