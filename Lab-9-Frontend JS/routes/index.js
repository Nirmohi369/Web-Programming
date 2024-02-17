//Here you will require route files and export them as used in previous labs.
import palindromeRoutes from './palindromeCheck.js';

const constructorMethod = (app) => {
  app.use('/', palindromeRoutes);

  app.use('*', (req, res) => {
    //res.redirect('/calculator/static');
    res.status(404);
  });
};

export default constructorMethod;