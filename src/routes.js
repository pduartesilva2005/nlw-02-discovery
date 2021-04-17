const express = require('express');

const StudyController = require('./controllers/StudyController');
const GiveClassesController = require('./controllers/GiveClassesController');

const { subjects, weekdays } = require('./utils/format');

const routes = express.Router();

routes.get('/', (request, response) => {
  return response.render('index.html');
});

routes.get('/give-classes', (request, response) => {
  return response.render('give-classes.html', { subjects, weekdays });
});

routes.get('/study', StudyController.pageStudy);
routes.post('/save-classes', GiveClassesController.saveClass);

module.exports = routes;