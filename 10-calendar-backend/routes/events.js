/**
 * Events Rutes
 * Host: /api/events
 */
const { Router } = require('express');
const { check } = require('express-validator');

const { isDate } = require('../helpers/isDate');
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent
  } = require('../controllers/events');
const { validateToken } = require('../middlewares/validateToken');
const { fieldsValidator } = require('../middlewares/filedsValidators');

const route = Router();

route.use( validateToken );

route.get('/', getEvents);

route.post(
  '/',
  [
    check('title', 'Title is required').not().isEmpty(),
    check('start', 'Start date is required').custom( isDate ),
    check('end', 'End date is required').custom( isDate ),
    fieldsValidator,
  ],
  createEvent
);

route.put('/:id', updateEvent);

route.delete('/:id', deleteEvent);

module.exports = route;